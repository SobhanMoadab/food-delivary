import express from 'express'
import cors from 'cors';
import helmet from 'helmet';
import { v1Router } from './api/v1';
import * as dotenv from 'dotenv'
dotenv.config()

const origin = {
    // origin: isProduction ? 'https:/' : '*',
    origin: "*"
}
export const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(origin))
app.use(helmet())

app.use('/api/v1', v1Router)

// app.use((err: any, req: Request, res: Response) => {
//     if (err instanceof Error) {
//         console.log({ err })
//         res.status(500).json({ msg: 'Something went wrong' })
//     }
// });

