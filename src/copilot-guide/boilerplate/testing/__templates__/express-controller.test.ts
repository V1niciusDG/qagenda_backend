import { makeReq, makeRes, runMiddleware } from '@test-utils/express';
import type { Request, Response, NextFunction } from 'express';

// Exemplo de controller simples
async function ExampleController(
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  const { name } = req.body ?? {};
  if (!name) {
    return res.status(400).json({ message: 'name required' });
  }
  return res.status(200).json({ hello: name });
}

describe('Express Controller Template', () => {
  it('200 ok', async () => {
    const req = makeReq({ body: { name: 'world' } }) as unknown as Request;
    const res = makeRes();
    await runMiddleware(ExampleController as any, req, res as any);
    expect(res.statusCode).toBe(200);
    expect(res.__getJSON()).toEqual({ hello: 'world' });
  });

  it('400 when missing name', async () => {
    const req = makeReq({ body: {} }) as unknown as Request;
    const res = makeRes();
    await runMiddleware(ExampleController as any, req, res as any);
    expect(res.statusCode).toBe(400);
    expect(res.__getJSON()).toEqual({ message: 'name required' });
  });
});
