import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';
import { Match } from '../../entities/match';

export class FetchMatchUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );

  static async execute(): Promise<Array<Match>> {
    return FetchMatchUseCase.repository.all();
  }
}
