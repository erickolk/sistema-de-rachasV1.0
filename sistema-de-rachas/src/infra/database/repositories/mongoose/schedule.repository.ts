import { Model } from 'mongoose';
import { ScheduleRepository } from '../../repositories/schedule.repository';
import {
  CreateScheduleDto,
} from '../../../../domain/dto/schedule.dto';
import { ScheduleDocument } from '../../mongose/models/schedule.model';
import { Schedule } from '../../../../domain/entities/schedule';
import { uid } from 'uid';

export class ScheduleMongoRepository implements ScheduleRepository {
  private model: Model<ScheduleDocument>;

  constructor(model: Model<ScheduleDocument>) {
    this.model = model;
  }

  async findById(id: string): Promise<Schedule | null> {
    const schedule = await this.model.findById(id).exec();

    if (!schedule) return null;

    return new Schedule({
      id: schedule?.id || uid(),
      day: schedule.day,
      finishTime: schedule.finishTime,
      startTime: schedule.startTime,
    });
  }

  async findByName(name: string): Promise<Schedule | null> {
    const schedule = await this.model.findOne({ name }).exec();
    if (!schedule) return null;

    return new Schedule({
      id: schedule.id || uid(),
      day: schedule.day,
      finishTime: schedule.finishTime,
      startTime: schedule.startTime,
    });
  }

  async create(data: CreateScheduleDto): Promise<Schedule | null> {
    const schedule = new this.model(data);
    schedule.save();

    if (!schedule?._id) return null;

    return new Schedule({
      id: schedule.id || uid(),
      day: schedule.day,
      finishTime: schedule.finishTime,
      startTime: schedule.startTime,
    });
  }

  async update(
    id: string,
    payload: Partial<CreateScheduleDto>
  ): Promise<Schedule | null> {
    const schedule = await this.model
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();

    if (!schedule) return null;

    return new Schedule({
      id: schedule.id || uid(),
      day: schedule.day,
      finishTime: schedule.finishTime,
      startTime: schedule.startTime,
    });
  }

  async delete(id: string): Promise<void> {
    this.model.findByIdAndDelete(id).exec();
  }
}
