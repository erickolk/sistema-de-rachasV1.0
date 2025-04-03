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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakePaymentUseCase = void 0;
const payment_repository_1 = require("../../../infra/database/repositories/mongoose/payment.repository");
const either_1 = require("../../utils/either");
const http_error_1 = require("../../errors/http.error");
const http_status_code_1 = require("../../enums/http-status-code");
const payment_model_1 = __importDefault(require("../../../infra/database/mongose/models/payment.model"));
class MakePaymentUseCase {
    static execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existPayment = yield MakePaymentUseCase.repository.findByMatch(data.match);
                if (existPayment) {
                    return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.BAD_REQUEST, 'Não foi possível realizar o pagamento da partida! O pagamento já foi realizado.'));
                }
                const payment = yield MakePaymentUseCase.repository.create(data);
                if (!payment) {
                    return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.BAD_REQUEST, 'Erro ao processar pagamento'));
                }
                return (0, either_1.right)(payment);
            }
            catch (error) {
                console.error(error);
                return (0, either_1.left)(new http_error_1.HttpError(http_status_code_1.HttpStatusCode.BAD_REQUEST, error instanceof Error ? error.message : 'Erro ao processar pagamento'));
            }
        });
    }
}
exports.MakePaymentUseCase = MakePaymentUseCase;
MakePaymentUseCase.repository = new payment_repository_1.PaymentMongoRepository(payment_model_1.default);
