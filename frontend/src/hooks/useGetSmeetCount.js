import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const useGetSmeetCount = () => {

    const [loading ,setLoading] = useState(false);
    const [smeetCount, setSmeetCount] = useState();
    const location = useLocation();
    const username = location.pathname;

    useEffect(() => {
        setLoading(true);
        const getSmeetCount = async () => {
            try {
                const res = await fetch(`/api/profile/smeetCount/${username}`);
                const data = await res.json();

                if(data.error) {
                    throw new Error(data.error);
                }
                setSmeetCount(data.count);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getSmeetCount();
    },[smeetCount])
    return { loading, smeetCount };
}

export default useGetSmeetCount