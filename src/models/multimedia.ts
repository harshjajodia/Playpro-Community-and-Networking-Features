import mongoose from 'mongoose'
import { likesSchema } from './likes'
import { commentSchema } from './comments'

const multimediaSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    views: {
        type: Number
    },
    likes: [likesSchema],
    isPublished: {
        type: Boolean
    },
    thumbnail: {
        type: String,
        required: true
    },
    videoFile: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comments: [commentSchema]

}, {timestamps: true})

const Multimedia = mongoose.models.multimedia || mongoose.model('multimedia', multimediaSchema)
export default Multimedia