const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res,next)=>{
  res.send("hello world!")
  next()
})
app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/logRoutes"));
app.use("/reports", require("./routes/reportRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB(),
  console.log(`Server running oN http://localhost:${PORT}`);
});
