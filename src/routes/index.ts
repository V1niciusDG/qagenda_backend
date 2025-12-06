import { Router } from 'express';
import { userRoutes } from '@modules/users/route';
import { authRoutes } from '@modules/auth/route';
import { errorMiddleware } from '@middleware/ErrorMiddleware';
import { swaggerRoutes } from '@config/swagger';

const router = Router();

const moduleRegister = [
  {
    name: 'Doc',
    url: '/doc',
    handlers: swaggerRoutes,
  },
  {
    name: 'Auth',
    url: '/auth',
    handlers: authRoutes,
  },
  {
    name: 'User',
    url: '/user',
    handlers: userRoutes,
  },
];

moduleRegister.map((module) => {
  router.use(module.url, module.handlers);
});

router.use(errorMiddleware);

export { router, moduleRegister };
