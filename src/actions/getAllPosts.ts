'use server'

import Post from "@/models/posts";

export default async function getAllPosts(page: number = 1){
    const size = 10;
    const skip = (page - 1) * size
    const posts = await Post.find()
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(size)
        .exec();
    
    
}