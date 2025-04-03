import { Match } from './match';
import { User } from './user';

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  PIX = 'PIX',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
}

export type PaymentParams = {
    id?: string;
    paymentDate: Date;
    paymentMethod: PaymentMethod | string;
    amount: number;
    discount?: number;
    totalAmountWithDiscount: number;
    match: Match;
    user: User;
    userId?: string;
    matchId?: string;
    soccerFieldId?: string;
    status?: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
};

export class Payment {
    id?: string;
    paymentDate: Date;
    paymentMethod: PaymentMethod | string;
    amount: number;
    discount?: number;
    totalAmountWithDiscount: number;
    match: Match;
    user: User;
    userId?: string;
    matchId?: string;
    soccerFieldId?: string;
    status?: PaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(params: PaymentParams) {
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

    get formattedAmount(): string {
        return this.amount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    get formattedDiscount(): string {
        return (this?.discount || 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }

    get formattedTotalAmountWithDiscount(): string {
        return this.totalAmountWithDiscount.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
}