import { UserType } from '../enums/UserType';

interface IUserDTO {
  id: number;
  name: string;
  email: string;
  user_type: UserType;
  phone?: string;
  avatar_url?: string;
  email_verified: boolean;
  email_verification_token?: string;
  blocked: boolean;
  created_at: Date;
  updated_at: Date;
}

export { IUserDTO };
