const mongoose = require("mongoose");

const DB_PORT = process.env.MONGODB_PORT;
const DB_HOST = process.env.MONGODB_HOST;
const DB_NAME = process.env.MONGODB_DATABASE;

const DB_USER = process.env.MONGODB_USER;
const DB_PASS = process.env.MONGODB_PASSWORD;

let DB_CON_PATH;

if (!DB_USER || DB_USER === "" || !DB_PASS || DB_PASS === "") {
    DB_CON_PATH = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
} else {
    DB_CON_PATH = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

console.log(DB_CON_PATH);

module.exports = () => {
    mongoose
        .connect(DB_CON_PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(result => {
            console.log(
                `Connection to mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME} established`
            );
        })
        .catch(error => {
            throw error;
        });
};
