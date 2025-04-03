"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPresenter = void 0;
const UserPresenter = (user) => {
    return {
        id: user.id.toString(),
        email: user.email,
        name: user.name,
        photoUrl: user === null || user === void 0 ? void 0 : user.photoUrl,
        role: user.role,
    };
};
exports.UserPresenter = UserPresenter;
