import PlayerModel, {
  PlayerDocument,
} from '../../../infra/database/mongose/models/player.model';
import { PlayerMongoRepository } from '../../../infra/database/repositories/mongoose/player.repository';
import { PlayerRepository } from '../../../infra/database/repositories/player.respository';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

export class RemovePlayerUseCase {
  private static repository: PlayerRepository = new PlayerMongoRepository(
    PlayerModel
  );

  static async execute(id: string): Promise<Either<HttpError, string>> {
    try {
      const deletedPlayer = await RemovePlayerUseCase.repository.delete(id);
      if (!deletedPlayer) {
        return left(
          new HttpError(HttpStatusCode.NOT_FOUND, 'Jogador não encontrado.')
        );
      }

      return right('Jogador removido com sucesso!');
    } catch (error) {
      console.error(error);
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao remover jogador!'
        )
      );
    }
  }
}
