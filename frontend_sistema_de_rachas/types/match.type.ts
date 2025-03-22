import type { PlayerPositionsEnum } from "sistema-rachas-domain/enums";

export type MatchWithRelationsDto = {
    id: string;
    name: string;
    thumb: string;
    description: string;
    soccerField: {
      id: string;
      name: string;
      rentalValue: number;
      pixKey: string;
      workDays: string[];
      workStartTime: string;
      workFinishTime: string;
      user: {
        id: string;
      };
    };
    schedules: {
      id: string;
      startTime: string;
      finishTime: string;
      day: string;
    }[];
    players: {
      id: string;
      name: string;
      stars: number;
      position: PlayerPositionsEnum;
    }[];
    teams: {
      name: string;
      players: {
        id: string;
        name: string;
        stars: number;
        position: PlayerPositionsEnum;
      }[];
    }[];
    user: {
      id: string;
    };
    payment: {
      id: string;
      paymentDate: string;
      paymentMethod: string;
      amount: number;
      discount: number;
      totalAmountWithDiscount: number;
      match: {
        id: string;
        name: string;
        thumb: string;
        description: string;
        soccerField: {
          id: string;
          name: string;
          rentalValue: number;
          pixKey: string;
          workDays: string[];
          workStartTime: string;
          workFinishTime: string;
          user: {
            id: string;
            name: string;
            email: string;
            password: string;
            photoUrl: string;
            role: number;
          };
        };
        schedules: {
          id: string;
          startTime: {
            hours: number;
            minutes: number;
            seconds: number;
          };
          finishTime: {
            hours: number;
            minutes: number;
            seconds: number;
          };
          day: string;
        }[];
        players: {
          name: string;
          stars: number;
          _id: string;
        }[];
        teams: {
          name: string;
          players: {
            id: string;
            name: string;
            stars: number;
          }[];
        }[];
        user: {
          _id: string;
          name: string;
          email: string;
          password: string;
          role: number;
        };
        paymentListPlayers: any[];
      };
      user: {
        id: string;
        name: string;
        email: string;
        password: string;
        photoUrl: string;
        role: number;
      };
    };
    paymentListPlayers: any[];
  }