import mongoose from 'mongoose'
import { likesSchema } from './likes'
import { commentSchema } from './comments'

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        ref: 'users'
    },
    content: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        default: ''
    },
    publicId: {
        type: String,
    },
    likes: [likesSchema],
    comments: [commentSchema]
}, {timestamps: true})


const Post = mongoose.models.posts || mongoose.model('posts', postSchema)
export default Post