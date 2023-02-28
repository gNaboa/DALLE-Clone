import express from 'express'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config();

const router = express.Router()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,

})

const openai = new OpenAIApi(configuration)

router.route('/').get((req, res) => {
    res.send("HELLO FROM DALLE")
    
})



router.route('/').post(async (req, res) => {
    try {
        const {prompt} = req.body
        console.log("prompt here: ",prompt)
        const aiResponse = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '256x256',
            response_format: 'b64_json',
            
       })

       const image = aiResponse.data.data[0].b64_json
       res.status(200).json({ photo: image })
    } catch (e) {
        res.status(401).send("Error in post request")
        console.log(e?.response.data.error)
    }
})

export default router 