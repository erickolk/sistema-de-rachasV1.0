import { CreateTeamDto } from '../../../domain';
import { CreateMatchDto, MatchDto } from '../../../domain/dto/match.dto';
import { Match } from '../../../domain/entities/match';

export interface MatchRepository {
  all(): Promise<Array<Match>>;
  findById(id: string): Promise<Match | null>;
  create(data: CreateMatchDto): Promise<Match | null>;
  update(id: string, data: Partial<CreateMatchDto>): Promise<Match | null>;
  delete(id: string): Promise<Match | null>;
  createTeams(id: string, data: Array<CreateTeamDto>): Promise<Match | null>;
  findUnpaidMatchesByUser(userId: string): Promise<Match[]>;
}
