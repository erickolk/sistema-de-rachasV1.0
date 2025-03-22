import { SoccerFieldDto } from '../../domain/dto/soccer-field.dto';
import { SoccerField } from '../../domain/entities/soccer-field';
import { SchedulePresenter } from './schedule.presenter';
import { UserPresenter } from './user.presenter';

export const SoccerFieldPresenter = (
  soccerField: SoccerField
): Partial<SoccerFieldDto> => {
  return {
    id: soccerField.id.toString(),
    name: soccerField.name,
    pixKey: soccerField.pixKey,
    rentalValue: soccerField.rentalValue,
    workDays: soccerField.workDays,
    workFinishTime: soccerField.workFinishTime.toString(),
    workStartTime: soccerField.workStartTime.toString(),
    user: UserPresenter(soccerField.user)
  };
};

export const ArraySoccerFieldPresenter = (
  soccerFields: Array<SoccerField>
): Array<Partial<SoccerFieldDto>> => {
  return soccerFields.map((soccerField) => SoccerFieldPresenter(soccerField));
};
