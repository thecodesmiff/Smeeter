
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext"
import { HiOutlineMagnifyingGlass,
    HiOutlineHome,
    HiOutlineBell,
    HiOutlineEnvelope,
    HiOutlineUser,
    HiOutlineEllipsisHorizontal,
    HiOutlinePencilSquare,
    HiHome,
    HiBell,
    HiEnvelope,
    HiUser
} from "react-icons/hi2";
import { NavLink, useLocation } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import PostFormModal from "../posts/PostFormModal";



const SideNav = () => {


    const { authUser } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const {logout} = useLogout();
    const location = useLocation();
    const { pathname } = location
    const activeUser = authUser.username;

  return (
    <>
    <div className="flex flex-col items-center justify-between h-[40vh] w-19 mr-3">
        <div className="flex flex-col justify-between items-center h-[32vh] p-1">
            <NavLink to='/home'>        
            <div className="text-[1.5rem] text-white text-center mb-[-5px]">X</div>
            </NavLink>
            <NavLink to='/home'>
                <div className="flex justify-start">
                    {pathname == '/home' ? <HiHome className="text-[1.5rem] text-white" /> : <HiOutlineHome className="text-[1.3rem] text-white" />}
                    <span className="md:hidden ">Home</span>
                </div>
            </NavLink>
            <div className="flex justify-start">
                <HiOutlineMagnifyingGlass className="text-[1.3rem] text-white" />
                <span className="md:hidden">Explore</span>
            </div>
            <div className="flex justify-start">
                {pathname == '/notifications' ? <HiBell className="text-[1.5rem] text-white" /> : <HiOutlineBell className="text-[1.3rem] text-white" />}
                <span className="md:hidden">Notifications</span>
            </div>
            <NavLink to='/messages'>
                <div className="flex justify-start">
                    { pathname == '/messages' ? <HiEnvelope className="text-[1.5rem] text-white" /> : <HiOutlineEnvelope className="text-[1.3rem] text-white" />}
                    <span className="md:hidden">Messages</span>
                </div>
            </NavLink>
            <NavLink to={`/${authUser.username}`} >
                <div className="flex justify-start">
                    { pathname === `/${activeUser}` ? <HiUser className="text-[1.5rem] text-white" /> : <HiOutlineUser className="text-[1.3rem] text-white" />}
                    <span className="md:hidden">Profile</span>
                </div>
            </NavLink>
            
        </div>

        <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                <button onClick={() => setShowModal(true)}><HiOutlinePencilSquare className="text-[1.5rem] text-white" /></button>
                {/* <div className="bg-blue-500">
                    <HiOutlinePencilSquare className="text-[1.5rem] text-white mr-4" />
                </div> */}
        </div>

        </div>

            <div className="flex text-center pb-5 self-end" onClick={logout}>
                    <div className="mr-[10px] h-[25px] w-[25px] rounded-[13px] border-3 overflow-hidden">
                        <img src={authUser.avatar} alt="" className=" h-full w-full object-cover" />
                    </div>
                    <div className="text-xs mr-1">
                        <div className="font-bold md:hidden">{authUser.display_name}</div>
                        <div className="text-[#999999} md:hidden">@{authUser.username}</div>
                    </div>
                    <div>
                        <HiOutlineEllipsisHorizontal className="md:hidden" />
                    </div>
                </div>

                { showModal && <PostFormModal setShowModal={setShowModal} />}
    </>
  )
}

export default SideNav