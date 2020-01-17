/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import shareRoutes from './routes/share.routes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api', shareRoutes);

app.listen(PORT, () => {
  console.log(`The sequelize server started @ ${PORT}`);
});
