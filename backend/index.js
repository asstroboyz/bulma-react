import express from 'express';
import dotenv from 'dotenv';
import db from './config/Database.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();
// import Users from './models/UserModel.js';
const app = express();
const PORT = process.env.PORT || 5180;
try {
   await db.authenticate();
    console.log('Connection has been established successfully.');
    // await Users.sync(); // get tables created if they do not exist
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
