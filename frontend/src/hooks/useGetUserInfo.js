import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const useGetUserInfo = () => {
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const username = location.pathname;

    useEffect(() => {
        const getUserInfo =  async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/users/${username}`);
                const data = await res.json();

                if(data.error) {
                    throw new Error(data.error);
                }
                setInfo(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getUserInfo();
    },[info, username]);
    return { info, loading };
}

export default useGetUserInfo