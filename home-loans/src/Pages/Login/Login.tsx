import { useState, type FormEvent } from "react";
import Header from "../../Components/Header"
import { FaEye } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import api from "../../axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

 const navigate = useNavigate()
 const [showPassword,setshowPassword] = useState<boolean>(false)
 const [username,setUsername] = useState<string>("")
 const [password,setPassword] = useState<string>('')
 const [loginError,setloginError] = useState<string>('')

const handleLogin = async(e:FormEvent):Promise<void> => {
    e.preventDefault()
    try {
      const response = await api.post("/login", {
        email: username,
        password,
      });
      setPassword("");
      setUsername("");
      if (response.status === 200) {
        toast.success('Successfully Login')
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("firstName",response.data.firstName)
        localStorage.setItem("lastName",response.data.lastName)
        if(response.data.role === 'admin') {
          localStorage.setItem("isAdmin",'true')
        }
        navigate("/designs");
      }
    }
    catch(error) {
      if(axios.isAxiosError(error)) {
        toast.error('Error while Loging')
        setloginError(error.response?.data?.message)
      }
    }
    
   
}

  return (
    <div className="flex flex-col h-screen" onSubmit={handleLogin}>
      <Header />
      <div className="h-[80%] mt-4 bg-white flex justify-center items-center">
        <div className="flex bg-white shadow-xl rounded-md w-[90%] max-w-5xl ">
         
          <div className="hidden md:block md:w-1/2">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/005/879/539/small_2x/cloud-computing-modern-flat-concept-for-web-banner-design-man-enters-password-and-login-to-access-cloud-storage-for-uploading-and-processing-files-illustration-with-isolated-people-scene-free-vector.jpg"
              alt="Cloud Computing Illustration"
              className="h-full w-full object-cover"
            />
          </div>

        
          <form className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <div className="flex flex-col mb-3">
              <label className="font-bold">Username</label>
              <input
                type="email"
                className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                name="username"
                placeholder="enter email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-3 relative">
              <label className="font-bold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="enter password"
                className="w-full outline-0 my-3 shadow-md p-3 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p
                className="absolute right-2 top-14 cursor-pointer"
                onClick={() => setshowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <GoEyeClosed />}
              </p>
            </div>
            {loginError && (
              <p className="text-red-900 text-center">{loginError}</p>
            )}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="py-2 px-10 rounded-2xl bg-stone-800 text-white font-bold cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login