import { CreateUserDto } from '../../../domain/dto/user.dto';
import { User } from '../../../domain/entities/user';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  register(data: CreateUserDto): Promise<User | null>;
  update(id: string, user: Partial<CreateUserDto>): Promise<User | null>;
  delete(id: string): Promise<void | null>;
}
