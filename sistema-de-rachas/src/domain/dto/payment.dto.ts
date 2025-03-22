import { MatchDto } from './match.dto';
import { UserDto } from './user.dto';

export type PaymentDto = {
  id: string;
  amount: number;
  discount?: number;
  totalAmountWithDiscount: number;
  paymentDate: string;
  paymentMethod: string;
  match: Partial<MatchDto>;
  user: Partial<UserDto>;
  formattedAmount: string;
  formattedDiscount: string;
  formattedTotalAmountWithDiscount: string;
};

export type CreatePaymentDto = {
  amount: number;
  discount?: number;
  paymentDate: Date;
  paymentMethod: string;
  match: string;
  user: string;
};