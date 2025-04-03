"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_code_1 = require("../../../domain/enums/http-status-code");
const fetch_payment_usecase_1 = require("../../../domain/use-cases/payment/fetch-payment.usecase");
const payment_presenter_1 = require("../../../application/presenters/payment.presenter");
const payment_repository_1 = require("../../repositories/payment.repository");
const payment_model_1 = require("../../database/models/payment.model");
const get_financial_report_usecase_1 = require("../../../domain/use-cases/payment/get-financial-report.usecase");
class PaymentController {
    constructor() {
        try {
            this.paymentRepository = new payment_repository_1.PaymentMongoRepository(payment_model_1.PaymentModel);
            this.getFinancialReportUseCase = new get_financial_report_usecase_1.GetFinancialReportUseCase(this.paymentRepository);
        }
        catch (error) {
            console.error('Erro ao inicializar PaymentController:', error);
            throw error;
        }
    }
    findByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = yield fetch_payment_usecase_1.FetchPaymentUseCase.execute(user.id);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(http_status_code_1.HttpStatusCode.CREATED).send({
                data: result.value.map((payment) => (0, payment_presenter_1.PaymentPresenter)(payment)),
            });
        });
    }
    getDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                // Implementação simulada - substitua com sua lógica real
                const dashboardData = {
                    totalPayments: 0,
                    totalAmount: 0,
                    recentPayments: []
                };
                res.status(http_status_code_1.HttpStatusCode.OK).send({
                    data: dashboardData
                });
            }
            catch (error) {
                console.error('Erro ao buscar dashboard:', error);
                res.status(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                    message: 'Erro ao buscar dados do dashboard'
                });
            }
        });
    }
    getFinancialReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { startDate, endDate, soccerFieldId, clientId } = req.query;
                // Implementação simulada - substitua com sua lógica real
                const reportData = {
                    startDate,
                    endDate,
                    totalRevenue: 0,
                    payments: []
                };
                res.status(http_status_code_1.HttpStatusCode.OK).send({
                    data: reportData
                });
            }
            catch (error) {
                console.error('Erro ao gerar relatório financeiro:', error);
                res.status(http_status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send({
                    message: 'Erro ao gerar relatório financeiro'
                });
            }
        });
    }
}
exports.default = new PaymentController();
