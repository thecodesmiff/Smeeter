import { useEffect, useState } from "react"
import toast from "react-hot-toast";

const useGetSmeets = () => {

    const [loading, setLoading] = useState(false);
    const [smeets, setSmeets] = useState([]);

    useEffect(() => {
        const getSmeets = async() => {
            setLoading(true);
            try {
                const res = await fetch('/api/smeets');
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
        getSmeets();
    }, [smeets])
    return {loading, smeets}
}

export default useGetSmeets