import express from 'express';
import helmet from 'helmet';
import cors from './middlewares/cors';
import mongo from './utils/mongo';
import routes from './routes';
import extractJWT from './middlewares/auth';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('env', process.env.NODE_ENV || 'dev');

mongo.init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors);

app.use(extractJWT);
app.use('/api', routes);

export default app;
