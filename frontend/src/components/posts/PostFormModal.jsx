import PostForm from "./PostForm"


const PostFormModal = ({ setShowModal }) => {

    const style = {
        "borderBottom": 'none'
    }

    const widthStyle = {
        "width": '100%'
    }

  return (
    <>
        <div className="z-10 absolute left-0 top-0 w-full h-full flex flex-col justify-start items-center bg-[#8CABC9]/[0.30]">
            <div className="mt-[60px] p-2 rounded-xl bg-black w-[500px]">
                <span className="ml-4 text-xl cursor-pointer" onClick={() => {setShowModal(false)}}>x</span>
                <PostForm style={style} widthStyle={widthStyle} />
            </div>
        </div>
    </>
  )
}

export default PostFormModal