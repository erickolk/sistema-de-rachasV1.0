import { PaymentMongoRepository } from '../../../infra/database/repositories/mongoose/payment.repository';
import { PaymentRepository } from '../../../infra/database/repositories/payment.repository';
import PaymentModel from '../../../infra/database/mongose/models/payment.model';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { Payment } from '../../entities/payment';

export class FetchPaymentUseCase {
  private static readonly repository: PaymentRepository =
    new PaymentMongoRepository(PaymentModel);

  public static async execute(userId: string): Promise<Either<HttpError, Array<Payment>>> {
    try {
      const payments = await FetchPaymentUseCase.repository.findByUser(userId);

      if (!payments) {
        return left(new HttpError(HttpStatusCode.BAD_REQUEST, 'Erro ao obter pagamentos'));
      }

      return right(payments.filter((payment): payment is Payment => payment !== null));
    } catch (error: unknown) {
      console.error(error);

      return left(
        new HttpError(
          HttpStatusCode.BAD_REQUEST,
          error instanceof Error ? error.message : 'Erro ao obter pagamentos'
        )
      );
    }
  }
}