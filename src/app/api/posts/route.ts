import connectDB from "@/dbconfig/dbconfig";
import { uploadImage } from "@/lib/uploadImage";
import Post from "@/models/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
    
    connectDB()
    const posts = await Post.find().select('-__v -publicId')
    return NextResponse.json({
        success: true,
        posts: posts
    })
}

export async function POST(req: NextRequest, res: NextResponse){
    connectDB()
    const formData = await req.formData()
    const content = formData.get('content')
    const author = formData.get('author')
    const image = formData.get('postImage') as File

    const data: any = await uploadImage(image, 'feedPostImage')
    const createdPost = await Post.create({
        author: author,
        content: content,
        postImage: data?.secure_url,
        publicId: data?.public_id
    })

    return NextResponse.json({
        success: true,
        post: createdPost
    })
}

export async function PUT(req: NextRequest, res: NextResponse){
    connectDB()
    const data = await req.json()
    await Post.updateOne({_id: data.likes[data.likes.length - 1].post}, {
        likes: data.likes
    })
    return NextResponse.json({
        success: true,
    })
}