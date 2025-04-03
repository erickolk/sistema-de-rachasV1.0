"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = exports.PaymentMethod = exports.PaymentStatus = void 0;
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "PENDING";
    PaymentStatus["PAID"] = "PAID";
    PaymentStatus["CANCELLED"] = "CANCELLED";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["PIX"] = "PIX";
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethod["DEBIT_CARD"] = "DEBIT_CARD";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
class Payment {
    constructor(params) {
        this.id = params.id;
        this.paymentDate = params.paymentDate;
        this.paymentMethod = params.paymentMethod;
        this.amount = params.amount;
        this.discount = params.discount;
        this.totalAmountWithDiscount = params.totalAmountWithDiscount;
        this.match = params.match;
        this.user = params.user;
        this.userId = params.userId;
        this.matchId = params.matchId;
        this.soccerFieldId = params.soccerFieldId;
        this.status = params.status;
        this.createdAt = params.createdAt;
        this.updatedAt = params.updatedAt;
    }
    get formattedAmount() {
        return this.amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
    get formattedDiscount() {
        return ((this === null || this === void 0 ? void 0 : this.discount) || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
    get formattedTotalAmountWithDiscount() {
        return this.totalAmountWithDiscount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
}
exports.Payment = Payment;
