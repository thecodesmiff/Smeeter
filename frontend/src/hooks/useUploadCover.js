import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useUploadCover = () => {

    const [loading, setLoading] = useState(false);
    const [cover, setCover] = useState('');
    const { authUser } = useAuthContext();
    const username = authUser.username;

    const uploadCover = async (cover) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/profile/uploadCover/${username}`, {
                method: 'POST',
                body: cover
            })

            const info = await res.json();
            setCover(info[0].location);
            res.status(200).json(cover);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { loading, cover, uploadCover}
}

export default useUploadCover