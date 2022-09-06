import mongoose from "mongoose"

// const MONGOOSE_USR = process.env.MONGOOSE_USR
// const MONGOOSE_PWD = process.env.MONGOOSE_PWD
// const MONGOOSE_PORT = process.env.MONGOOSE_PORT
// const MONGOOSE_IP = process.env.MONGOOSE_IP
// const MONGOOSE_DATABASE_NAME = process.env.MONGOOSE_DATABASE_NAME
// const MONGOOSE_CONNECTION_URL = `mongodb://${MONGOOSE_USR}:${encodeURIComponent(
//     MONGOOSE_PWD
// )}@${MONGOOSE_IP}:${MONGOOSE_PORT}/${MONGOOSE_DATABASE_NAME}`;
const MONGOOSE_CONFIG = {
    useNewUrlParser: true,
    authSource: 'foodDelivary',
    useUnifiedTopology: true,
}

mongoose
    .connect('mongodb://0.0.0.0:27017/foodDelivary', MONGOOSE_CONFIG)
    .then(async (result) => {
        console.log('Mongoose connected')
    })
    .catch((err) => {
        console.log({ MONGO_ERROR: err })
    })