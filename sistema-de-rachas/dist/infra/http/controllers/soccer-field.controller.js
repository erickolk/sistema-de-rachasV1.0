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
const register_soccer_field_usecase_1 = require("../../../domain/use-cases/soccer-field/register-soccer-field.usecase");
const soccer_field_presenter_1 = require("../../../application/presenters/soccer-field.presenter");
const fetch_soccer_field_usecase_1 = require("../../../domain/use-cases/soccer-field/fetch-soccer-field.usecase");
const get_soccer_field_available_times_1 = require("../../../domain/use-cases/soccer-field/get-soccer-field-available-times");
const domain_1 = require("../../../domain");
const fetch_soccer_field_by_user_1 = require("../../../domain/use-cases/soccer-field/fetch-soccer-field-by-user");
const remove_soccer_field_usecase_1 = require("../../../domain/use-cases/soccer-field/remove-soccer-field.usecase");
const find_soccer_field_by_id_usecase_1 = require("../../../domain/use-cases/soccer-field/find-soccer-field-by-id.usecase");
const update_soccer_field_usecase_1 = require("../../../domain/use-cases/soccer-field/update-soccer-field.usecase");
const get_owner_matches_usecase_1 = require("../../../domain/use-cases/soccer-field/get-owner-matches.usecase");
const get_owner_dashboard_usecase_1 = require("../../../domain/use-cases/soccer-field/get-owner-dashboard.usecase");
class SoccerFieldController {
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield fetch_soccer_field_usecase_1.FetchSoccerFieldUseCase.execute();
            if (result.isRight()) {
                res
                    .status(domain_1.HttpStatusCode.OK)
                    .send((0, soccer_field_presenter_1.ArraySoccerFieldPresenter)(result.value));
            }
            else {
                res.status(result.value.code).send(result.value.message);
            }
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield find_soccer_field_by_id_usecase_1.FindSoccerFieldByIdUseCase.execute(id);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.OK).send((0, soccer_field_presenter_1.SoccerFieldPresenter)(result.value));
        });
    }
    allByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = yield fetch_soccer_field_by_user_1.FetchSoccerFieldByUserUseCase.execute(user.id);
            if (result.isRight()) {
                res
                    .status(domain_1.HttpStatusCode.OK)
                    .send((0, soccer_field_presenter_1.ArraySoccerFieldPresenter)(result.value));
            }
            else {
                res.status(result.value.code).send(result.value.message);
            }
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const soccerFieldDto = req.body;
            const result = yield register_soccer_field_usecase_1.RegisterSoccerFieldUseCase.execute(Object.assign(Object.assign({}, soccerFieldDto), { user: user.id }));
            if (result.isLeft()) {
                res.status(result.value.code).send(result.value.message);
                return;
            }
            res.status(domain_1.HttpStatusCode.CREATED).send((0, soccer_field_presenter_1.SoccerFieldPresenter)(result.value));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updateData = req.body;
            const result = yield update_soccer_field_usecase_1.UpdateSoccerFieldUseCase.execute(id, updateData);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.OK).send((0, soccer_field_presenter_1.SoccerFieldPresenter)(result.value));
        });
    }
    getOwnerMatches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = yield get_owner_matches_usecase_1.GetOwnerMatchesUseCase.execute(user.id);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.OK).send({
                totalMatches: result.value.totalMatches,
                matches: result.value.matches.map((match) => ({
                    id: match.id,
                    name: match.name,
                    date: match.schedules[0].day,
                    startTime: match.schedules[0].startTime,
                    finishTime: match.schedules[0].finishTime,
                    field: match.soccerField.name,
                })),
            });
        });
    }
    getDashboard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = yield get_owner_dashboard_usecase_1.GetOwnerDashboardUseCase.execute(user.id);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.OK).send(result.value);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield remove_soccer_field_usecase_1.RemoveSoccerFieldUsecase.execute(req.params.id);
            if (result.isLeft()) {
                res.status(result.value.code).send(result.value.message);
                return;
            }
            res.status(domain_1.HttpStatusCode.OK).send(result.value);
        });
    }
    availableTimes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { day } = req.query;
            const result = yield get_soccer_field_available_times_1.GetSoccerFieldAvailableTimes.execute(id, day);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value);
            }
            res.status(domain_1.HttpStatusCode.OK).send({
                data: result.value,
            });
        });
    }
}
exports.default = new SoccerFieldController();
