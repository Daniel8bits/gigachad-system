import Express from "./utils/Express"

import Training from "./routes/Training";
import Plan from "./routes/Plan";

//import Account from "./routes/Account";

const app = new Express();

//app.use("/account",Account)
app.use("/training", Training)
app.use("/plan", Plan)


export default app;