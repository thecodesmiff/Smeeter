import { useRef, useState } from "react";
import {
    HiOutlineGif,
    HiOutlineListBullet,
    HiOutlineFaceSmile,
    HiOutlinePhoto
} from 'react-icons/hi2';
import CharCount from './CharCount.jsx';
import EmojiPicker from "@emoji-mart/react";
import data from '@emoji-mart/data';
import GifPicker from '../../../utils/gifPicker.jsx';
import { FileDrop } from "react-file-drop";
// import { useNavigate } from "react-router-dom";
import usePostSmeet from "../../hooks/usePostSmeet.js";
import { useAuthContext } from "../../context/AuthContext.jsx";
import usePostImg from "../../hooks/usePostImg.js";


const PostForm = ({ type, style, widthStyle }) => {
    const [smeetText, setSmeetText] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [setIsUploading] = useState(false);
    const [images, setImages] = useState();
    const [gifs, setGifs] = useState();
    // const navigate = useNavigate();
    const { sendSmeet } = usePostSmeet();
    const { postImg, img } = usePostImg();
    const { authUser } = useAuthContext(); 

    // const refreshPage = () => {
    //     navigate(0);
    // }

    const fileInputRef = useRef(null);

    const handleSubmission = async (e) => {
        e.preventDefault();

        const info = {
            smeet: smeetText,
            username: authUser.username,
            image: images,
            gif: gifs
        }

        if(!smeetText) return;

        await sendSmeet(info);
        setSmeetText('')
        setImages('')
        setGifs('')

    }

    const addEmoji = (e) => {
        const symbol = e.unified.split("_");
        const codeArray = [];
        symbol.forEach((emoji) => codeArray.push("0x" + emoji));
        let emoji = String.fromCodePoint(...codeArray);
        setSmeetText(smeetText + emoji);
    }

    const toggleShowEmoji =  () => {
        showGifPicker ? setShowGifPicker(false) : setShowGifPicker(false);
        !showEmojiPicker ? setShowEmojiPicker(true) : setShowEmojiPicker(false);
    }

    const toggleShowGif =  () => {
        showEmojiPicker ? setShowEmojiPicker(false) : setShowEmojiPicker(false);
        !showGifPicker ? setShowGifPicker(true) : setShowGifPicker(false);
    }

    const onFileInputChange = async (e) => {
        const { files } = e.target;
        
        e.preventDefault();
        setIsUploading(false);
        setIsUploading(true);
        const imgData = new FormData();
        imgData.append('cover', files[0]);

        postImg(imgData);

        // console.log(img)
        setImages(img)
    }

    const onTargetClick= ()  => {
        fileInputRef.current.click();
    }

  return (
    <>
        <div className="border-b-[2px] border-[#333]" style={style}>
            <div className="w-full flex flex-col justify-center items-center p-3 bg-black border-1 border-solid border-[#333333] ">
                <div className="w-full flex">
                    <div className="flex flex-column justify-start items-center h-[35px] w-[35px] rounded-[18px] overflow-hidden mr-2">
                        {authUser.avatar ? <img src={authUser.avatar} alt="" className="bg-[lightskyblue] w-full h-full object-cover" /> :
                            <img src="http://placehold.co/100x100" className="bg-[lightskyblue] w-full h-full object-cover" />}
                    </div>
                    {type === 'Post' && smeetText.length > 0 ? <p className="text-xs bg-black border-1 border-solid border-[#999999] mb-3">Replying to <span className="text-[#1D99EC]">@{smeetText.username}</span></p> : ''}
                    <div className="w-[90%]">
                    <form id="smeet" onSubmit={handleSubmission} >
                        <textarea 
                            id="smeetcontent"
                            cols="43"
                            rows="3"
                            placeholder="What is happening?!"
                            maxLength='240'
                            onChange={(e) => {setSmeetText(e.target.value)}}
                            onFocus={() => {setShowEmojiPicker(false), setShowGifPicker(false)}}
                            value={smeetText}
                            className="
                                resize-none
                                border-none
                                bg-black
                                text-white
                                text-l
                                focus:outline-none
                            "
                        >

                        </textarea>
                        <FileDrop 
                            onTargetClick={onTargetClick}
                        >

                        <input 
                            type="file" 
                            id="file-input"
                            className="hidden"
                            accept=".jpg, .png"
                            ref={fileInputRef}
                            onChange={onFileInputChange}
                        />
                        </FileDrop>
                            {images && <div>
                                    <img src={images} alt="" style={{height: '100%', width: '100%'}}/>
                                </div>}
                            {gifs && <div>
                                    <img src={gifs} alt="" style={{height: '100%', width: '100%'}} />
                                </div>}
                        </form>
                        </div>
                </div>
                <div className="flex w-[90%] ml-5" style={widthStyle}>
                <div className="bg-black flex items-end border-t-[1px] border-solid border-[#333333] pt-[7px] w-full">
                    <div className="bg-transparent w-4/5 flex justify-between items-center pt-1 pb-1">
                        <div className="w-2/6 flex justify-between"> 
                            <label htmlFor="file-input">
                                <HiOutlinePhoto className="stroke-[#4A99E9] text-l" />
                            </label>
                                <HiOutlineGif className="stroke-[#4A99E9] text-l" onClick={(toggleShowGif)} />
                                <HiOutlineListBullet className="stroke-[#4A99E9] text-l" />
                                <HiOutlineFaceSmile className="stroke-[#4A99E9] text-l" onClick={(toggleShowEmoji)} />
                        </div>
                        <div className="pr-[15px]">
                            {smeetText && <CharCount smeetText={smeetText} />}
                        </div>
                    </div>
                    <div className="w-1/5 flex flex-row-reverse border-l-[2px] border-solid border-[#333333]">
                        {!smeetText ? <button form="smeet" className="bg-[#4A99E9] border-none text-white px-3 py-1 rounded-full font-bold text-[.8em] opacity-50" type="submit" disabled >Post</button> :
                        <button form="smeet" className="bg-[#4A99E9] border-none text-white px-3 py-1 rounded-full font-bold text-[.8em] mb-[2px]" type="submit" >Post</button>}
                    </div>
                </div>
                </div>
            </div>
            { showEmojiPicker && 
                <div className="self-center">
                    <EmojiPicker 
                        data={data}
                        onEmojiSelect={addEmoji}
                    />
                </div> }
                { showGifPicker && 
                <div className="self-center">
                    <GifPicker 
                        data={data}
                        onEmojiSelect={addEmoji}
                        setGifs={setGifs}
                    />
                </div> }
        </div>
    </>
  )
}

export default PostForm