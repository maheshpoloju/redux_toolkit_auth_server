require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");

const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const getUserDataRoute = require("./routes/getUserDataRoute");

connection();

app.use(express.json());
app.use(cors());

app.use("/api", loginRoute);
app.use("/api", registerRoute);
app.use("/api", getUserDataRoute);

app.listen(8180, () => console.log("Running on Port 8180"));
