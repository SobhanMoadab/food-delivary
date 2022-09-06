import express from 'express'
import cors from 'cors';
import helmet from 'helmet';
import { v1Router } from './api/v1';
import * as dotenv from 'dotenv'
dotenv.config()

const origin = {
    // origin: isProduction ? 'https://dddforum.com' : '*',
    origin: "*"
}
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(origin))
app.use(helmet())

app.use('/api/v1', v1Router)

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`[App]: Listening on port ${port}`)
})