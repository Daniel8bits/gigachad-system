import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import gigaChad from './middleware/gigaChad';
import withAuth from './middleware/withAuth';
import withUser from './middleware/withUser';
import { UserType } from './models/User';

import routes from './routes';

dotenv.config();

const app: Express = express();


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

if (process.env.NODE_ENV == "production") {
    //app.use(cors());
}

app.use(gigaChad);
app.use(routes);

app.use((req, res) => {
    res.send("Hello World")
})

const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})