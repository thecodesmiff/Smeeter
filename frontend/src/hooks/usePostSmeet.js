import { useState } from 'react';
import toast from "react-hot-toast";


function usePostSmeet() {
    const [loading, setLoading] = useState(false);
    const [smeet, setSmeet] = useState('');


    const sendSmeet = async (info) => {
        try {
            setLoading(true);
            const res = await fetch('/api/smeets/postSmeet', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(info)
            })
            const data = await res.json();
            toast.success('Smeet Posted!')

            if(data.error) {
                throw new Error(data.error);
            }

            setSmeet(data);
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    return { sendSmeet, loading }

}

export default usePostSmeet