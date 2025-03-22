import { FastifyReply, FastifyRequest } from 'fastify';

import { GetAmountPaidPlayerUseCase } from '../../../domain/use-cases/match/get-amount-paid-player.usecase';
import { RegisterMatchUseCase } from '../../../domain/use-cases/match/register-match.usecase';
import { UpdateMatchUseCase } from '../../../domain/use-cases/match/update-match.usecase';
import { FindMatchUseCase } from '../../../domain/use-cases/match/find-match.usecase';
import { CreateMatchDto } from '../../../domain/dto/match.dto';
import {
  MatchPresenter,
  MatchsPresenter,
} from '../../../application/presenters/match.presenter';
import { FetchMatchUseCase } from '../../../domain/use-cases/match/fetch-match.usecase';
import { CreatePaymentDto, HttpStatusCode } from '../../../domain';
import { GenerateTeamsByPlayerStarsUseCase } from '../../../domain/use-cases/match/generate-teams.usecase';
import { RemoveMatchUseCase } from '../../../domain/use-cases/match/remove-match.usecase';
import { TeamPresenter } from '../../../application/presenters/team.presenter';
import { GetUserMatchesUseCase } from '../../../domain/use-cases/match/get-user-matches.usecase';
import { MakePaymentUseCase } from '../../../domain/use-cases/match/payment-match.usecase';
import { PaymentPresenter } from '../../../application/presenters/payment.presenter';
import { GetUserUnpaidMatchesUseCase } from '../../../domain/use-cases/match/get-user-unpaid-matches.usecase';
import { MatchMongoRepository } from '../../database/repositories/mongoose/match.repository';
import MatchModel from '../../database/mongose/models/match.model';

class MatchController {
  async all(req: FastifyRequest, res: FastifyReply) {
    const matchs = await FetchMatchUseCase.execute();
    res.send({
      data: matchs,
    });
  }
  async register(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;

    const result = await RegisterMatchUseCase.execute({
      ...(req.body as CreateMatchDto),
      user: user.id,
    });

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: MatchPresenter(result.value),
    });
  }

  async getAmountPaidPlayer(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const total = GetAmountPaidPlayerUseCase.execute(id);
    res.send({
      data: {
        total,
      },
    });
  }

  async findById(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const result = await FindMatchUseCase.execute(id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: MatchPresenter(result.value),
    });
  }

  async getUserMatches(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const result = await GetUserMatchesUseCase.execute(user.id, user.role);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.OK).send(MatchsPresenter(result.value));
  }

  async getUserUnpaidMatches(req: FastifyRequest, res: FastifyReply) {
    try {
      const user = req.user as any;
      const result = await GetUserUnpaidMatchesUseCase.execute(user.id);

      if (result.isLeft()) {
        return res
          .status(result.value.code)
          .send({ message: result.value.message });
      }

      res.status(HttpStatusCode.OK).send(result.value);
    } catch (error) {
      return res
        .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
        .send({ error: 'Erro ao buscar partidas não pagas' });
    }
  }

  async update(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const matchDto = req.body as Partial<CreateMatchDto>;
    const result = await UpdateMatchUseCase.execute(id, matchDto);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: MatchPresenter(result.value),
    });
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const result = await RemoveMatchUseCase.execute(req.params.id);
    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.OK).send(result.value);
  }

  async generateTeamsByPlayerStars(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const result = await GenerateTeamsByPlayerStarsUseCase.execute(id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.CREATED).send({
      data: result.value.map((team) => TeamPresenter(team)),
    });
  }

  async makePayment(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;

    const paymentDto: CreatePaymentDto = {
      ...(req.body as CreatePaymentDto),
      user: user.id,
    };

    const result = await MakePaymentUseCase.execute(paymentDto);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    const data = PaymentPresenter(result.value);

    res
      .send({
        data,
      })
      .status(HttpStatusCode.CREATED);
  }

  async unpaidMatchs(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;

    const result = await GetUserUnpaidMatchesUseCase.execute(user.id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    const data = result.value.map((match) => MatchPresenter(match));

    res.send({
      data,
    }).status(HttpStatusCode.CREATED);
  } 
}

export default new MatchController();
