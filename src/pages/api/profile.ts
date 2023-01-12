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
        if (session && session.user?.email) {
          // eslint-disable-next-line no-case-declarations
          const [best, recent] = await Promise.all([
            prisma.leaderboard.findMany({
              where: {
                user: {
                  email: session.user.email,
                },
              },
              orderBy: [
                {
                  wpm: 'desc',
                },
              ],
              take: 4,
              select: {
                id: true,
                time: true,
                type: true,
                wpm: true,
                createdAt: true,
              },
            }),

            prisma.leaderboard.findMany({
              where: {
                user: {
                  email: session.user.email,
                },
              },
              orderBy: [
                {
                  createdAt: 'desc',
                },
              ],
              take: 4,
              select: {
                id: true,
                time: true,
                type: true,
                wpm: true,
                createdAt: true,
              },
            }),
          ]);

          res.status(200).json({
            best,
            recent,
          });
        } else {
          res.status(401).json({ message: 'Unauthorized' });
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
