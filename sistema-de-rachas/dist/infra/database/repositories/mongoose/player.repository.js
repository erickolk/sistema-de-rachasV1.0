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
exports.PlayerMongoRepository = void 0;
const player_1 = require("../../../../domain/entities/player");
class PlayerMongoRepository {
    constructor(model) {
        this.model = model;
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.model.findById(id).exec();
            if (!player)
                return null;
            return new player_1.Player({
                id: player._id,
                name: player.name,
                stars: player.stars,
            });
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = yield this.model.findOne({ name }).exec();
            if (!player)
                return null;
            return new player_1.Player({
                id: player._id,
                name: player.name,
                stars: player.stars,
            });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const player = new this.model(data);
            yield player.save();
            if (!(player === null || player === void 0 ? void 0 : player._id))
                return null;
            return this.parseToEntity(player);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.model
                .findByIdAndUpdate(id, data, { new: true })
                .exec();
            if (!updated)
                return null;
            return this.parseToEntity(updated);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.model.findByIdAndDelete(id).exec();
            if (!deleted) {
                return null;
            }
            return this.parseToEntity(deleted);
        });
    }
    parseToEntity(document) {
        return new player_1.Player({
            id: document._id,
            name: document.name,
            stars: document.stars,
        });
    }
}
exports.PlayerMongoRepository = PlayerMongoRepository;
