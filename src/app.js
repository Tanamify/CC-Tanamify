const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("../routes/routeAuth");
const authpredict = require("../routes/routesPredict");
const protectedRoutes = require("../routes/protectedRoutes"); // Import protected routes
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middleware/authenticateToken");

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/predict", authpredict);
app.use("/api", protectedRoutes);

module.exports = app;
