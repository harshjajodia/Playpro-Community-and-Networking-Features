import mongoose from 'mongoose'

export const likesSchema = new mongoose.Schema({

    comment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    },
    multimedia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'multimedia'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    },
    likedBy: {
        type: String,
    }

}, {timestamps: true})

const Like = mongoose.models.likes || mongoose.model('likes', likesSchema)
export default Like