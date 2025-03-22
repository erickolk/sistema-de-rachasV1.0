import { Player } from './player';
import { Schedule } from './schedule';
import { SoccerField } from './soccer-field';
import { User } from './user';
import { Payment } from './payment';
import { Team } from './team';

export type MatchParams = {
  id: string;
  name: string;
  thumb: string;
  description: string;
  soccerField: SoccerField;
  schedules: Schedule[];
  players?: Array<Player>;
  teams?: Array<Team>;
  user: User;
  payment?: Payment;
};

export class Match {
  id: string;
  name: string;
  thumb: string;
  players: Array<Player>;
  schedules: Schedule[];
  paymentListPlayers: Array<string>;
  soccerField: SoccerField;
  teams?: Array<Team>;
  description: string;
  user: User;
  payment?: Payment;

  public constructor(params: MatchParams) {
    this.id = params.id;
    this.name = params.name;
    this.thumb = params.thumb;
    this.description = params.description;
    this.soccerField = params.soccerField;
    this.schedules = params.schedules;
    this.players = params.players || [];
    this.teams = params.teams || [];
    this.user = params.user;
    this.payment = params.payment;
    this.paymentListPlayers = [];
  }

  public addPlayer(player: Player) {
    this.players.push(player);
  }

  public removePlayer(playerID: string) {
    const indexPlayer = this.players.findIndex(
      (player) => player.id === playerID
    );
    if (indexPlayer !== -1) {
      this.players.splice(indexPlayer, 1);
    }
  }

  public getPlayer(playerID: string): Player | undefined {
    return this.players.find((playerItem) => playerItem.id === playerID);
  }

  public pay(playerID: string) {
    this.paymentListPlayers.push(playerID);
  }

  public get totalHours(): number {
    return this.schedules.reduce((sum, schedule) => sum + schedule.totalHours, 0);
  }

  public get amountToBePaidPerPlayer(): number {
    if (this.players.length === 0) {
      return 0;
    }
    return (this.totalHours * this.soccerField.rentalValue) / this.players.length;
  }

  public get isPaid(): boolean {
    return !!this.payment;
  }
}