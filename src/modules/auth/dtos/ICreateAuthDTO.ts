interface ICreateAuthDTO {
  refresh_token: string;
  user_id: number;
  expires_date: Date;
}

export { ICreateAuthDTO };
