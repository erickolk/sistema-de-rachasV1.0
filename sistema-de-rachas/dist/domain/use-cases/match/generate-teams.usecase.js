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
exports.GenerateTeamsByPlayerStarsUseCase = void 0;
const uid_1 = require("uid");
const team_1 = require("../../entities/team");
const utils_1 = require("../../utils");
const http_error_1 = require("../../errors/http.error");
const enums_1 = require("../../enums");
const match_repository_1 = require("../../../infra/database/repositories/mongoose/match.repository");
const match_model_1 = __importDefault(require("../../../infra/database/mongose/models/match.model"));
const team_presenter_1 = require("../../../application/presenters/team.presenter");
class GenerateTeamsByPlayerStarsUseCase {
    static execute(matchId_1) {
        return __awaiter(this, arguments, void 0, function* (matchId, maxDifference = 1) {
            const match = yield GenerateTeamsByPlayerStarsUseCase.repository.findById(matchId);
            if (!match) {
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.NOT_FOUND, 'Partida não encontrada.'));
            }
            const players = [...match.players];
            if (players.length < team_1.Team.minPlayers * 2) {
                return (0, utils_1.left)(new http_error_1.HttpError(enums_1.HttpStatusCode.INTERNAL_SERVER_ERROR, `É necessário ter no mínimo: ${team_1.Team.minPlayers * 2} jogadores para criar 2 times!`));
            }
            players.sort((a, b) => b.stars - a.stars);
            const playersQuantity = players.length;
            const teamQuantity = Math.floor(playersQuantity / team_1.Team.minPlayers);
            let teams = Array.from({ length: teamQuantity }, (_, index) => new team_1.Team({
                id: (0, uid_1.uid)(),
                name: `Team ${index + 1}`,
                players: [],
            }));
            const distributePlayers = (remainingPlayers, currentTeams, differenceLimit) => {
                if (remainingPlayers.length === 0) {
                    return currentTeams;
                }
                const player = remainingPlayers[0];
                let minTeam = currentTeams.reduce((minTeam, currentTeam) => currentTeam.totalStars < minTeam.totalStars ? currentTeam : minTeam, currentTeams[0]);
                minTeam.addPlayer(player);
                const minStars = Math.min(...currentTeams.map((team) => team.totalStars));
                const maxStars = Math.max(...currentTeams.map((team) => team.totalStars));
                if (maxStars - minStars > differenceLimit) {
                    minTeam.removePlayer(player.id);
                    return distributePlayers(remainingPlayers, currentTeams, differenceLimit + 1);
                }
                return distributePlayers(remainingPlayers.slice(1), currentTeams, differenceLimit);
            };
            teams = distributePlayers(players, teams, maxDifference);
            GenerateTeamsByPlayerStarsUseCase.repository.update(matchId, {
                teams: teams.map((team) => (0, team_presenter_1.TeamCreatePresenter)(team)),
            });
            return (0, utils_1.right)(teams);
        });
    }
}
exports.GenerateTeamsByPlayerStarsUseCase = GenerateTeamsByPlayerStarsUseCase;
GenerateTeamsByPlayerStarsUseCase.repository = new match_repository_1.MatchMongoRepository(match_model_1.default);
