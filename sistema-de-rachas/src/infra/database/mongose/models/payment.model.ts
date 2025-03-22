import mongoose, { Document, Schema, model, Model } from 'mongoose';
import { MatchDocument, MatchDocumentWithRelations } from './match.model';
import { UserDocument } from './user.model';

export interface PaymentDocument extends Document<string> {
    paymentDate: Date;
    paymentMethod: string;
    amount: number;
    discount?: number;
    totalAmountWithDiscount: number;
    match: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
}

export interface PaymentDocumentWithRelations extends Document<string> {
    paymentDate: Date;
    paymentMethod: string;
    amount: number;
    discount?: number;
    totalAmountWithDiscount: number;
    match: MatchDocumentWithRelations;
    user: UserDocument;
}

export const paymentSchema: Schema = new Schema({
    paymentDate: { type: Date, required: true },
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    discount: { type: Number, default: 0 }, // Campo opcional de desconto
    totalAmountWithDiscount: { type: Number, required: true },
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

paymentSchema.pre('save', function (next) {
    const payment = this as PaymentDocument;
    payment.totalAmountWithDiscount = payment.amount - (payment.discount || 0);
    next();
});

const PaymentModel: Model<PaymentDocumentWithRelations> = model<PaymentDocumentWithRelations>('Payment', paymentSchema);

export default PaymentModel;