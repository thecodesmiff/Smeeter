
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import PostList from "./components/main/PostList";
import Profile from "./components/profile/Profile";
import EditProfile from "./components/profile/EditProfile";
import SingleSmeet from "./components/posts/SingleSmeet";

function App() {
const {authUser} = useAuthContext();

  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">

        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={'/login'} />}> 
            <Route path="/home" element={<PostList />} />
            <Route path='/:username' element={authUser ? <Profile /> : <Login />} />
            <Route path='/smeet/:username/:id' element={authUser ? <SingleSmeet /> : <Login />} />
          </Route>
          <Route path='/login' element={authUser ? <Navigate to='/home' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/home' /> : <Signup />} />
          <Route path='/settings/profile' element={authUser ? <EditProfile /> : <Login />} />
        </Routes>
        <Toaster
          position="bottom-center"
        />
      </div>
    </>
  )
}

export default App
