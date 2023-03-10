import { useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import preview from '../assets/preview.png'
import { useEffect, useState } from "react"
import { getRandomPrompt } from '../utils'
import Loader from "../components/Loader"
import axios from "axios"
type FormProps = {
    name: string,
    prompt: string,
    photo?: string
}



export function CreatePost() {
    const navigate = useNavigate()
    const [genetaringImg, setGeneratingImage] = useState(false)
    const { handleSubmit, register, getValues, setValue } = useForm<FormProps>()
    


    async function sendInfo({ prompt }: FormProps) {
        console.log(prompt)
        if (prompt) {
            try {
                setGeneratingImage(true)
                const response = await axios.post("http://localhost:3001/api/v1/dalle", {
                    prompt
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: false,
                    }
                )

                const data = await response.data
                setValue("photo", `data:image/jpeg;base64,${data.photo}`)
            } catch (e) {
                console.log("Error in client")
            } finally {
                setGeneratingImage(false)
            }
        } else {
            alert("Please enter a prompt")
        }

    }
    function handleSurpriseMe() {
        const randomprompt = getRandomPrompt();
        setValue("prompt", randomprompt)
    }
    async function handleShareImage() {
        if (getValues('photo')) {
            try {
                await axios.post("http://localhost:3001/api/v1/post", {
                    name: getValues('name'),
                    prompt: getValues('prompt'),
                    photo: getValues('photo')
                })
            } catch (e) {
                console.log("Error: ", e)
            }finally{
                navigate('/')
            }
        } else {
            alert("Please, create a image first")
        }

    }
    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="font-extrabold text-[#222328] text-[32px] text-start">
                Create
            </h1>

            <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px] text-start">
                Create imaginative and
                visually stunning images generated by DALL-E AI </p>
            <form className="mt-16 max-w-3xl  text-start" action="" onSubmit={handleSubmit(sendInfo)}>
                <div className="flex flex-col gap-5">
                    <label htmlFor="">Your name</label>
                    <input className="bg-gray-50 border border-gray-300
               text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff]
               outline-none block w-full p-3" type="text" placeholder="John Doe" {...register("name")} />
                    <div>
                        <label htmlFor="">Prompt</label>
                        <button onClick={handleSurpriseMe} type="button" className="font-semibold
                    text-xs bg-[#ECECF1] py-1 
                    px-2 rounded-[5px] text-black w-[100px]">Surprise me</button>
                    </div>

                    <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff]
                        focus:border-[#4649ff]outline-none block w-full p-3"
                        type="text"
                        placeholder="a sea otter with a pearl earring"
                        {...register("prompt")} />
                </div>
                <div className="relative bg-gray-50 border border-gray-500 focus:border-blue-500 
             w-64 p-3 h-64 flex justify-center items-center mt-5">
                    {getValues("photo") ? (
                        <img
                            src={getValues('photo')}
                            alt="Photo"
                            className="w-full h-full object-contain" />
                    ) : (
                        <img src={preview} alt="" />
                    )}
                    {genetaringImg && (
                        <div className="absolute inset-0 z-0 flex
                justify-center items-center bg-[rgba(0,0,0,0.5)]
                rounded-lg">
                            <Loader />
                        </div>
                    )}
                </div>
                <div className="mt-5 flex gap-5">
                    <button type="submit" className="text-white
              bg-green-700 font-medium rounded-md
              text-sm w-full sm:w-auto px-5 py-2.5
              text-center"
                    >Generate</button>
                </div>
                <div>
                    <div className="mt-5 flex gap-5">
                        <button type="button" onClick={handleShareImage} className="text-white
              bg-blue-800 font-medium rounded-md
              text-sm w-full sm:w-auto px-5 py-2.5
              text-center"
                        >Share with the community</button>
                    </div>
                </div>
            </form>

         
        </section>
    )
}