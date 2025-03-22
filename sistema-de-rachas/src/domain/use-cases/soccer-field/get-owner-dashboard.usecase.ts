import MatchModel from '../../../infra/database/mongose/models/match.model';
import SoccerFieldModel from '../../../infra/database/mongose/models/soccer-field.model';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { SoccerFieldMongoRepository } from '../../../infra/database/repositories/mongoose/soccer-field.repository';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

type DashboardResponse = {
  totalFields: number;
  totalScheduledMatches: number;
  fields: Array<{
    name: string;
    pixKey: string;
    rentalValue: number;
    workStartTime: string;
    workFinishTime: string;
  }>;
  upcomingMatches: Array<{
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    field: string;
  }>;
};

export class GetOwnerDashboardUseCase {
  static async execute(
    userId: string
  ): Promise<Either<HttpError, DashboardResponse>> {
    try {
      const soccerFieldRepository = new SoccerFieldMongoRepository(
        SoccerFieldModel
      );
      const matchRepository = new MatchMongoRepository(MatchModel);

      // Primeiro busca os campos do usuário
      const ownerFields = await soccerFieldRepository.allByUser(userId);

      // Busca as partidas usando o modelo diretamente para garantir o populate
      const fieldIds = ownerFields.map((field) => field.id);
      const matches = await MatchModel.find({
        soccerField: { $in: fieldIds },
      })
        .populate(['soccerField', 'schedules'])
        .exec();

      return right({
        totalFields: ownerFields.length,
        totalScheduledMatches: matches.length,
        fields: ownerFields.map((field) => ({
          name: field.name,
          pixKey: field.pixKey,
          rentalValue: field.rentalValue,
          workStartTime: field.workStartTime.toString(),
          workFinishTime: field.workFinishTime.toString(),
        })),
        upcomingMatches: matches
          .sort(
            (a, b) =>
              new Date(a.schedules[0].day).getTime() -
              new Date(b.schedules[0].day).getTime()
          )
          .map((match) => ({
            name: match.name,
            date: match.schedules[0].day,
            startTime: match.schedules[0].startTime,
            endTime: match.schedules[0].finishTime,
            field: match.soccerField.name,
          })),
      });
    } catch (error) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao buscar dados do dashboard'
        )
      );
    }
  }
}
