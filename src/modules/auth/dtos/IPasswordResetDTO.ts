interface IPasswordResetDTO {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date;
  used_at?: Date;
  created_at: Date;
}

export { IPasswordResetDTO };
