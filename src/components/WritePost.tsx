'use client'

import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faFaceSmile } from "@fortawesome/free-solid-svg-icons"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"
import ImageUpload from "./ImageUpload"
import { useRecoilValue } from "recoil"
import { createPostImageAtom } from "@/store/atoms/createPostImageAtom"
import { currentUserAtom } from "@/store/atoms/currentUser"
import axios from "axios"

export default function WritePost({placeholder, id}: {placeholder: string, id: string}){

    const [content, setContent] = useState('')
    const [emojiTrayOpen, setEmojiTrayOpen] = useState(false)
    const user = useRecoilValue(currentUserAtom)
    const image = useRecoilValue(createPostImageAtom)

    const handleEmojiClick = (emojiData: EmojiClickData) => {
        setContent(content => content + emojiData.emoji)
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('author', user.username)
        formData.append('content', content)
        if (id != ""){
            formData.append('commentImage', image.raw)
        }else{
            formData.append('postImage', image.raw)
        }

        if (id != ""){
            const response = await axios.post(`http://localhost:3000/api/comment?id=${id}`, formData)
            console.log(response.data.comment)
        }else {
            const response = await axios.post('http://localhost:3000/api/posts', formData)
            console.log(response.data.post)
        }
    }

    console.log(image)
    return (
        <>
        <div className="w-[100%] border-y-[1px] border-gray-500">
            <div className="flex justify-between items-start gap-2 p-4 w-[100%]">
                <div className="rounded-full p-3 w-12 h-12 bg-white flex justify-center items-center">
                    <FontAwesomeIcon icon={faUser} size="lg"/>
                </div>
                <div className="w-[90%]">
                        <div className="w-[100%] flex flex-col justify-center">
                            <textarea rows={1} placeholder={placeholder} value={content} className="bg-bgBlue border-b-[1px] border-white focus:outline-none text-white text-xl p-2 resize-none" onChange={(e)=>setContent(e.target.value)}/>
                            {image.preview != '' && (
                                <div className="mt-4">
                                    <img src={image.preview} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                            )}
                            <div className="flex justify-between items-center mt-4 px-2">
                                <div className="flex gap-5">
                                    <ImageUpload/>
                                    <button onClick={()=>setEmojiTrayOpen(!emojiTrayOpen)}>
                                        <FontAwesomeIcon icon={faFaceSmile} style={{color: "#ffffff",}} size="lg"/>
                                    </button>
                                </div>
                                {content == '' ? 
                                <button className={`py-2 px-5 text-gray-300 font-bold bg-red-500 rounded-3xl cursor-not-allowed`} disabled>Post</button>
                                :
                                <button className={`py-2 px-5 text-white font-bold bg-playProRed rounded-3xl`} onClick={handleSubmit}>Post</button>                            
                                }
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <EmojiPicker open={emojiTrayOpen} onEmojiClick={handleEmojiClick} className="mb-4"/>        
        </>

    )
}