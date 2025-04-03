import { Match } from './match';
import { User } from './user';

export type PaymentParams = {
    id: string;
    paymentDate: Date;
    paymentMethod: string;
    amount: number;
    discount?: number;
    totalAmountWithDiscount: number;
    match: Match;
    user: User;
};

export class Payment {
    id: string;
    paymentDate: Date;
    paymentMethod: string;
    amount: number;
    discount?: number;
    totalAmountWithDiscount: number;
    match: Match;
    user: User;

    constructor(params: PaymentParams) {
        this.id = params.id;
        this.paymentDate = params.paymentDate;
        this.paymentMethod = params.paymentMethod;
        this.amount = params.amount;
        this.discount = params.discount;
        this.totalAmountWithDiscount = params.totalAmountWithDiscount;
        this.match = params.match;
        this.user = params.user;
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

export interface Payment {
  id?: string;
  userId: string;
  matchId: string;
  soccerFieldId: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

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