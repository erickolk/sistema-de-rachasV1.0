import mongoose, { Model } from 'mongoose';
import { CreatePaymentDto } from '../../../../domain/dto/payment.dto';
import { Payment } from '../../../../domain/entities/payment';
import { PaymentRepository } from '../payment.repository';
import { PaymentDocumentWithRelations } from '../../mongose/models/payment.model';
import { uid } from 'uid';
import {
  DayOfWeek,
  Match,
  Schedule,
  SoccerField,
  User,
} from '../../../../domain';
import { ObjectId } from 'mongodb';

export class PaymentMongoRepository implements PaymentRepository {
  private model: Model<PaymentDocumentWithRelations>;

  constructor(model: Model<PaymentDocumentWithRelations>) {
    this.model = model;
  }

  async all(): Promise<Array<Payment>> {
    const documents = await this.model
      .find()
      .populate('match')
      .populate('user')
      .exec();
    return documents.map(this.parseToEntity);
  }

  async findById(id: string): Promise<Payment | null> {
    const document = await this.model
      .findById(id)
      .populate({
        path: 'match',
        populate: [
          { path: 'schedules' },
          { path: 'players' },
          { path: 'user' },
          { path: 'soccerField' },
        ],
      })
      .populate('user')
      .exec();
    return document ? this.parseToEntity(document) : null;
  }

  async findByUser(userId: string): Promise<Array<Payment>> {
    const paymentsSelected = await this.model.aggregate([
      {
        $lookup: {
          from: 'matches',
          localField: 'match',
          foreignField: '_id',
          as: 'match'
        }
      },
      { $unwind: '$match' },
      {
        $lookup: {
          from: 'soccerfields',
          localField: 'match.soccerField',
          foreignField: '_id',
          as: 'match.soccerField'
        }
      },
      { $unwind: '$match.soccerField' },
      {
        $match: {
          'match.soccerField.user': new ObjectId(userId)
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' }
    ]).exec();

    return paymentsSelected.map(this.parseToEntity);
  }

  async findByMatch(matchId: string): Promise<Payment | null> {
    const document = await this.model
      .findOne({ match: matchId })
      .populate({
        path: 'match',
        populate: [
          { path: 'schedules' },
          { path: 'players' },
          { path: 'user' },
          { path: 'soccerField' },
        ],
      })
      .populate('user')
      .exec();

    return document ? this.parseToEntity(document) : null;
  }

  async create(data: CreatePaymentDto): Promise<Payment | null> {
    const document = new this.model(data);
    const savedDocument = await document.save();
    const populatedDocument = await this.findById(savedDocument._id);
    return populatedDocument;
  }

  async update(
    id: string,
    payload: Partial<CreatePaymentDto>
  ): Promise<Payment | null> {
    const document = await this.model
      .findByIdAndUpdate(id, payload, { new: true })
      .populate('match')
      .populate('user')
      .exec();
    return document ? this.parseToEntity(document) : null;
  }

  async delete(id: string): Promise<Payment | null> {
    const document = await this.model
      .findByIdAndDelete(id)
      .populate('match')
      .populate('user')
      .exec();
    return document ? this.parseToEntity(document) : null;
  }

  private parseToEntity(document: PaymentDocumentWithRelations): Payment {
    console.log(document)
    if (!document) {
      throw new Error('Document is null');
    }
    const parseSchedule = (schedule: any): Schedule => {
      return new Schedule({
        id: schedule?._id || uid(),
        startTime: schedule.startTime,
        finishTime: schedule.finishTime,
        day: schedule.day,
      });
    };

    const parseSoccerField = (document: any): SoccerField => {
      return new SoccerField({
        id: document?._id || uid(),
        name: document.name,
        pixKey: document.pixKey,
        rentalValue: document.rentalValue,
        workFinishTime: document.workFinishTime,
        workStartTime: document.workStartTime,
        workDays: document.workDays as DayOfWeek[],
        user: parseUser(document.user),
      });
    };

    const parseMatch = (match: any): Match => {
      return new Match({
        id: match?._id || uid(),
        name: match.name,
        thumb: match.thumb,
        description: match.description,
        soccerField: parseSoccerField(match.soccerField),
        schedules: match.schedules.map(parseSchedule),
        players: match.players,
        user: match.user,
      });
    };

    const parseUser = (user: any): User => {
      return new User({
        id: user?._id || uid(),
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        password: user?.password || '',
        photoUrl: user?.photoUrl || '',
      });
    };

    return new Payment({
      id: document?._id || uid(),
      paymentDate: document.paymentDate,
      paymentMethod: document.paymentMethod,
      amount: document.amount,
      discount: document.discount,
      totalAmountWithDiscount: document.totalAmountWithDiscount,
      match: parseMatch(document.match),
      user: parseUser(document.user),
    });
  }
}
