"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongoRespository = void 0;
const user_1 = require("../../../../domain/entities/user");
class UserMongoRespository {
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findById(id);
            if (!user)
                return null;
            return this.parseToEntity(user);
        });
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield this.model.create(payload);
            yield createdUser.save();
            if (!createdUser)
                return null;
            return this.parseToEntity(createdUser);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne().where('email').equals(email);
            if (!user)
                return null;
            return this.parseToEntity(user);
        });
    }
    update(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanPayload = Object.fromEntries(Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null));
            const user = yield this.model.findByIdAndUpdate(id, cleanPayload, { new: true, runValidators: true });
            if (!user)
                return null;
            return this.parseToEntity(user);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.findByIdAndDelete(id);
        });
    }
    parseToEntity(document) {
        return new user_1.User({
            email: document.email,
            id: document._id,
            name: document.name,
            password: document.password,
            photoUrl: document.photoUrl,
            role: document.role,
        });
    }
}
exports.UserMongoRespository = UserMongoRespository;
