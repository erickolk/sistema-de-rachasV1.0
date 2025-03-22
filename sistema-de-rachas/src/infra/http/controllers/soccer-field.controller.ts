import { FastifyReply, FastifyRequest } from 'fastify';
import { RegisterSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/register-soccer-field.usecase';
import { CreateSoccerFieldDto } from '../../../domain/dto/soccer-field.dto';
import {
  ArraySoccerFieldPresenter,
  SoccerFieldPresenter,
} from '../../../application/presenters/soccer-field.presenter';
import { FetchSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/fetch-soccer-field.usecase';
import { GetSoccerFieldAvailableTimes } from '../../../domain/use-cases/soccer-field/get-soccer-field-available-times';
import { HttpStatusCode } from '../../../domain';
import { FetchSoccerFieldByUserUseCase } from '../../../domain/use-cases/soccer-field/fetch-soccer-field-by-user';
import { RemoveSoccerFieldUsecase } from '../../../domain/use-cases/soccer-field/remove-soccer-field.usecase';
import { FindSoccerFieldByIdUseCase } from '../../../domain/use-cases/soccer-field/find-soccer-field-by-id.usecase';
import { UpdateSoccerFieldUseCase } from '../../../domain/use-cases/soccer-field/update-soccer-field.usecase';
import { GetOwnerMatchesUseCase } from '../../../domain/use-cases/soccer-field/get-owner-matches.usecase';
import { GetOwnerDashboardUseCase } from '../../../domain/use-cases/soccer-field/get-owner-dashboard.usecase';

class SoccerFieldController {
  async all(req: FastifyRequest, res: FastifyReply) {
    const result = await FetchSoccerFieldUseCase.execute();

    if (result.isRight()) {
      res
        .status(HttpStatusCode.OK)
        .send(ArraySoccerFieldPresenter(result.value));
    } else {
      res.status(result.value.code).send(result.value.message);
    }
  }
  async findById(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const result = await FindSoccerFieldByIdUseCase.execute(id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.OK).send(SoccerFieldPresenter(result.value));
  }

  async allByUser(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const result = await FetchSoccerFieldByUserUseCase.execute(user.id);

    if (result.isRight()) {
      res
        .status(HttpStatusCode.OK)
        .send(ArraySoccerFieldPresenter(result.value));
    } else {
      res.status(result.value.code).send(result.value.message);
    }
  }
  async register(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const soccerFieldDto = req.body as CreateSoccerFieldDto;
    const result = await RegisterSoccerFieldUseCase.execute({
      ...soccerFieldDto,
      user: user.id,
    });

    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.CREATED).send(SoccerFieldPresenter(result.value));
  }
  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: Partial<CreateSoccerFieldDto>;
    }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const updateData = req.body;

    const result = await UpdateSoccerFieldUseCase.execute(id, updateData);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.OK).send(SoccerFieldPresenter(result.value));
  }

  async getOwnerMatches(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const result = await GetOwnerMatchesUseCase.execute(user.id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.OK).send({
      totalMatches: result.value.totalMatches,
      matches: result.value.matches.map((match) => ({
        id: match.id,
        name: match.name,
        date: match.schedules[0].day,
        startTime: match.schedules[0].startTime,
        finishTime: match.schedules[0].finishTime,
        field: match.soccerField.name,
      })),
    });
  }

  async getDashboard(req: FastifyRequest, res: FastifyReply) {
    const user = req.user as any;
    const result = await GetOwnerDashboardUseCase.execute(user.id);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value.message);
    }

    res.status(HttpStatusCode.OK).send(result.value);
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    res: FastifyReply
  ) {
    const result = await RemoveSoccerFieldUsecase.execute(req.params.id);
    if (result.isLeft()) {
      res.status(result.value.code).send(result.value.message);
      return;
    }

    res.status(HttpStatusCode.OK).send(result.value);
  }

  async availableTimes(
    req: FastifyRequest<{
      Params: { id: string };
      Querystring: { day?: string };
    }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const { day } = req.query;

    const result = await GetSoccerFieldAvailableTimes.execute(id, day);

    if (result.isLeft()) {
      return res.status(result.value.code).send(result.value);
    }

    res.status(HttpStatusCode.OK).send({
      data: result.value,
    });
  }
}

export default new SoccerFieldController();
