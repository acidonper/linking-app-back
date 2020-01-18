require("dotenv").config();
const Express = require("express");
const app = Express();
const mongodbConn = require("./controllers/mongodb/connection");
const indexRouter = require("./routes/index");

// mongodbConn();

app.use("/", indexRouter);

app.use((req, res) => res.status(404).json({ message: "route not found" }));

const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT} `);
});
