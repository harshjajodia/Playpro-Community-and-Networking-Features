import { Post } from "@/store/atoms/publishedPosts"
import fetchPost from "@/actions/fetchPost"
import FeedPost from "@/components/FeedPost"
import CreateComment from "@/components/CreateComment"
import CommentCard from "@/components/CommentCard"

export default async function SelectedPost({params} : {params: {slug: string}}){
    const post: Post = await fetchPost(params.slug)
    return (
        <div className="w-[40%] mx-auto border-x-[1px] border-gray-500">
            <div>
                <FeedPost key={post._id} id={post._id} date={new Date(post.createdAt).toDateString()} username={post.author} content={post.content} postImage={post.postImage} likes={post.likes} comments={post.comments}/>
            </div>
            <CreateComment id={post._id}/>
            {post.comments.map((comment)=><CommentCard author={comment.author} commentImage={comment.commentImage} content={comment.content} likes={comment.likes} date={new Date(comment.createdAt).toDateString()}/>)}
        </div>
    )
}
