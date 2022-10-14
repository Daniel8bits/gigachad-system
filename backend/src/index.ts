import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import gigaChad from './middleware/gigaChad';
import WithAuth from './middleware/withAuth';

dotenv.config();

const app: Express = express();

app.use(gigaChad);

app.get("/", WithAuth, (req, res) => {
    res.send("Hello World")
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})