import { useState } from 'react'
import toast from 'react-hot-toast';

const usePostImg = () => {

    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState('');

    const postImg = async (img) => {
        try {
            setLoading(true);
            const res = await fetch('/api/smeets/uploadSmeetImg', {
                method: "POST",
                body: img
            })

            const info  = await res.json();
            setImg(info[0].location);
            res.status(200).json(img);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, postImg, img }
}

export default usePostImg