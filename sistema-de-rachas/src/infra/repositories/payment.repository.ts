import { Model } from 'mongoose';
import { Payment } from '../../domain/entities/payment';

export class PaymentMongoRepository {
  constructor(private readonly paymentModel: Model<Payment>) {}

  async findByUser(userId: string): Promise<Payment[]> {
    return this.paymentModel.find({ userId }).exec();
  }

  async getFinancialReport(params: {
    startDate?: Date;
    endDate?: Date;
    soccerFieldId?: string;
    clientId?: string;
  }): Promise<Payment[]> {
    const query: any = {};

    if (params.startDate && params.endDate) {
      query.createdAt = {
        $gte: params.startDate,
        $lte: params.endDate,
      };
    }

    if (params.soccerFieldId) {
      query.soccerFieldId = params.soccerFieldId;
    }

    if (params.clientId) {
      query.userId = params.clientId;
    }

    return this.paymentModel.find(query).exec();
  }
} 