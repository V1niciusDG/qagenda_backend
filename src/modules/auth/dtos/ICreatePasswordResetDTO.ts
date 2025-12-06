interface ICreatePasswordResetDTO {
  user_id: number;
  token: string;
  expires_at: Date;
}

export { ICreatePasswordResetDTO };
