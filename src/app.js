require("dotenv").config();
const express = require("express");
const app = express();
const mongodbConn = require("./controllers/mongodb/connection");
const indexRouter = require("./routes/index");
const seeds = require("../seeds/index");
const cors = require("cors");

var corsOptions = {
    origin: process.env.APP_SERVICE_CORS,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

mongodbConn();
seeds.createUsers();

require("../src/controllers/auth/passport/index")(app);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));

app.use("/", indexRouter);

app.use((req, res) => res.status(404).json({ message: "route not found" }));

const SERVER_PORT = process.env.APP_SERVICE_PORT || 5000;

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT} `);
});
