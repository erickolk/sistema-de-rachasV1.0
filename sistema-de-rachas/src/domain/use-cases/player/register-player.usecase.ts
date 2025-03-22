import PlayerModel, {
  PlayerDocument,
} from '../../../infra/database/mongose/models/player.model';
import { PlayerMongoRepository } from '../../../infra/database/repositories/mongoose/player.repository';
import { PlayerRepository } from '../../../infra/database/repositories/player.respository';
import { CreatePlayerDto, PlayerDto } from '../../dto/player.dto';
import { Player } from '../../entities';
import { HttpStatusCode } from '../../enums';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils';

export class RegisterPlayerUseCase {
  private static repository: PlayerRepository = new PlayerMongoRepository(
    PlayerModel
  );

  static async execute(
    playerDto: CreatePlayerDto
  ): Promise<Either<HttpError, Player>> {
    try {
      const registredPlayer = await RegisterPlayerUseCase.repository.create(
        playerDto
      );
      if (!registredPlayer) {
        return left(
          new HttpError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            'Erro ao registrar jogador'
          )
        );
      }

      return right(registredPlayer);
    } catch (error) {
      return left(
        new HttpError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Erro ao registrar jogador'
        )
      );
    }
  }
}
