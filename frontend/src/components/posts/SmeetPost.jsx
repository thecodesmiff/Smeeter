import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext";
import { HiOutlineArrowPathRoundedSquare, HiOutlineArrowUpTray, HiOutlineBookmark, HiOutlineChatBubbleOvalLeft, HiOutlineEllipsisHorizontal, HiOutlineHeart } from "react-icons/hi2";
import { useState } from "react";
import Test from "../../pages/Test";

const SmeetPost = ({smeets, type}) => {

    const {id, smeet, date, tweetimg, username, tweetgif, display_name, avatar} = smeets;
    const { authUser } = useAuthContext();
    const [showOption, setShowOption] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [commentCount, setCommentCount] = useState(0);
    const [retweetCount, setRetweetCount] = useState(0);
    const [likeCount, setLikeCount] = useState(0);
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);

    const handleAction = async (type) => {
        // socket.emit("sendNotification", {
        //     senderName: userName,
        //     receiverName: username,
        //     type,
        // })
        alert('clicked')
    }


  return (
    <>
        <div className="  flex justify-center items-center">
            <div className="w-full p-3 border-[1px] border-solid border-[#333] border-t-0 relative flex flex-col">
                {showEdit && <Test setShowEdit={setShowEdit} />}
                <div className="flex">
                    <div className="flex flex-column justify-start items-center h-[25px] w-[25px] rounded-[18px] overflow-hidden">
                        {avatar ? <img src={avatar} alt="" className="bg-[lightskyblue] w-full h-full object-cover" /> :
                            <img src="http://placehold.co/100x100" className="bg-[lightskyblue] w-full h-full object-cover" />}
                    </div>
                    <div className="flex justify-self-start justify-between w-[87%] ml-[10px]">
                        <Link to={`/${username}`}>
                            <div className="text-[.8em] flex">
                                <h4 className="mr-[7px]">{display_name}</h4>
                                <p className="text-[#888]">@{username}</p>
                            </div>
                        </Link>
                        <div className="">
                            { authUser.username === username && <HiOutlineEllipsisHorizontal /> }
                            { showOption && <PostOptions setShowOption={setShowOption} smeetId={id} />}
                        </div>
                    </div>
                </div>
                <Link to={`/smeet/${username}/${id}`}>
                    <div className="w-full flex flex-col justify-center items-center">
                <div className="text-[.8em] mb-[5px] w-[85%] self-center pb-1">
                    <p>{smeet}</p>
                </div>
                {tweetimg || tweetgif ? <div className="flex w-[85%] justify-center self-center border-[1px] border-[#aaa] rounded-[15px] overflow-hidden text-center">
                    { tweetimg && <div className="w-full self-center">
                        <img src={tweetimg} alt="" />    
                    </div>}
                    {tweetgif && <div className="w-full self-center">
                        <img src={tweetgif} alt="" />
                    </div>}
                </div> : ''}
                </div>
                </Link>
                <div className="p-[5px] flex justify-between self-center w-[85%]">
                    <div className="flex items-center">
                        <HiOutlineChatBubbleOvalLeft className="text-m stroke-[#999] hover:stroke-[#3594CC]" onClick={() => handleAction('comment')} />
                        { commentCount > 0 && <p className="text-sm ml-1">0</p> }
                    </div>
                    <div className="flex items-center">
                        <HiOutlineArrowPathRoundedSquare className="text-m stroke-[#999] hover:stroke-[#4bcea2]" />
                        { retweetCount > 0 && <p className="text-sm ml-1">0</p> }
                    </div>
                    <div className="flex items-center">
                        <HiOutlineHeart className="text-m stroke-[#999] hover:stroke-[#f5247f]" onClick={() => handleAction('like')} />
                        { likeCount > 0 && <p className="text-sm ml-1">0</p> }
                    </div>
                    <div className="flex items-center">
                        <HiOutlineBookmark className="text-m stroke-[#999] hover:stroke-[#3594CC]" />
                        { bookmarkCount > 0 && <p className="text-sm ml-1">0</p> }
                    </div>
                    <div className="flex items-center">
                        <HiOutlineArrowUpTray className="text-m stroke-[#999] hover:stroke-[#3594CC]" />
                        { shareCount > 0 && <p className="text-sm ml-1">0</p> }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SmeetPost