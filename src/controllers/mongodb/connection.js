const mongoose = require("mongoose");

const DB_PORT = process.env.MONGO_PORT;
const DB_HOST = process.env.MONGO_HOST;
const DB_NAME = process.env.MONGO_DB;

console.log(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`);

module.exports = () => {
    mongoose
        .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
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
