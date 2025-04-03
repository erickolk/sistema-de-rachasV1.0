import { Schema, model, models } from 'mongoose';
import { Payment } from '../../../domain/entities/payment';

const PaymentSchema = new Schema<Payment>(
  {
    userId: { type: String, required: true },
    matchId: { type: String, required: true },
    soccerFieldId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const PaymentModel = models.Payment || model<Payment>('Payment', PaymentSchema); 