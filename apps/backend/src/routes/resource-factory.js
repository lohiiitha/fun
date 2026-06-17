import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

export const createResourceRouter = ({
  model,
  createSchema,
  createData = (payload) => payload,
  include,
  orderBy = { createdAt: 'desc' },
  listFilter = () => ({})
}) => {
  const router = express.Router();

  router.get('/', async (req, res, next) => {
    try {
      const items = await prisma[model].findMany({
        where: listFilter(req),
        orderBy,
        include
      });
      res.json({ data: items, count: items.length });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const payload = createSchema.parse(req.body);
      const item = await prisma[model].create({
        data: createData(payload)
      });

      res.status(201).json(item);
    } catch (error) {
      next(error);
    }
  });

  return router;
};

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().max(100).optional()
});
