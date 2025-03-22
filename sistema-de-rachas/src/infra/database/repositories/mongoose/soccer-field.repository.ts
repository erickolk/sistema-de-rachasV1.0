import { Model } from 'mongoose';
import { SoccerFieldRepository } from '../../repositories/soccer-field.repository';
import { CreateSoccerFieldDto } from '../../../../domain/dto/soccer-field.dto';
import { SoccerFieldDocumentWithRelations } from '../../mongose/models/soccer-field.model';
import { SoccerField } from '../../../../domain/entities/soccer-field';
import { DayOfWeek } from '../../../../domain/object-values/day';
import { User } from '../../../../domain/entities/user';
import MatchModel from '../../mongose/models/match.model';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { convertNumberToDayOfWeek, Time } from '../../../../domain';

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

export class SoccerFieldMongoRepository implements SoccerFieldRepository {
  private model: Model<SoccerFieldDocumentWithRelations>;

  constructor(model: Model<SoccerFieldDocumentWithRelations>) {
    this.model = model;
  }

  async getAvailableTimes(id: string, day?: string): Promise<any> {
    const currentDay = day ?? new Date().toISOString();

    const soccerField = await this.model.findById(id).exec();
    if (!soccerField) {
      throw new Error('Campo de futebol não encontrado');
    }

    const matchs = await MatchModel.find()
      .populate(['soccerField', 'players', 'schedules'])
      .find({
        schedules: {
          $elemMatch: {
            day: { $gte: new Date(currentDay).toISOString() },
          },
        },
        soccerField: id,
      })
      .exec();

    const occupiedTimes = matchs
      .map((match) => {
        return match.schedules.map((schedule) => ({
          startTime: new Time(schedule.startTime),
          finishTime: new Time(schedule.finishTime),
        }));
      })
      .flat();

    const workTimes = this.getWorkTimes(soccerField, currentDay);
    const availableTimes = this.getAvailableIntervals(workTimes, occupiedTimes);
    return availableTimes;
  }

  private getAvailableIntervals(
    workTimes: Array<{ startTime: Time; finishTime: Time }>,
    occupiedTimes: Array<{ startTime: Time; finishTime: Time }>
  ): Array<{ startTime: string; finishTime: string }> {
    const availableTimes: Array<{ startTime: string; finishTime: string }> = [];

    workTimes.forEach((workInterval) => {
      let { startTime, finishTime } = workInterval;

      occupiedTimes.forEach((occupiedInterval) => {
        if (
          occupiedInterval.startTime.isBefore(finishTime) &&
          occupiedInterval.finishTime.isAfter(startTime)
        ) {
          if (occupiedInterval.startTime.isAfter(startTime)) {
            availableTimes.push({
              startTime: startTime.toString(),
              finishTime: occupiedInterval.startTime.toString(),
            });
          }
          startTime = new Time(
            Math.max(
              occupiedInterval.finishTime.toSeconds(),
              startTime.toSeconds()
            ).toString()
          );
        }
      });

      if (startTime.isBefore(finishTime)) {
        availableTimes.push({
          startTime: startTime.toString(),
          finishTime: finishTime.toString(),
        });
      }
    });

    return availableTimes;
  }

  private getWorkTimes(
    soccerField: SoccerFieldDocumentWithRelations,
    currentDay: string
  ) {
    const dayOfWeekIndex = dayjs(currentDay).day();
    const dayOfWeek = convertNumberToDayOfWeek(dayOfWeekIndex);

    if (!soccerField.workDays.includes(dayOfWeek)) {
      return [];
    }

    let startTime = new Time(soccerField.workStartTime);
    const finishTime = new Time(soccerField.workFinishTime);
    const interval = 1;

    if (startTime.isAfter(finishTime)) {
      throw new Error(
        'Horário de início não pode ser depois do horário de término.'
      );
    }

    const workTimes = [];

    while (startTime.isBefore(finishTime)) {
      const nextTime = startTime.add('hours', interval);

      if (nextTime.isAfter(finishTime)) {
        workTimes.push({
          startTime: new Time(startTime.toString()),
          finishTime: new Time(finishTime.toString()),
        });
        break;
      }

      workTimes.push({
        startTime: new Time(startTime.toString()),
        finishTime: new Time(nextTime.toString()),
      });

      startTime = nextTime;
    }

    return workTimes;
  }

  async all(): Promise<Array<SoccerField>> {
    const soccerFields = await this.model.find().populate(['user']).exec();
    return soccerFields.map((soccerField) => {
      return this.parseToEntity(soccerField);
    });
  }

  async allByUser(userId: string): Promise<Array<SoccerField>> {
    const soccerFields = await this.model
      .where('user')
      .equals(userId)
      .populate(['user'])
      .exec();

    return soccerFields.map((soccerField) => {
      return this.parseToEntity(soccerField);
    });
  }

  async findById(id: string): Promise<SoccerField | null> {
    const soccerField = await this.model.findById(id).populate(['user']).exec();
    if (!soccerField) return null;

    return this.parseToEntity(soccerField);
  }

  async findByName(name: string): Promise<SoccerField | null> {
    const soccerField = await this.model.findOne({ name }).exec();
    if (!soccerField) return null;

    return this.parseToEntity(soccerField);
  }

  async create(data: CreateSoccerFieldDto): Promise<SoccerField | null> {
    const soccerField = new this.model(data);
    await soccerField.save();

    if (!soccerField) return null;

    return this.parseToEntity(soccerField);
  }

  async update(
    id: string,
    payload: Partial<CreateSoccerFieldDto>
  ): Promise<SoccerField | null> {
    const updated = await this.model
      .findByIdAndUpdate(id, payload, { new: true })
      .populate(['user'])
      .exec();

    if (!updated) return null;

    return this.parseToEntity(updated);
  }

  async delete(id: string): Promise<SoccerField | null> {
    const deletedSoccerField = await this.model.findByIdAndDelete(id).exec();

    if (!deletedSoccerField) {
      return null;
    }

    return this.parseToEntity(deletedSoccerField);
  }

  private parseToEntity(
    document: SoccerFieldDocumentWithRelations
  ): SoccerField {
    return new SoccerField({
      id: document._id as string,
      name: document.name,
      pixKey: document.pixKey,
      rentalValue: document.rentalValue,
      workFinishTime: document.workFinishTime,
      workStartTime: document.workStartTime,
      workDays: document.workDays as DayOfWeek[],
      user: document.user
        ? new User({
            email: document.user.email,
            id: document.user._id as string,
            name: document.user.name,
            password: document.user.password,
            photoUrl: document.user.photoUrl,
            role: document.user.role,
          })
        : new User({
            email: '',
            id: '',
            name: '',
            password: '',
            photoUrl: '',
            role: 1,
          }),
    });
  }
}
