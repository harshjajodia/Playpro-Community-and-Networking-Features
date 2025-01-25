import axios from "axios";
import { atom, selector } from "recoil";

export interface Post {
    _id: string
    author: string,
    content: string,
    postImage: string,
    likes: PostLike[],
    comments: PostComment[],
    createdAt: string,
    updatedAt: string
}

export interface PostLike {
    post: string,
    likedBy: string
}

export interface PostComment {
    content: string,
    author: string,
    post: string,
    commentImage: string,
    likes: CommentLike[],
    createdAt: string,
    updatedAt: string
}

export interface CommentLike {
    comment: string,
    likedBy: string
}

export const publishedPostsAtom = atom({
    key: 'publishedPostsAtom',
    default: selector({
        key: 'getPublishedPosts',
        get: async ({get}) => {
            const response = await axios.get('http://localhost:3000/api/posts')
            return response.data.posts as Post[]
        }
    })
})