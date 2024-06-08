import express from 'express';
import dotenv from 'dotenv';
import actionsRouter from './routes/actions';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/actions', actionsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`User Action History Service running on port ${PORT}`);
});
