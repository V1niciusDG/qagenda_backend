import { Router } from 'express';
import { FindEntityController } from '../useCases/find/FindEntityController';
import { CreateEntityController } from '../useCases/create/CreateEntityController';
import { Authenticated } from '@middleware/Authenticated';
import { HasTenant } from '@middleware/HasTenant';

const entityRoutes = Router();
const findEntityController = new FindEntityController();
const createEntityController = new CreateEntityController();

// GET /entities - Lista todas as entidades
entityRoutes.get('/', [Authenticated, HasTenant], findEntityController.handle);

// POST /entities - Cria nova entidade
entityRoutes.post(
  '/',
  [Authenticated, HasTenant],
  createEntityController.handle,
);

export { entityRoutes };
