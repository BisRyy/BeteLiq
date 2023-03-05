import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();

// create express app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("** DB Connected **"))
  .catch((err) => console.log("DB Connection Error => ", err));

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// import routes
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// port
const port = process.env.PORT || 8000;

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
