import { Either, left, right } from '../../utils'; 
import { HttpError } from '../../errors/http.error';
import { HttpStatusCode } from '../../enums';
import { Match } from '../../entities/match';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';

export type OwnerMatchesResponse = {
  totalMatches: number;
  matches: Match[];
}

export class GetOwnerMatchesUseCase {
  static async execute(userId: string): Promise<Either<HttpError, OwnerMatchesResponse>> {
    try {
      const repository = new MatchMongoRepository(MatchModel);
      const allMatches = await repository.all();
      
      // Filtra partidas dos campos do dono
      const ownerMatches = allMatches.filter(
        match => match.soccerField.user.id === userId
      );

      // Ordena por data/hora
      const sortedMatches = ownerMatches.sort((a, b) => {
        const dateA = new Date(`${a.schedules[0].day} ${a.schedules[0].startTime}`);
        const dateB = new Date(`${b.schedules[0].day} ${b.schedules[0].startTime}`);
        return dateA.getTime() - dateB.getTime();
      });

      return right({
        totalMatches: ownerMatches.length,
        matches: sortedMatches
      });
    } catch (error) {
      return left(
        new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao buscar partidas do proprietário'
        )
      );
    }
  }
}
