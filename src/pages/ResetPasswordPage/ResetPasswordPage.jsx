import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { resetPassword } from "../../api/fetching";
import axios from "axios";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isEmptyFieldError, setIsEmptyFieldError] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      setIsEmptyFieldError(true);
      setAlertMessage({ type: "Mohon lengkapi semua kolom." });
      return;
    }
    setIsEmptyFieldError(false);
    try {
      const res = await resetPassword(password, confirmPassword, userId);
      setAlertMessage({ type: "success", message: res });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlertMessage({ type: "error", message: err.response.data.message });
      } else {
        setAlertMessage({ type: "error", message: err.message });
      }
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
              Please enter a new password
            </span>
            {alertMessage && (
              <div
                className={`flex justify-center items-center mx-auto text-xs  font-montserrat ${
                  alertMessage.type === "success"
                    ? "text-[#73CA5C]"
                    : "text-[#FF4949]"
                }`}
              >
                <span className="block">{alertMessage.message}</span>
              </div>
            )}
            {isEmptyFieldError && (
              <div className="flex items-center justify-center mx-auto text-sm text-red-500 font-montserrat">
                <span className="inline-block">
                  Mohon lengkapi semua kolom.
                </span>
              </div>
            )}
            {/* {alertMessage && (
              <div className="flex items-center justify-center mx-auto text-sm text-red-500 font-montserrat">
                <span className="inline-block">{alertMessage}</span>
              </div>
            )} */}
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
            <div className="relative py-1">
              <span className="mb-2 text-sm font-poppins">
                Confirm Password
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full p-2 text-xs border border-gray-300 rounded-md placeholder:font-poppins placeholder:text-gray-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <div className="absolute flex transform -translate-y-1/2 right-3 top-11">
                {showConfirmPassword ? (
                  <FiEyeOff
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-gray-700 cursor-pointer"
                  />
                ) : (
                  <FiEye
                    onClick={toggleConfirmPasswordVisibility}
                    className="text-gray-700 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleChangePassword}
              className="w-full p-2 mt-2 text-white bg-black rounded-lg hover:bg-white hover:text-black hover:border hover:border-gray-300"
            >
              Change Password
            </button>
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

export default ResetPasswordPage;
