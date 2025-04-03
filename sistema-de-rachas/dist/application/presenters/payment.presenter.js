"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentPresenter = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const PaymentPresenter = (payment) => {
    var _a, _b, _c;
    return {
        id: ((_a = payment.id) === null || _a === void 0 ? void 0 : _a.toString()) || '',
        amount: payment.amount,
        discount: payment.discount,
        totalAmountWithDiscount: payment.totalAmountWithDiscount,
        formattedAmount: payment.formattedAmount,
        formattedDiscount: payment.formattedDiscount,
        formattedTotalAmountWithDiscount: payment.formattedTotalAmountWithDiscount,
        paymentDate: (0, dayjs_1.default)(payment.paymentDate).format('DD/MM/YYYY'),
        paymentMethod: payment.paymentMethod,
        match: {
            id: ((_b = payment.match.id) === null || _b === void 0 ? void 0 : _b.toString()) || '',
            name: payment.match.name,
            soccerField: {
                name: payment.match.soccerField.name
            }
        },
        user: {
            id: ((_c = payment.user.id) === null || _c === void 0 ? void 0 : _c.toString()) || '',
            name: payment.user.name,
        },
    };
};
exports.PaymentPresenter = PaymentPresenter;
