import { CreateSoccerFieldDto } from '../../../domain/dto/soccer-field.dto';
import { SoccerField } from '../../../domain/entities/soccer-field';
import { TimeInterval } from '../../../domain/types/available-times';

export interface SoccerFieldRepository {
  all(): Promise<Array<SoccerField>>;
  allByUser(userId: string): Promise<Array<SoccerField>>;
  findById(id: string): Promise<SoccerField | null>;
  findByName(name: string): Promise<SoccerField | null>;
  create(data: CreateSoccerFieldDto): Promise<SoccerField | null>;
  getAvailableTimes(id: string, day?: string): Promise<any>;
  update(
    id: string,
    payload: Partial<CreateSoccerFieldDto>
  ): Promise<SoccerField | null>;
  delete(id: string): Promise<SoccerField | null>;
}
