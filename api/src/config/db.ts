import mongoose from 'mongoose';
import config from './config';

const db = async ()=>{
    await mongoose.connect(config.mongoUrl as string).then(()=>{
        console.log("Database connected successful");
    }).catch((error)=>{
        console.error("error connect to db",error);
        
    })
}

export default db;