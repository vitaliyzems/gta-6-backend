import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const PORT = 9999;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post('/api', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res
      .status(400)
      .json({ status: 'Error', message: 'Email and name are required!' });
  }

  try {
    const createdRow = await prisma.waitList.create({
      data: {
        email,
        name,
      },
    });

    res.json(createdRow);
  } catch (error) {
    res.status(400).json({ status: 'error', message: error });
  }

  console.log(req.body);
  res.json({ status: 'Success' });
});

const server = app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});
