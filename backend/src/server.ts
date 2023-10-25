import dotenv from 'dotenv';
import path from 'path';
import express from "express";
import cors from "cors";
import userRouter from './routers/user.router';
import testRouter from './routers/test.router';
import { dbConnect } from './configs/database.config';

dotenv.config();
dbConnect();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use('/api/users', userRouter);
app.use('/api/test', testRouter);

app.use(express.static('public'));
app.get('*', (req: any, res: any) => {
    res.sendFile(path.join(
        __dirname, 
        'public', 
        'index.html'
    ))
});

app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})