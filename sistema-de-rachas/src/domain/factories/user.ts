import { User, UserParams } from '../entities';
import { UserRoleEnum } from '../enums';
import { uid } from 'uid';
import { faker } from '@faker-js/faker';

export class UserFactory {
  static createUser(params?: Partial<UserParams>): User {
    const defaultParams: UserParams = {
      id: uid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 8 }),
      role: faker.helpers.arrayElement([
        UserRoleEnum.CLIENT,
        UserRoleEnum.OWNER,
      ]),
      photoUrl: faker.image.avatar(),
    };

    const userParams: UserParams = { ...defaultParams, ...params };
    return new User(userParams);
  }
}
