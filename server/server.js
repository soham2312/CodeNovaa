import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
dotenv.config();
app.listen(express.json());


app.use('/users', userRoutes);
// app.use();

app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});