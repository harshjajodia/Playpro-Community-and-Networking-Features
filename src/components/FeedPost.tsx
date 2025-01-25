'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faComment, faHeart } from "@fortawesome/free-solid-svg-icons"
import { useRecoilState } from "recoil"
import { useRouter } from "next/navigation"
import { PostLike, PostComment, publishedPostsAtom } from "@/store/atoms/publishedPosts"
import axios from "axios"

interface FeedPostProps {
    id: string
    username: string,
    content: string,
    postImage: string,
    likes: PostLike[],
    comments: PostComment[],
    date: string
}

export default function FeedPost({id, username, content, postImage, likes, comments, date} : FeedPostProps){

    const router = useRouter()
    const [posts,setPosts] = useRecoilState(publishedPostsAtom)
    const handleLike = async () => {
        const updatedPosts = posts.map((post) => post._id == id ? {...post, likes: [...likes, {post: post._id, likedBy: username}]} : post)
        console.log(updatedPosts)
        setPosts(updatedPosts)
        const response = await axios.put('http://localhost:3000/api/posts', {
            likes: updatedPosts.find((post) => post._id == id)?.likes
        })
        console.log(response.data.success)
    }

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
                {postImage != '' && (
                    <div className="mt-4">
                        <img src={postImage} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                )}
                <div className="flex justify-center gap-8 mt-4">
                    <div>
                        <button onClick={()=>router.push(`/feed/${id}`)}>
                            <FontAwesomeIcon icon={faComment} size="lg" className="text-white"/>
                        </button>
                        <span className="text-white mx-2">{comments.length}</span>
                    </div>
                    <div>
                        <button onClick={handleLike}>
                            <FontAwesomeIcon icon={faHeart} size="lg" className="text-white hover:text-red-500"/>
                        </button>
                        <span className="text-white mx-2">{likes.length}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}