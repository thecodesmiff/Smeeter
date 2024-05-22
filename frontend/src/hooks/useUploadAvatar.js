import { useState } from "react"
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const useUploadAvatar = () => {

    const [setLoading] = useState(false);
    const [avatar, setAvatar] = useState();
    const location = useLocation();
    const username = location.pathname;

        const uploadAvatar = async (img) => {
            try {
                setLoading(true);
                const res = await fetch(`/api/profile/avatar/${username}`, {
                    method: "PUT",
                    body: img
                })

                const info = await res.json();
                setAvatar(info[0].location)
                res.status(200).json(avatar);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false);
            }
        }
       return { avatar, uploadAvatar }
}

export default useUploadAvatar