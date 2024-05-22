import { useRef, useState } from "react"
// import { useAuthContext } from "../../context/AuthContext";
import { FileDrop } from "react-file-drop";
import ProfileCover from "./ProfileCover";
import { HiOutlineCamera } from "react-icons/hi2";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const EditProfile = ({ setShowEdit, userInfo }) => {


    // const { authUser } = useAuthContext();
    const { display_name, cover, bio, avatar, location, website, username } = userInfo;
    const [setIsUploading] = useState(false);
    const [displayName, setDisplayName] = useState(display_name);
    const [coverImg, setCoverImg] = useState(cover);
    const [biography, setBiography] = useState(bio);
    const [avatarImg, setAvatarImg] = useState(avatar);
    const [userLocation, setUserLocation] = useState(location);
    const [userWebsite, setUserWebsite] = useState(website);
    const [nameFocus, setNameFocus] = useState(false);
    const [bioFocus, setBioFocus] = useState(false);
    const [locationFocus, setLocationFocus] = useState(false);
    const [webFocus, setWebFocus] = useState(false);
    const fileInputRef = useRef(null);
    const { updateProfile } = useUpdateProfile();


    const handleSubmission = async (e) => {
        e.preventDefault();

        const info = {
            display_name: displayName,
            bio: biography,
            location: userLocation,
            website: userWebsite
        }

        await updateProfile(info);
        setShowEdit(false);
    }

    const onTargetClick = ()  => {
        fileInputRef.current.click();
    }

    const onFileInputChange = async (e) => {
        const { files } = e.target;

        e.preventDefault();
        setIsUploading(false);
        setIsUploading(true);
        const imgData = new FormData();
        imgData.append('cover', files[0]);

        setCoverImg(imgData);
    }

    const handleOnFocus = (type) => {
        switch(type) {
            case 'name':
                setNameFocus(true)
                break;
            case 'bio':
                setBioFocus(true)
                break;
            case 'location':
                setLocationFocus(true)
                break;
            case 'website':
                setWebFocus(true)
                break;
            default:
        }
    }

    const handleOnBlur = (type) => {
        switch(type) {
            case 'name':
                setNameFocus(false)
                break;
            case 'bio':
                setBioFocus(false)
                break;
            case 'location':
                setLocationFocus(false)
                break;
            case 'website':
                setWebFocus(false)
                break;
            default:
        }
    }

  return (
    <>
        <div className="w-screen h-screen flex absolute left-0 top-0 flex-col justify-center items-center bg-[#8CABC9]/[.35] z-10" >
            <div className="bg-black w-[500px] rounded-3xl overflow-hidden p-1">
                <div className="flex items-center p-2 relative bg-black">
                    <div className="pr-[20px] pl-[8px] text-[1em]" onClick={() => setShowEdit(false)}>
                        X
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <h3 className="font-bold">Edit Profile</h3>
                        <button className="text-black bg-[#F0F3F4] py-[2px] px-[15px] rounded-full font-bold text-sm" form="updateForm" onClick={handleSubmission} >Save</button>
                    </div>
                </div>
                <ProfileCover cover={cover} edit={true} />
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
                <div className="border-[3px] border-solid border-black w-[100px] h-[100px] rounded-full relative mb-[-80px] top-[-50px] left-[20px] overflow-hidden">
                    <img src={avatarImg} alt="" className="w-full h-full object-cover" />
                        <div className="absolute top-0 bg-black/[0.35] w-full h-full flex justify-center items-center">
                            <label htmlFor="file-input">
                                <div className="border-[3px] p-2 rounded-full">
                                    <HiOutlineCamera />
                                </div>
                            </label>
                        </div>
                </div>
                

                <div className="bg-black w-full flex justify-center mt-[30px] py-[15px]">
                    <form action="" id="updateForm" className="flex flex-col justify-around">
                        <div className="border-[1px] border-solid border-[#333] p-[5px]" style={nameFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className="flex justify-between">
                                {displayName.length > 0 || nameFocus ? <p className="ml-[8px] text-[0.8rem]" style={nameFocus ? {color: '#1D99EC'} : {color: '#777'}}>Name</p> : ''}
                                {nameFocus && <p>{displayName.length}/50</p>}
                            </div>
                            <input className="w-[50vw] block p-[10px] bg-black text-[0.9em] border-0 focus:outline-none" type="text" placeholder="Name" onChange={(e) => setDisplayName(e.target.value)} onFocus={() => handleOnFocus('name')} onBlur={() => handleOnBlur('name')} value={displayName} />
                        </div>
                        <br />
                        <div className="border-[1px] border-solid border-[#333] p-[5px]" style={bioFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className="flex justify-between">
                                {biography.length > 0 || bioFocus ? <p className="ml-[8px] text-[0.8rem]" style={bioFocus ? {color: '#1D99EC'} : {color: '#777'}}>Bio</p> : ''}
                                {bioFocus && <p>{biography.length}/50</p>}
                            </div>
                            <textarea className="w-[50vw] block p-[10px] bg-black text-[0.9em] border-0 focus:outline-none resize-none" name="" id="" cols="8" rows="1" placeholder="Bio" onChange={(e) => setBiography(e.target.value)} onFocus={() => handleOnFocus('bio')} onBlur={() => handleOnBlur('bio')} value={biography}></textarea>
                        </div>
                        <br />
                        <div className="border-[1px] border-solid border-[#333] p-[5px]" style={locationFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className="flex justify-between">
                                {userLocation.length > 0 || locationFocus ? <p className="ml-[8px] text-[0.8rem]" style={locationFocus ? {color: '#1D99EC'} : {color: '#777'}}>Location</p> : ''}
                                {locationFocus && <p>{userLocation.length}/50</p>}
                            </div>
                            <input className="w-[50vw] block p-[10px] bg-black text-[0.9em] border-0 focus:outline-none" type="text" placeholder="Name" onChange={(e) => setUserLocation(e.target.value)} onFocus={() => handleOnFocus('location')} onBlur={() => handleOnBlur('location')} value={userLocation} />
                        </div>
                        <br />
                        <div className="border-[1px] border-solid border-[#333] p-[5px]" style={webFocus ? {borderColor: '#1D99EC'} : {borderColor: '#333'}}>
                            <div className="flex justify-between">
                                {userWebsite.length > 0 || webFocus ? <p className="ml-[8px] text-[0.8rem]" style={webFocus ? {color: '#1D99EC'} : {color: '#777'}}>Website</p> : ''}
                                {webFocus && <p>{userWebsite.length}/50</p>}
                            </div>
                            <input className="w-[50vw] block p-[10px] bg-black text-[0.9em] border-0 focus:outline-none" type="text" placeholder="Name" onChange={(e) => setUserWebsite(e.target.value)} onFocus={() => handleOnFocus('website')} onBlur={() => handleOnBlur('website')} value={userWebsite} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditProfile