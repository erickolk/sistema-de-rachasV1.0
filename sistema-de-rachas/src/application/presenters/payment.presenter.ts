import { Payment } from '../../domain/entities/payment';
import { PaymentDto } from '../../domain/dto/payment.dto';
import dayjs from 'dayjs';

export const PaymentPresenter = (payment: Payment): PaymentDto => {
  return {
    id: payment.id.toString(),
    amount: payment.amount,
    discount: payment.discount,
    totalAmountWithDiscount: payment.totalAmountWithDiscount,
    formattedAmount: payment.formattedAmount,
    formattedDiscount: payment.formattedDiscount,
    formattedTotalAmountWithDiscount: payment.formattedTotalAmountWithDiscount,
    paymentDate: dayjs(payment.paymentDate).format('DD/MM/YYYY'),
    paymentMethod: payment.paymentMethod,
    match: {
      id: payment.match.id.toString(),
      name: payment.match.name,
      soccerField: {
        name: payment.match.soccerField.name
      }
    },
    user: {
      id: payment.user.id.toString(),
      name: payment.user.name,
    },
  };
};