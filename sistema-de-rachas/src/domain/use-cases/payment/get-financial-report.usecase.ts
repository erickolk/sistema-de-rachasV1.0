import { PaymentMongoRepository } from '../../../infra/database/repositories/mongoose/payment.repository';
import { PaymentRepository } from '../../../infra/database/repositories/payment.repository';
import PaymentModel from '../../../infra/database/mongose/models/payment.model';
import { Either, left, right } from '../../utils';
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';

interface FinancialReport {
  totalMatches: number;
  totalDiscounts: number;
  totalRevenue: number;
  unpaidMatches: number;
}

export class GetFinancialReportUseCase {
  private static readonly paymentRepository: PaymentRepository =
    new PaymentMongoRepository(PaymentModel);
  private static readonly matchRepository = new MatchMongoRepository(MatchModel);

  public static async execute(userId: string): Promise<Either<HttpError, FinancialReport>> {
    try {
      const [payments, unpaidMatches] = await Promise.all([
        GetFinancialReportUseCase.paymentRepository.findByUser(userId),
        GetFinancialReportUseCase.matchRepository.findUnpaidMatchesByUser(userId)
      ]);

      if (!payments.length && !unpaidMatches.length) {
        return right({
          totalMatches: 0,
          totalDiscounts: 0,
          totalRevenue: 0,
          unpaidMatches: 0
        });
      }

      const report = payments.reduce((acc, payment) => {
        if (payment) {
          acc.totalMatches++;
          // Calcula o desconto de duas formas possíveis:
          // 1. Se tiver o campo discount preenchido, usa ele
          // 2. Se não tiver, calcula pela diferença entre amount e totalAmountWithDiscount
          const calculatedDiscount = payment.discount || (payment.amount - payment.totalAmountWithDiscount);
          acc.totalDiscounts += calculatedDiscount;
          acc.totalRevenue += payment.totalAmountWithDiscount;
        }
        return acc;
      }, {
        totalMatches: 0,
        totalDiscounts: 0,
        totalRevenue: 0,
        unpaidMatches: unpaidMatches.length
      });

      return right(report);
    } catch (error: unknown) {
      console.error(error);

      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          error instanceof Error ? error.message : 'Erro ao obter relatório financeiro'
        )
      );
    }
  }
} 