import { Model } from 'mongoose';
import { UserRepository } from '../user.repository';
import { UserDocument } from '../../mongose/models/user.model';
import { User } from '../../../../domain/entities/user';
import { CreateUserDto } from '../../../../domain/dto/user.dto';

export class UserMongoRespository implements UserRepository {
  private model: Model<UserDocument>;

  constructor(model: Model<UserDocument>) {
    this.model = model;
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.model.findById(id);
    if (!user) return null;
    return this.parseToEntity(user);
  }
  async register(payload: CreateUserDto): Promise<User | null> {
    const createdUser = await this.model.create(payload);
    await createdUser.save();
    if (!createdUser) return null;

    return this.parseToEntity(createdUser);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.model.findOne().where('email').equals(email);
    if (!user) return null;
    return this.parseToEntity(user);
  }
  async update(
    id: string,
    payload: Partial<CreateUserDto>
  ): Promise<User | null> {
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(([_, value]) => value !== undefined && value !== null)
    );

    const user = await this.model.findByIdAndUpdate(
      id, 
      cleanPayload, 
      { new: true, runValidators: true }
    );
    
    if (!user) return null;
    return this.parseToEntity(user);
  }

  async delete(id: string): Promise<void | null> {
    await this.model.findByIdAndDelete(id);
  }

  private parseToEntity(document: UserDocument): User {
    return new User({
      email: document.email,
      id: document._id as string,
      name: document.name,
      password: document.password,
      photoUrl: document.photoUrl,
      role: document.role,
    });
  }
}
