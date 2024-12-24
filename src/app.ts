import express, { Application } from 'express';
import linkRoutes from './routes/link.route';


const app: Application = express();


app.use(express.json());
app.use("/", linkRoutes)


export default app;