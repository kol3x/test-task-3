import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { userId, action } = req.body as { userId: string; action: string };
  try {
    const userAction = await prisma.userAction.create({
      data: { userId: parseInt(userId), action },
    });
    res.status(201).json(userAction);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const { userId, page = 1, pageSize = 10 } = req.query;

  try {
    if (typeof userId !== "string" || !userId.trim()) {
      throw new Error("userId must be provided as a non-empty string");
    }

    const pageNumber = parseInt(page as string);
    const size = parseInt(pageSize as string);

    if (isNaN(pageNumber) || pageNumber < 1 || isNaN(size) || size < 1) {
      throw new Error("Invalid page or pageSize parameters values");
    }

    const offset = (pageNumber - 1) * size;

    const userActions = await prisma.userAction.findMany({
      where: { userId: parseInt(userId as string) },
      skip: offset,
      take: size,
    });

    res.status(200).json(userActions);
  } catch (err: any) {
    console.error("Error fetching user actions:", err);
    res.status(500).json({ error: err.message });
  }
});


export default router;
