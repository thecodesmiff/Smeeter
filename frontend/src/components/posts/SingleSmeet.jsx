
// import { useLocation } from 'react-router-dom'
import SmeetPost from './SmeetPost'
import useGetSmeet from '../../hooks/useGetSmeet';
import PageHeader from '../main/PageHeader';


const SingleSmeet = () => {

    const { smeet } = useGetSmeet(); 


if(!smeet) {
    return (
        <>
            <p>Loading...</p>
        </>
    )
}

  return (
    <>
        <div className='w-full'>
            <PageHeader type={'Post'} />
            <SmeetPost smeets={smeet} />
        </div>
    </>
  )
}

export default SingleSmeet