import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';


const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    useEffect(() => {
        getUsers();
    }, [])

    const signup = async({email, username, password, confirmPassword}) => {
        const success = handleInputErrors({email, username, password, confirmPassword});
        if(!success) return;

        setLoading(true);

        try {
            const res = await fetch('/api/auth/signup', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, username, password, confirmPassword})
            })
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("smitter-user", JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return { loading, signup };
};

export default useSignup

let userList;
const getUsers = async () => {
    const usernames = await fetch('/api/users');
    userList = await usernames.json();
    return userList;
}



function handleInputErrors ({email, username, password, confirmPassword}) {


    getUsers();
    
    if(!email || !username || !password || !confirmPassword) {
        toast.error('Please fill in all fields');
        return false;
    }

    if(password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }

    if(password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return false;
    }

    if(userList.includes(username)) {
        toast.error('Username already exists!');
        return false;
    }

    return true;
}