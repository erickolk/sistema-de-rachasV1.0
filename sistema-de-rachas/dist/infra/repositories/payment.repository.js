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
exports.PaymentMongoRepository = void 0;
class PaymentMongoRepository {
    constructor(paymentModel) {
        this.paymentModel = paymentModel;
    }
    findByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.paymentModel.find({ userId }).exec();
        });
    }
    getFinancialReport(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
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
        });
    }
}
exports.PaymentMongoRepository = PaymentMongoRepository;
