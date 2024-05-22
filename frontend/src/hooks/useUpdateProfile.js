import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useUpdateProfile = () => {

    const [loading, setLoading] = useState(false);
    const [bio, setBio] = useState();
    const { authUser } = useAuthContext();
    const username = authUser.username;

    const updateProfile = async (info) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/profile/edit/${username}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(info)
            })

            const data = await res.json();
            toast.success('Profile Updated!');

            if(data.error) {
                throw new Error(data.error);
            }

            setBio(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }
    return { bio, updateProfile, loading }
}

export default useUpdateProfile