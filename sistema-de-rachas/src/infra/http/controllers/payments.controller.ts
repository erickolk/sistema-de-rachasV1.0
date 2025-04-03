import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { FetchPaymentUseCase } from '../../../domain/use-cases/payment/fetch-payment.usecase';
import { PaymentPresenter } from '../../../application/presenters/payment.presenter';
import { PaymentMongoRepository } from '../../repositories/payment.repository';
import { PaymentModel } from '../../database/models/payment.model';
import { GetFinancialReportUseCase } from '../../../domain/use-cases/payment/get-financial-report.usecase';

export interface GetFinancialReportQueryParams {
  startDate?: string;
  endDate?: string;
  soccerFieldId?: string;
  clientId?: string;
}

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

  async getDashboard(
    req: FastifyRequest,
    res: FastifyReply
  ) {
    try {
      const user = req.user as any;
      // Implementação simulada - substitua com sua lógica real
      const dashboardData = {
        totalPayments: 0,
        totalAmount: 0,
        recentPayments: []
      };
      
      res.status(HttpStatusCode.OK).send({
        data: dashboardData
      });
    } catch (error) {
      console.error('Erro ao buscar dashboard:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: 'Erro ao buscar dados do dashboard'
      });
    }
  }

  async getFinancialReport(
    req: FastifyRequest<{ Querystring: GetFinancialReportQueryParams }>,
    res: FastifyReply
  ) {
    try {
      const user = req.user as any;
      const { startDate, endDate, soccerFieldId, clientId } = req.query;
      
      // Implementação simulada - substitua com sua lógica real
      const reportData = {
        startDate,
        endDate,
        totalRevenue: 0,
        payments: []
      };
      
      res.status(HttpStatusCode.OK).send({
        data: reportData
      });
    } catch (error) {
      console.error('Erro ao gerar relatório financeiro:', error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        message: 'Erro ao gerar relatório financeiro'
      });
    }
  }
}

export default new PaymentController();
