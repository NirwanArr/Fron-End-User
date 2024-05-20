/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { register } from "../../api/fetching";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const setTimeOutMessage = (time) => {
    return setTimeout(() => {
      setAlertMessage("");
    }, time);
  };

  const handleRegister = async () => {
    if (!name || !email || !phoneNumber || !password) {
      setAlertMessage("Mohon lengkapi semua kolom.");
      setTimeOutMessage(1000);
      return;
    }
    try {
      const res = await register(name, email, phoneNumber, password);
      navigate(`/otp/${res.id}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlertMessage(err.res.data.message);
        setTimeOutMessage(2000);
        return;
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen py-20 bg-gray-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          {/* Left Slide */}
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold text-">
              Sign Up Account
            </span>
            <span className="mb-8 font-light text-gray-400">
              Welcome back! please enter your details
            </span>
            {alertMessage && (
              <div className="flex items-center justify-center w-3/4 py-3 mx-auto text-sm text-red-500 rounded-lg -mt-7 font-montserrat">
                <span className="inline-block">{alertMessage}</span>
              </div>
            )}
            <form>
              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Name</span>
                <input
                  type="text"
                  className="w-full p-2 text-xs border border-gray-300 rounded-md font-poppins placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Masukkan Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Email</span>
                <input
                  type="text"
                  className="w-full p-2 text-xs border border-gray-300 rounded-md font-poppins placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="py-1">
                <span className="mb-2 text-sm font-poppins">Phone Number</span>
                <input
                  type="text"
                  className="w-full p-2 text-xs border border-gray-300 rounded-md font-poppins placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Masukkan nomor handphone"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                />
              </div>
              <div className="relative py-1">
                <span className="mb-2 text-sm font-poppins">Password</span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 text-xs border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute flex items-center transform -translate-y-1/2 right-3 top-11">
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
                    className="mr-2"
                  />
                  i agree all &nbsp;
                  <p className="font-semibold text-blue-900">
                    terms and conditions
                  </p>
                </label>
              </div>
            </form>
            <button
              onClick={handleRegister}
              className="w-full p-2 mb-2 text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Sign up
            </button>

            <p className="mb-2 text-sm text-center text-gray-400 underline">
              or use another login
            </p>

            <p className="mt-2 text-sm text-center text-gray-400">
              Already have account ? &nbsp;
              <Link
                to={"/login"}
                className="font-semibold text-red-500 underline"
              >
                Sign in for free
              </Link>
            </p>
          </div>
          <div className="relative">
            <img
              src="https://plus.unsplash.com/premium_photo-1683135219860-44ad80fc9bb7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y291cnNlfGVufDB8fDB8fHww"
              alt=""
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
