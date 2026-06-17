import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { env } from '../config/env.js';
import { HttpError } from '../utils/http-error.js';

const router = express.Router();

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'])
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post('/register', async (req, res, next) => {
  try {
    const payload = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: payload.email } });
    if (existing) {
      throw new HttpError(409, 'Email already exists');
    }

    const passwordHash = await bcrypt.hash(payload.password, 12);
    const user = await prisma.user.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        passwordHash,
        role: payload.role
      },
      select: { id: true, fullName: true, email: true, role: true, createdAt: true }
    });

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const payload = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) {
      throw new HttpError(401, 'Invalid credentials');
    }

    const isValid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!isValid) {
      throw new HttpError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email, role: user.role },
      env.jwtSecret,
      { expiresIn: env.jwtExpiresIn }
    );

    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
