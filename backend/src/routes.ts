import Express from "express"
import Account from "./routes/Account";

const app = Express();

app.use("/account",Account)

export default app;