import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const router = Router();

router.post('/', async (req, res) => {
    const { userId, action } = req.body;
    try {
        const userAction = await prisma.userAction.create({
            data: { userId, action }
        });
        res.status(201).json(userAction);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const { userId, page = 1, pageSize = 10 } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(pageSize as string);

    try {
        const userActions = await prisma.userAction.findMany({
            where: { userId: parseInt(userId as string) },
            skip: offset,
            take: parseInt(pageSize as string),
        });
        res.status(200).json(userActions);
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
