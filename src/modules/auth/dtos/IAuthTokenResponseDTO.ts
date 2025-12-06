interface IAuthTokenResponseDTO {
  token: string;
  refresh_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export { IAuthTokenResponseDTO };
