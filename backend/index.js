const express = require('express');
require('dotenv').config();
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());

// Routers
const userRoute = require("./src/routers/userRoutes");
app.use("/api/user",userRoute);

const studRoute = require("./src/routers/studRoutes");
app.use("/api/studs",studRoute);

const prodRoute = require("./src/routers/productRoutes");
app.use("/api/product",prodRoute);

const incomeRoute = require("./src/routers/incomRoutes");
app.use("/api/income",incomeRoute);

const expenseRoute = require("./src/routers/expenseRoutes");
app.use("/api/expense",expenseRoute);

const empRoute = require("./src/routers/empRoutes");
app.use("/api/employee",empRoute);

const taskRoute = require("./src/routers/taskRoutes");
app.use("/api/task",taskRoute);

const bookRoute = require("./src/routers/bookRoutes");
app.use("/api/book",bookRoute);

app.get("/",(req,res)=>{
  res.send("Hello, I Backend")
});

// Port
const PORT = Number(process.env.PORT);
app.listen(PORT,()=>{
  console.log(`Server running http://localhost:${PORT}`); 
});