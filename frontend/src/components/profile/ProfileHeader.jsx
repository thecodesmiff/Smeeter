import  { useState } from 'react'
import useGetUserInfo from '../../hooks/useGetUserInfo'
import useGetSmeetCount from '../../hooks/useGetSmeetCount';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowSmallLeft, HiOutlineBell, HiOutlineCalendarDays, HiOutlineEllipsisHorizontal, HiOutlineEnvelope, HiOutlineGift, HiOutlineMapPin } from 'react-icons/hi2';
import EditProfile from './EditProfile';
import ProfileCover from './ProfileCover';

const ProfileHeader  = () => {

    const { info } = useGetUserInfo();
    const { authUser } = useAuthContext();
    const { smeetCount } = useGetSmeetCount();
    const {email, username, cover, display_name, avatar, bio, location, website} = info;
    const [showEdit, setShowEdit] = useState(false);
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

        const activeUser = authUser.username === username ? true : false



  return (
    <>
        <div className='flex flex-col'>
            <div className=' w-[225px] flex items-center p-[5px]'>
                <div className='pr-[20px] pl-[8px] text-[1em] font-bold'>
                    <HiOutlineArrowSmallLeft onClick={goBack} />
                </div>
                <div className='flex flex-col justify-between'>
                    {activeUser ? <p className='text-[1em] font-bold'>{authUser.display_name}</p> : <p className='text-[1em] font-bold'>{display_name}</p>}
                    <p className='text-[0.7em] text-[#999]'>{smeetCount} posts</p>
                </div>
            </div>

            <ProfileCover  cover={cover} />
            <div className='border-[3px] border-solid border-black w-[100px] h-[100px] rounded-[50px] relative mb-[-80px] top-[-50px] left-[15px] overflow-hidden'>
                <img src={avatar} alt="" className='w-full h-full object-cover'/>
            </div>
            <div className='px-[15px] border-[1px] border-solid border-[#333] border-t-[0px] flex flex-col'>
                {!activeUser ? 
                    <div className='w-2/5 flex self-end justify-between mt-[-10px]'>
                        <HiOutlineEllipsisHorizontal className='border-[1px] border-solid border-[#555] rounded-[13px] p-[4px] text-[1.7em]' />
                        <HiOutlineEnvelope className='border-[1px] border-solid border-[#555] rounded-[13px] p-[4px] text-[1.7em]' />
                        <HiOutlineBell className='border-[1px] border-solid border-[#555] rounded-[13px] p-[4px] text-[1.7em]' />
                        <p className='border-[1px] border-solid border-[#555] p-[4px] text-[0.7em] py-[4px] px-[10px] rounded-[20px] font-bold' onClick={() => setShowEdit(true)}>Follow?</p>
                        {showEdit && <EditProfile setShowEdit={setShowEdit} userInfo={info} />}
                    </div>
                    :
                    <div className='w-[50%] flex self-end flex-row-reverse items-start mt-[-10px]'>

                        <p className='text-[0.7em] py-[6px] px-[10px] border-[1px] border-solid border-[#555] rounded-[20px] font-bold' onClick={() => setShowEdit(true)}>Edit Profile</p>
                        {showEdit && <EditProfile setShowEdit={setShowEdit} userInfo={info} />}
                    </div>
                }
                <div className='mt-[30px]'>
                    <p className='font-bold'>{display_name}</p>
                    <p className='text-[0.8em] text-[#888]'>@{username}</p>
                </div>
                <div className='my-[15px] mx-[0px] flex flex-col items-start justify-start'>
                    <div className='mb-[10px] text-[0.8em]'>
                        <p className='ml-[3px]'>{bio}</p>
                    </div>
                    <div className='w-auto text-[0.8em] flex text-[#888]'>
                        {location && <div className='flex mb-[10px] items-center mr-[10px]'>
                            <HiOutlineMapPin className='text-[1.2em] mr-1' />
                            <p>{location}</p>
                        </div> }
                        {/* <div className='flex mb-[10px] items-center mr-[10px]'>
                            <HiOutlineGift className='text-[1.2em] mr-1' />
                            <p>Born June 27</p>
                        </div> */}
                        <div className='flex mb-[10px] items-center '>
                            <HiOutlineCalendarDays className='text-[1.2em] mr-1' />
                            <p>Joined February 2012</p>
                        </div>
                    </div>
                    <div className='flex mb-[10px] w-[185px] text-[0.8em] items-start justify-between'>
                        <p className='text-[#888]'><span className='font-bold text-white mr-[2px]'>652</span>Following</p>
                        <p className='text-[#888]'><span className='font-bold text-white mr-[2px]'>1613</span>Followers</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProfileHeader;