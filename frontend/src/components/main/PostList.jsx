import useGetSmeets from "../../hooks/useGetSmeets"
import PostForm from "../posts/PostForm";
import SmeetPost from "../posts/SmeetPost";


const PostList = () => {

    const { smeets } = useGetSmeets();



  return (
    <div>
        <PostForm />
        {smeets && smeets.map((smeet) => (
            <div key={smeet.id}>
                <SmeetPost smeets={smeet} />
            </div>
        ))}
    </div>
  )
}

export default PostList