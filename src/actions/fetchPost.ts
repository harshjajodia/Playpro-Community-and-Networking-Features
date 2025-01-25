'use server'

import connectDB from "@/dbconfig/dbconfig";
import Post from "@/models/posts";

export default async function fetchPost(id: string){
    connectDB();
    try {
        const post = await Post.findOne({_id: id}).select('-__v')
        return JSON.parse(JSON.stringify(post))
    } catch (error) {
        console.log(error)
        return {message: 'Invalid Id'}
    }

}