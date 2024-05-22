import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";


const useGetSmeet = () => {

    const [loading, setLoading] = useState(false);
    const [smeet, setSmeet] = useState();
    const location = useLocation();
    const smeetId = location.pathname.split('/')[3];

    useEffect(() => {
        const getSmeet = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/smeets/getSmeet/${smeetId}`);
                const data = await res.json();

                if(data.error) {
                    throw new Error(data.error);
                }

                setSmeet(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getSmeet();
    }, []);
    return { smeet, loading }
}

export default useGetSmeet