import { Payment } from '../../entities/payment';
import { PaymentMongoRepository } from '../../../infra/repositories/payment.repository';

export class GetFinancialReportUseCase {
  constructor(private readonly paymentRepository: PaymentMongoRepository) {}

  async execute(params: {
    startDate?: Date;
    endDate?: Date;
    soccerFieldId?: string;
    clientId?: string;
  }): Promise<Payment[]> {
    return this.paymentRepository.getFinancialReport(params);
  }
} 