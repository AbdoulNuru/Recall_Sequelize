/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`The sequelize server started @ ${PORT}`);
});
