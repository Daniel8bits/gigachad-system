import Express from "./utils/Express"

import Account from "./routes/Account";
import Training from "./routes/Training";
import Plan from "./routes/Plan";
import Employee from "./routes/Employee";
import Expense from './routes/Expense'
import Equipment from "./routes/Equipment";
import Exercise from "./routes/Exercise";
import Tutorial from './routes/Tutorial'

const app = new Express();

app.use("/account",Account)
app.use("/training", Training)
app.use("/plan", Plan)
app.use("/employee",Employee)
app.use("/expense", Expense)
app.use("/equipment", Equipment)
app.use("/exercise", Exercise)
app.use("/tutorial",Tutorial)

export default app;