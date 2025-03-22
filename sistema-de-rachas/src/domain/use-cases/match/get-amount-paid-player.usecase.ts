import { Match, MatchParams } from '../../entities/match';
import { MatchRepository } from '../../../infra/database/repositories/match.repository';
import MatchModel from '../../../infra/database/mongose/models/match.model';
import { MatchMongoRepository } from '../../../infra/database/repositories/mongoose/match.repository';

export class GetAmountPaidPlayerUseCase {
  private static repository: MatchRepository = new MatchMongoRepository(
    MatchModel
  );
  public static async execute(id: string): Promise<number> {
    const match = await GetAmountPaidPlayerUseCase.repository.findById(id);

    if (!match) return 0;

    const matchEntity = new Match(match as MatchParams);

    return matchEntity.amountToBePaidPerPlayer;
  }
}
