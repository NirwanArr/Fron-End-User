import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { login, getEmail } from "../../api/fetching";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handlePassword = async () => {
    if (!email) {
      setAlertMessage("Please enter your email");
      return;
    }
    try {
      const res = await getEmail(email);
      navigate(`/reset-password/${res}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlertMessage(err.response.data.message);
        return;
      }
      setAlertMessage(err.message);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setAlertMessage("Mohon lengkapi semua kolom.");
      return;
    }
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlertMessage(err.response.data.message);
        return;
      }
      setAlertMessage(err.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-blue-950">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-center font-poppins">
              Welcome Back
            </span>
            <span className="mb-4 text-center text-gray-400 font-poppins">
              Welcome back! please enter your details
            </span>
            {alertMessage && (
              <div className="flex items-center justify-center mx-auto text-sm text-red-500 font-montserrat">
                <span className="inline-block">{alertMessage}</span>
              </div>
            )}
            <div className="py-1">
              <span className="mb-2 text-sm font-poppins">Email</span>
              <input
                type="email"
                id="email"
                className="w-full p-2 text-xs border border-gray-300 rounded-md font-poppins placeholder:font-poppins placeholder:text-gray-500"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="relative py-1">
              <span className="mb-2 text-sm font-poppins">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-2 text-xs border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <div className="absolute flex transform -translate-y-1/2 right-3 top-11">
                {showPassword ? (
                  <FiEyeOff
                    onClick={togglePasswordVisibility}
                    className="text-gray-700 cursor-pointer"
                  />
                ) : (
                  <FiEye
                    onClick={togglePasswordVisibility}
                    className="text-gray-700 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between w-full py-4">
              <label className="flex items-center text-xs font-poppins">
                <input
                  type="checkbox"
                  name="remember"
                  id="ch"
                  className="mr-1 font-poppins"
                />
                Remember me
              </label>
              <Link onClick={handlePassword} className="text-xs font-poppins">
                Forgot Password?
              </Link>
            </div>
            <button
              onClick={handleLogin}
              className="w-full p-2 mb-2 text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Sign in
            </button>

            <p className="mt-2 text-sm text-center text-gray-400">
              Dont have an account ? &nbsp;
              <Link to={"/register"} className="text-red-500 underline">
                Sign up for free
              </Link>
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
            {/* <div className="absolute hidden p-6 rounded bottom-10 right-6 bg-blue-950 bg-opacity-30 backdrop-blur-sm drop-shadow-lg md:block">
              <span className="text-xl text-black">ayo beli course ini</span>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
