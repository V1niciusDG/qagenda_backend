import dotenv from 'dotenv';

dotenv.config();

if (!process.env.SECRET_TOKEN) {
  throw new Error('SECRET_TOKEN must be provided in .env');
}

if (!process.env.EXPIRES_IN_TOKEN) {
  throw new Error('EXPIRES_IN_TOKEN must be provided in .env');
}

if (!process.env.SECRET_REFRESH_TOKEN) {
  throw new Error('SECRET_REFRESH_TOKEN must be provided in .env');
}

if (!process.env.EXPIRES_IN_REFRESH_TOKEN) {
  throw new Error('EXPIRES_IN_REFRESH_TOKEN must be provided in .env');
}

export default {
  secret_token: process.env.SECRET_TOKEN,
  expires_in_token: process.env.EXPIRES_IN_TOKEN,
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expires_in_refresh_token: process.env.EXPIRES_IN_REFRESH_TOKEN,
};
