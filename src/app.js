require("dotenv").config();
const express = require("express");
const app = express();
const mongodbConn = require("./controllers/mongodb/connection");
const indexRouter = require("./routes/index");
const seeds = require("../seeds/index");
const https = require("https");

mongodbConn();
seeds.createUsers();

require("../src/controllers/auth/passport/index")(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.use((req, res) => res.status(404).json({ message: "route not found" }));

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT} `);
});

// https.createServer(app).listen(SERVER_PORT);
