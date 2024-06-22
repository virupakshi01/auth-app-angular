import express from 'express';
import config from './config/config';
import UserRoute from './users/UserRoutes';
import db from './config/db';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
db();

app.use('/api/users',UserRoute);

app.listen(config.port,()=>{
    console.log(`Server is running on port: ${config.port}`);
    
})