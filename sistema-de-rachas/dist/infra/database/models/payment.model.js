"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const PaymentSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    matchId: { type: String, required: true },
    soccerFieldId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentDate: { type: Date, required: true },
}, {
    timestamps: true,
});
exports.PaymentModel = mongoose_1.models.Payment || (0, mongoose_1.model)('Payment', PaymentSchema);
