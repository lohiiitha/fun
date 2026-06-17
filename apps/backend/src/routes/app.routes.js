import express from 'express';
import { z } from 'zod';
import { createResourceRouter } from './resource-factory.js';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

const studentSchema = z.object({
  userId: z.string().uuid(),
  admissionNo: z.string().min(2),
  grade: z.string().min(1),
  section: z.string().min(1)
});

const attendanceSchema = z.object({
  studentId: z.string().uuid(),
  date: z.coerce.date(),
  status: z.enum(['PRESENT', 'ABSENT', 'LATE'])
});

const announcementSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(5),
  postedById: z.string().uuid()
});

const resultSchema = z.object({
  studentId: z.string().uuid(),
  subject: z.string().min(2),
  examName: z.string().min(2),
  marks: z.number().min(0).max(100),
  totalMarks: z.number().min(1)
});

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  location: z.string().min(2)
});

const gallerySchema = z.object({
  title: z.string().min(3),
  imageUrl: z.string().url(),
  eventId: z.string().uuid().optional()
});

const admissionSchema = z.object({
  studentName: z.string().min(2),
  guardianName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  notes: z.string().max(500).optional()
});

const feedbackSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(5),
  category: z.enum(['QUERY', 'FEEDBACK', 'COMPLAINT'])
});

router.use('/students', createResourceRouter({
  model: 'studentProfile',
  createSchema: studentSchema,
  include: { user: { select: { id: true, fullName: true, email: true } } }
}));

router.use('/attendance', createResourceRouter({
  model: 'attendance',
  createSchema: attendanceSchema,
  listFilter: (req) => {
    const studentId = req.query.studentId;
    return studentId ? { studentId } : {};
  }
}));

router.use('/announcements', createResourceRouter({
  model: 'announcement',
  createSchema: announcementSchema
}));

router.use('/results', createResourceRouter({
  model: 'result',
  createSchema: resultSchema
}));

router.use('/events', createResourceRouter({
  model: 'event',
  createSchema: eventSchema
}));

router.use('/gallery', createResourceRouter({
  model: 'galleryItem',
  createSchema: gallerySchema
}));

router.use('/admissions', createResourceRouter({
  model: 'admissionApplication',
  createSchema: admissionSchema
}));

router.use('/feedback', createResourceRouter({
  model: 'feedback',
  createSchema: feedbackSchema
}));

router.get('/dashboard/analytics', async (_req, res, next) => {
  try {
    const [students, teachers, announcements, upcomingEvents, feedback] = await Promise.all([
      prisma.studentProfile.count(),
      prisma.teacherProfile.count(),
      prisma.announcement.count(),
      prisma.event.count({ where: { startDate: { gte: new Date() } } }),
      prisma.feedback.count({ where: { isResolved: false } })
    ]);

    res.json({
      students,
      teachers,
      announcements,
      upcomingEvents,
      pendingFeedback: feedback
    });
  } catch (error) {
    next(error);
  }
});

export default router;
