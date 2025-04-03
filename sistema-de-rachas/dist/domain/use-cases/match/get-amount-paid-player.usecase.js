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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAmountPaidPlayerUseCase = void 0;
const match_1 = require("../../entities/match");
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
class GetAmountPaidPlayerUseCase {
    static execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const match = yield GetAmountPaidPlayerUseCase.repository.findById(id);
            if (!match)
                return 0;
            const matchEntity = new match_1.Match(match);
            return matchEntity.amountToBePaidPerPlayer;
        });
    }
}
exports.GetAmountPaidPlayerUseCase = GetAmountPaidPlayerUseCase;
GetAmountPaidPlayerUseCase.repository = new match_repository_1.MatchMongoRepository(match_model_1.default);
