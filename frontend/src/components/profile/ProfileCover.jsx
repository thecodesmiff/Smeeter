import { FileDrop } from "react-file-drop"
import { useState, useRef } from "react";
import useUploadCover from "../../hooks/useUploadCover";
import { HiOutlineCamera } from "react-icons/hi2";

const ProfileCover = ({ cover, edit }) => {

    const [ coverImg, setCoverImg] = useState();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const { uploadCover } = useUploadCover();

    // const updateImage = uploadAvatar(files);
    
    const onFileInputChange = async (e) => {
        const { files } = e.target;

        e.preventDefault();
        setIsUploading(false);
        setIsUploading(true);
        const imgData = new FormData();
        imgData.append('cover', files[0]);

        uploadCover(imgData);
        // setCoverImg(cover);
    }

    const onTargetClick = ()  => {
        fileInputRef.current.click();
    }

    return (
        <>
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
            <div className="w-full h-[200px] bg-gray-400 relative">
                {/* {isUploading ? 'upload' : ''} */}
                <img className="object-cover h-full w-full" src={cover} alt="" />
                {edit && <div className="absolute top-0 bg-black/[0.35] w-full h-full flex justify-center items-center">
                            <label htmlFor="file-input">
                                <div className="border-[3px] p-3 rounded-full">
                                    <HiOutlineCamera  />
                                </div>
                            </label>
                        </div>
                }
            </div>

        </>
    )
}

export default ProfileCover