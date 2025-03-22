import { UserModel } from '../../../infra/database/mongose/models/user.model';
import { UserMongoRespository } from '../../../infra/database/repositories/mongoose/user.respository';
import { UserRepository } from '../../../infra/database/repositories/user.repository';
import { User } from '../../entities';
import { HttpStatusCode } from '../../enums/http-status-code';
import { HttpError } from '../../errors/http.error';
import { Either, left, right } from '../../utils/either';

interface UpdateProfileDto {
  name: string;
  email: string;
}

export class UpdateUserProfileUsecase {
  private static repository: UserRepository = new UserMongoRespository(
    UserModel
  );

  static async execute(userId: string, data: UpdateProfileDto): Promise<Either<HttpError, User>> {
    try {
      // Buscar o usuário atual primeiro
      const currentUser = await this.repository.findById(userId);
      if (!currentUser) {
        return left(
          new HttpError(HttpStatusCode.NOT_FOUND, 'Usuário não encontrado')
        );
      }

      // Verificar se o e-mail está sendo alterado
      if (data.email && data.email !== currentUser.email) {
        // Só verificar duplicação se o e-mail estiver mudando
        const existingUser = await this.repository.findByEmail(data.email);
        if (existingUser) {
          return left(
            new HttpError(HttpStatusCode.BAD_REQUEST, 'Este e-mail já está em uso por outro usuário')
          );
        }
      }

      // Atualizar o usuário
      const updatedUser = await this.repository.update(userId, {
        name: data.name,
        email: data.email
      });

      if (!updatedUser) {
        return left(
          new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao atualizar o perfil')
        );
      }

      return right(updatedUser);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return left(
        new HttpError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Erro ao atualizar o perfil')
      );
    }
  }
} 