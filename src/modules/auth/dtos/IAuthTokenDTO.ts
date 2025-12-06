import { UserType } from '@modules/users/enums/UserType';

interface IAuthTokenDTO {
  email: string;
  password: string;
  user_type: UserType;
}

export { IAuthTokenDTO };
