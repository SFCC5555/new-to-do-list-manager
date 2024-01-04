const express = require("express");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1", authRoutes);

module.exports = app;
