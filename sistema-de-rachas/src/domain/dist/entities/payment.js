"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
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
    }
    get formattedAmount() {
        return this.amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
    get formattedDiscount() {
        return (this?.discount || 0).toLocaleString('pt-BR', {
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
