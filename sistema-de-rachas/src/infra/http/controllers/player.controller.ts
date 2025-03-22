import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterPlayerUseCase } from '../../../domain/use-cases/player/register-player.usecase';
import { CreatePlayerDto } from '../../../domain/dto/player.dto';
import { HttpStatusCode } from '../../../domain/enums/http-status-code';
import { PlayerPresenter } from '../../../application/presenters/player.presenter';
import { RemovePlayerUseCase } from '../../../domain/use-cases/player/remove-player.usecase copy';

class PlayerController {
  async register(req: FastifyRequest, res: FastifyReply) {
    const playerDto = req.body as CreatePlayerDto;
    const result = await RegisterPlayerUseCase.execute(playerDto);

    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.CREATED).send(PlayerPresenter(result.value));
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const result = await RemovePlayerUseCase.execute(req.params.id);
    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.OK).send(result.value);
  }
}

export default new PlayerController();
