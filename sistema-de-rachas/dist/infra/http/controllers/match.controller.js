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
const get_amount_paid_player_usecase_1 = require("../../../domain/use-cases/match/get-amount-paid-player.usecase");
const register_match_usecase_1 = require("../../../domain/use-cases/match/register-match.usecase");
const update_match_usecase_1 = require("../../../domain/use-cases/match/update-match.usecase");
const find_match_usecase_1 = require("../../../domain/use-cases/match/find-match.usecase");
const match_presenter_1 = require("../../../application/presenters/match.presenter");
const fetch_match_usecase_1 = require("../../../domain/use-cases/match/fetch-match.usecase");
const domain_1 = require("../../../domain");
const generate_teams_usecase_1 = require("../../../domain/use-cases/match/generate-teams.usecase");
const remove_match_usecase_1 = require("../../../domain/use-cases/match/remove-match.usecase");
const team_presenter_1 = require("../../../application/presenters/team.presenter");
const get_user_matches_usecase_1 = require("../../../domain/use-cases/match/get-user-matches.usecase");
const payment_match_usecase_1 = require("../../../domain/use-cases/match/payment-match.usecase");
const payment_presenter_1 = require("../../../application/presenters/payment.presenter");
const get_user_unpaid_matches_usecase_1 = require("../../../domain/use-cases/match/get-user-unpaid-matches.usecase");
class MatchController {
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchs = yield fetch_match_usecase_1.FetchMatchUseCase.execute();
            res.send({
                data: matchs,
            });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = yield register_match_usecase_1.RegisterMatchUseCase.execute(Object.assign(Object.assign({}, req.body), { user: user.id }));
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.CREATED).send({
                data: (0, match_presenter_1.MatchPresenter)(result.value),
            });
        });
    }
    getAmountPaidPlayer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const total = get_amount_paid_player_usecase_1.GetAmountPaidPlayerUseCase.execute(id);
            res.send({
                data: {
                    total,
                },
            });
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield find_match_usecase_1.FindMatchUseCase.execute(id);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.CREATED).send({
                data: (0, match_presenter_1.MatchPresenter)(result.value),
            });
        });
    }
    getUserMatches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = yield get_user_matches_usecase_1.GetUserMatchesUseCase.execute(user.id, user.role);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.OK).send((0, match_presenter_1.MatchsPresenter)(result.value));
        });
    }
    getUserUnpaidMatches(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const result = yield get_user_unpaid_matches_usecase_1.GetUserUnpaidMatchesUseCase.execute(user.id);
                if (result.isLeft()) {
                    return res
                        .status(result.value.code)
                        .send({ message: result.value.message });
                }
                res.status(domain_1.HttpStatusCode.OK).send(result.value);
            }
            catch (error) {
                return res
                    .status(domain_1.HttpStatusCode.INTERNAL_SERVER_ERROR)
                    .send({ error: 'Erro ao buscar partidas não pagas' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const matchDto = req.body;
            const result = yield update_match_usecase_1.UpdateMatchUseCase.execute(id, matchDto);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.CREATED).send({
                data: (0, match_presenter_1.MatchPresenter)(result.value),
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield remove_match_usecase_1.RemoveMatchUseCase.execute(req.params.id);
            if (result.isLeft()) {
                res.status(result.value.code).send(result.value.message);
                return;
            }
            res.status(domain_1.HttpStatusCode.OK).send(result.value);
        });
    }
    generateTeamsByPlayerStars(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield generate_teams_usecase_1.GenerateTeamsByPlayerStarsUseCase.execute(id);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            res.status(domain_1.HttpStatusCode.CREATED).send({
                data: result.value.map((team) => (0, team_presenter_1.TeamPresenter)(team)),
            });
        });
    }
    makePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const paymentDto = Object.assign(Object.assign({}, req.body), { user: user.id });
            const result = yield payment_match_usecase_1.MakePaymentUseCase.execute(paymentDto);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            const data = (0, payment_presenter_1.PaymentPresenter)(result.value);
            res
                .send({
                data,
            })
                .status(domain_1.HttpStatusCode.CREATED);
        });
    }
    unpaidMatchs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const result = yield get_user_unpaid_matches_usecase_1.GetUserUnpaidMatchesUseCase.execute(user.id);
            if (result.isLeft()) {
                return res.status(result.value.code).send(result.value.message);
            }
            const data = result.value.map((match) => (0, match_presenter_1.MatchPresenter)(match));
            res.send({
                data,
            }).status(domain_1.HttpStatusCode.CREATED);
        });
    }
}
exports.default = new MatchController();
