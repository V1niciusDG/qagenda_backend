import { Router } from 'express';
import { FindTenantEntityController } from '../useCases/find/FindTenantEntityController';
import { Authenticated } from '@middleware/Authenticated';

const tenantEntityRoutes = Router();
const findTenantEntityController = new FindTenantEntityController();

// GET /tenant-entities - Lista todas as entidades do tenant
// Query params: ?lang=pt_BR (opcional)
tenantEntityRoutes.get('/', [Authenticated], findTenantEntityController.handle);

export { tenantEntityRoutes };
