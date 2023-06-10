import express, { Express, Request, Response } from 'express';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

import chainsRouter from './routes/chains';
import tokensRouter from './routes/tokens';
import usersRouter from './routes/users';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoDB = process.env.CONNECTION_STRING!;

connect(mongoDB);

app.use(express.json());

app.use('/chains', chainsRouter);
app.use('/tokens', tokensRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
