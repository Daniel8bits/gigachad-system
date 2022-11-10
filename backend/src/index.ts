import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gigaChad from './middleware/gigaChad';
import withAuth from './middleware/withAuth';
import withUser from './middleware/withUser';
import { UserType } from './models/User';

import routes from './routes';

dotenv.config({
    path: ".env.development"
});

const app: Express = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}));

if (process.env.NODE_ENV == "production") {
    //app.use(cors());
}

app.use(gigaChad);
app.use(routes.app);

app.use((req, res) => {
    res.error(404);
})

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})