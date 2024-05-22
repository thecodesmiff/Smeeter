import useGetUserSmeets from "../../hooks/useGetUserSmeets"
import SmeetPost from "../posts/SmeetPost";
import ProfileHeader from "./ProfileHeader";


const Profile = () => {

    const { smeets } = useGetUserSmeets();




return (
    <div>
        <ProfileHeader />
        {smeets.map((smeet) => (
            <div key={smeet.id}>
                <SmeetPost smeets={smeet} />
            </div>
        ))}
    </div>
)
}

export default Profile