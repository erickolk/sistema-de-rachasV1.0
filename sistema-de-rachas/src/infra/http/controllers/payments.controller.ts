import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { FetchPaymentUseCase } from '../../../domain/use-cases/payment/fetch-payment.usecase';
import { PaymentPresenter } from '../../../application/presenters/payment.presenter';

class PaymentController {
  private readonly paymentRepository: PaymentMongoRepository;
  private readonly getFinancialReportUseCase: GetFinancialReportUseCase;

  constructor() {
    try {
      this.paymentRepository = new PaymentMongoRepository(PaymentModel);
      this.getFinancialReportUseCase = new GetFinancialReportUseCase(this.paymentRepository);
    } catch (error) {
      console.error('Erro ao inicializar PaymentController:', error);
      throw error;
    }
  }

  async findByUser(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    const user = req.user as any;
    const result = await FetchPaymentUseCase.execute(user.id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: result.value.map((payment) => PaymentPresenter(payment)),
    });
  }
}

export default new PaymentController();
