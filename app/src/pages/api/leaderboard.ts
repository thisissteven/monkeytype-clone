import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from '../api/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    switch (req.method) {
      case 'GET':
        // eslint-disable-next-line no-case-declarations
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);

        // eslint-disable-next-line no-case-declarations
        const [daily, allTime] = await Promise.all([
          prisma.leaderboard.findMany({
            where: {
              createdAt: {
                gte: today,
              },
            },
            orderBy: [
              {
                wpm: 'desc',
              },
            ],
            take: 100,
            select: {
              id: true,
              name: true,
              time: true,
              type: true,
              wpm: true,
              createdAt: true,
            },
          }),

          prisma.leaderboard.findMany({
            orderBy: [
              {
                wpm: 'desc',
              },
            ],
            take: 100,
            select: {
              id: true,
              name: true,
              time: true,
              type: true,
              wpm: true,
              createdAt: true,
            },
          }),
        ]);

        res.status(200).json({
          daily,
          allTime,
        });

        break;

      case 'POST':
        if (session) {
          const user = await prisma.leaderboard.create({
            data: {
              ...req.body,
              user: {
                connect: {
                  email: session.user?.email as string,
                },
              },
            },
          });

          res.status(200).json(user);
        } else {
          const user = await prisma.leaderboard.create({
            data: {
              ...req.body,
            },
          });

          res.status(200).json(user);
        }

        break;

      default:
        res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      // eslint-disable-next-line no-console
      console.error(err.message);

      res.status(500).json({
        statusCode: 500,
        message: err.message,
      });
    }
  }
}
