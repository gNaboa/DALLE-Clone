import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import connectDb from './mongodb/connect.js'
import postRoutes from './routes/postRoutes.js' 
import dalleRoutes from './routes/dalleRoutes.js' 

const app = express()
dotenv.config()

app.use(express.json({limit:'50mb'}));
app.use(cors());

app.use('/api/v1/post',postRoutes);
app.use('/api/v1/dalle',dalleRoutes);


app.get('/',(req,res)=>{
    res.json({message:"Fala fiote ta bao é"})
})

const startServer = async ()=>{
    try{
        connectDb(process.env.MONGODB_URL)
        app.listen(3001,()=>console.log("App running on port 3001"))
    }catch(err){
          throw err;
    }
   
}

startServer();

