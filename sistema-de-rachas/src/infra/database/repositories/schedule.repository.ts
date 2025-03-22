import { CreateScheduleDto } from '../../../domain/dto/schedule.dto';
import { Schedule } from '../../../domain/entities/schedule';

export interface ScheduleRepository {
  findById(id: string): Promise<Schedule | null>;
  findByName(name: string): Promise<Schedule | null>;
  create(data: CreateScheduleDto): Promise<Schedule | null>;
  update(
    id: string,
    user: Partial<CreateScheduleDto>
  ): Promise<Schedule | null>;
  delete(id: string): Promise<void>;
}
