import Express from "./utils/Express"

import Training from "./routes/Training";
import Plan from "./routes/Plan";
import Employee from "./routes/Employee";

//import Account from "./routes/Account";

const app = new Express();

//app.use("/account",Account)
app.use("/training", Training)
app.use("/plan", Plan)
app.use("/employee",Employee)


export default app;