import { Payment } from '../../entities/payment';
import { PaymentMongoRepository } from '../../../infra/database/repositories/mongoose/payment.repository';
import { CreatePaymentDto } from '../../dto/payment.dto';
import { Either, left, right } from '../../utils/either';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums/http-status-code';
import { PaymentRepository } from '../../../infra/database/repositories/payment.repository';
import PaymentModel from '../../../infra/database/mongose/models/payment.model';

export class MakePaymentUseCase {
  private static readonly repository: PaymentRepository =
    new PaymentMongoRepository(PaymentModel);

  public static async execute(data: CreatePaymentDto): Promise<Either<HttpError, Payment>> {
    try {
      const existPayment = await MakePaymentUseCase.repository.findByMatch(data.match);
      if (existPayment) {
        return left(new HttpError(HttpStatusCode.BAD_REQUEST, 'Não foi possível realizar o pagamento da partida! O pagamento já foi realizado.'));
      }

      const payment = await MakePaymentUseCase.repository.create(data);

      if (!payment) {
        return left(new HttpError(HttpStatusCode.BAD_REQUEST, 'Erro ao processar pagamento'));
      }

      return right(payment);
    } catch (error: unknown) {
      console.error(error);

      return left(
        new HttpError(
          HttpStatusCode.BAD_REQUEST,
          error instanceof Error ? error.message : 'Erro ao processar pagamento'
        )
      );
    }
  }
}