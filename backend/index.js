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

app.get("/",(req,res)=>{
  res.send("Hello, I Backend")
})
// Port
const PORT = Number(process.env.PORT);
app.listen(PORT,()=>{
  console.log(`Server running http://localhost:${PORT}`); 
});