import { useState, useEffect } from "react"
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const useGetUserSmeets = () => {
    const [loading, setLoading] = useState(false);
    const [smeets, setSmeets] = useState([]);
    const location = useLocation();
    const username = location.pathname;

    useEffect(() => {
        const getUserSmeets = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/smeets/getSmeets/${username}`);
                const data = await res.json();

                if(data.error) {
                    throw new Error(data.error);
                }
                setSmeets(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getUserSmeets();
    },[]);
    return { loading, smeets }
}

export default useGetUserSmeets