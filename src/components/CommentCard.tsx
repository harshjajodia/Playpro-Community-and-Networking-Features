'use client'

import { CommentLike } from "@/store/atoms/publishedPosts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

interface CommentCardProps {
    author: string,
    commentImage: string,
    content: string,
    likes: CommentLike[],
    date: string
}

export default function CommentCard({author, commentImage, content, likes, date}: CommentCardProps){
    return (
        <div className="flex gap-4 p-4 w-[100%] border-b-[1px] border-gray-500">
            <div className="rounded-full p-3 w-12 h-12 bg-white flex justify-center items-center">
                <FontAwesomeIcon icon={faUser} size="lg"/>
            </div>
            <div className="flex flex-col w-[90%]">
                {/* Author name and date published*/}
                <span className="text-white text-sm">Username | {date}</span>
                {/* content */}
                <p className="text-white mt-2">{content}</p>
                {commentImage != '' && (
                <div className="mt-4">
                    <img src={commentImage} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                )}
            </div>
        </div>
    )
}