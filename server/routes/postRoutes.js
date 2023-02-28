import express from 'express'
import * as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary'

import Post from '../mongodb/models/post.js'


dotenv.config();

const router = express.Router()


cloudinary.config({
    cloud_name:process.env.CLOUDNARY_NAME,
    api_key:process.env.CLOUDNARY_API_KEY,
    api_secret:process.env.CLOUDNARY_API_SECRET
})

//GET ALL POSTS
router.route('/').get(async(req,res)=>{
   try{
    const posts = await Post.find({})
    res.status(200).json({data:posts})
   }catch(error){
    res.status(500).json({error})
   }
})

//CREATE POST
router.route('/').post(async(req,res)=>{
    try{
        const {name,prompt,photo} = req.body

        const photoUrl = await cloudinary.uploader.upload(photo) // to storage images 
  
        const newpost = await Post.create({
          name,
          prompt,
          photo:photoUrl.url
        })
  
        res.status(201).json({
          data:newpost
        })
    }catch(e){
        res.status(500).json({error:e})
        console.log(e?.response.data.error)
    }
})
export default router