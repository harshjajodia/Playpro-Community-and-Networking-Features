import mongoose from 'mongoose'
import { likesSchema } from './likes'

export const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        ref: 'users',
    },
    commentImage: {
        type: String,
        default: ''
    },
    publicId: {
        type: String
    },
    multimedia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'multimedia'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }, 
    likes: [likesSchema]

}, {timestamps: true})


const Comment = mongoose.models.comments || mongoose.model('comments', commentSchema)
export default Comment