import { UserRoleEnum } from '../enums';

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  photoUrl?: string;
  isMatchAdmin?: boolean;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type UserDto = {
  id: string;
  name: string;
  email: string;
  role: UserRoleEnum;
  photoUrl?: string;
};
