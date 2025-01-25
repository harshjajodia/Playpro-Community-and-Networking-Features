import connectDB from "@/dbconfig/dbconfig";
import { uploadImage } from "@/lib/uploadImage";
import Comment from "@/models/comments";
import Post from "@/models/posts";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse){
    connectDB()
    const id = req.nextUrl.searchParams.get('id')
    const formData = await req.formData()
    const content = formData.get('content')
    const author = formData.get('author')
    const image = formData.get('commentImage')
    let data: any
    if (image != ''){
        console.log('reached here')
        data = await uploadImage(image as File, 'commentImage')
    }
    const createdComment = await Comment.create({
        author: author,
        content: content,
        commentImage: data?.secure_url,
        publicId: data?.public_id
    })

    await Post.updateOne({_id: id}, {$push : {comments: createdComment}})

    return NextResponse.json({
        success: true,
        post: createdComment
    })
}
