'use client'

import WritePost from "@/components/WritePost"
import FeedPost from "@/components/FeedPost"
import { currentUserAtom } from "@/store/atoms/currentUser"
import { publishedPostsAtom } from "@/store/atoms/publishedPosts"
import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import Loader from "@/components/Loader"

export default function Feed(){

    const user = useRecoilValue(currentUserAtom)
    const posts = useRecoilValueLoadable(publishedPostsAtom)
    
    return (
        <div className="w-[40%] mx-auto border-x-[1px] border-gray-500">
            <WritePost placeholder="Write a Post..." id=""/>
            {posts.state == 'hasValue' ? posts.contents.map((post)=><FeedPost key={post._id} id={post._id} username={post.author} date={new Date(post.createdAt).toDateString()} content={post.content} postImage={post.postImage} likes={post.likes} comments={post.comments}/>) :
            posts.state == 'loading' ? 
            <div className="flex justify-center items-center w-[100%] mt-6">
                <Loader/>
            </div> : null}
        </div>
    )   
}