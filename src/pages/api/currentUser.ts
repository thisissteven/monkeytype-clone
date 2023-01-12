import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';

import prisma from '@/lib/prisma';

import { authOptions } from './auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await unstable_getServerSession(req, res, authOptions);
    switch (req.method) {
      case 'GET':
        if (session && session.user?.email) {
          const user = await prisma.user.findUnique({
            where: {
              email: session.user?.email,
            },
          });

          res.status(200).json(user);
        } else {
          res.status(200).json(null);
        }
        break;

      case 'PUT':
        if (session && session.user?.email) {
          const user = await prisma.user.update({
            data: {
              name: 'Steven',
            },
            where: {
              email: session.user?.email,
            },
          });

          res.status(200).json(user);
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
