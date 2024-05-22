import { HiOutlineArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom"

const PageHeader = ({ type }) => {

    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

  return (
    <>
        <div className="flex items-center p-[5px] mb-[5px]">
            <div className="pr-[20px] pl-[8px] text-[1em]">
                <HiOutlineArrowSmallLeft onClick={goBack} />
            </div>
            <div className="flex flex-col justify-between">
                <p className="font-bold text-m">{type}</p>
            </div>
        </div>
    </>
  )
}

export default PageHeader