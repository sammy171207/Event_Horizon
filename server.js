import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoutes.js'
import userRoute from './routes/userRoutes.js'
import organizerRoute from './routes/organizerRoutes.js'
import eventRoute from './routes/eventRoutes.js'
const app=express();
dotenv.config();

app.use(morgan('dev'));
app.use(express.json());
connectDB()
app.use(cors());

app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/organizer',organizerRoute)
app.use('/api/event',eventRoute)
app.get('/test',(req,res)=>{
    res.send('This is Test Routes')
})

app.listen(process.env.PORT,()=>console.log(`Server running on port ${process.env.PORT}`));