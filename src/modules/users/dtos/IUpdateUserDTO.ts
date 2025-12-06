import { UserType } from '../enums/UserType';

interface IUpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  user_type?: UserType;
}

export { IUpdateUserDTO };
