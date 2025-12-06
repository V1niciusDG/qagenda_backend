import { UserType } from '../enums/UserType';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  user_type: UserType;
  phone?: string;
}

export { ICreateUserDTO };
