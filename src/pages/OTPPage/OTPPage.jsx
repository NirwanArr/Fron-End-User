import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { MdVerifiedUser } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { resendOtp, verifyOtp } from "../../api/fetching";
import { useParams } from "react-router-dom";
import axios from "axios";

const OTPPage = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [code, setCode] = useState(null);
  const [timer, setTimer] = useState(60); // Timer awal dalam detik
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const email = localStorage.getItem("registeredEmail");

  useEffect(() => {
    let interval;

    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsTimerActive(false);
            return 60; // Setel ulang timer ke 60 detik setelah mencapai 0
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // Membersihkan interval saat komponen dilepas
  }, [isTimerActive]);

  const handleResendCode = async () => {
    try {
      const res = await resendOtp(email);
      setAlertMessage({ type: "success", res });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlertMessage({
          type: "error",
          message: err.response.data.res,
        });
        return;
      }
      setAlertMessage({ type: "error", message: err.message });
    }

    // Setelah mengirim ulang, aktifkan timer
    setIsTimerActive(true);
  };
  const handleVerify = async () => {
    try {
      const res = await verifyOtp(code, userId);
      setAlertMessage({ type: "success", message: res });

      navigate("/login");
    } catch (err) {
      setAlertMessage({
        type: "error",
        message: "Terjadi kesalahan dalam permintaan.",
      });
    }
  };

  return (
    <>
      <div className="relative flex flex-col justify-center min-h-screen py-32 overflow-hidden bg-gray-50 rounded-3xl">
        <div className="pt-24 lg:pt-32 absolute top-0 translate-x-[-50%] left-[50%]  w-full lg:w-9/12  pb-10">
          <div>
            <Link to={"/register"}>
              <h3 className="flex items-center ml-4 font-semibold duration-300 hover:scale-105 hover:underline lg:ml-0">
                <span className="mr-3">
                  <FaArrowLeft />
                </span>
                Kembali ke Register
              </h3>
            </Link>
          </div>
        </div>
        <div className="w-full max-w-lg px-6 pt-10 mx-auto bg-white shadow-2xl relativ pb-9 rounded-2xl">
          <div className="flex flex-col w-full max-w-md mx-auto space-y-7">
            <div className="flex flex-col items-center justify-center text-center">
              <MdVerifiedUser className="items-center justify-center w-24 h-24 text-blue-700" />
              <div className="text-2xl font-semibold ">OTP VERIV</div>
              <p className="font-poppins text-md">
                Enter the OTP sent to you verify your identity
              </p>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="flex flex-row items-center justify-center w-full max-w-sm mx-auto">
                <OtpInput
                  value={code}
                  onChange={setCode}
                  numInputs={4}
                  renderSeparator={<span className="px-2"> </span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-24 mx-2 text-5xl text-center border rounded-md h-14"
                    />
                  )}
                />
                {/* <OtpInput
                  value={code}
                  onChange={setCode}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-24 mx-2 text-5xl text-center border rounded-md h-14"
                    />
                  )}
                  containerStyle="justify-center"
                  inputStyle="flex"
                /> */}
              </div>
              <div className="flex flex-col items-center space-y-5">
                {alertMessage && (
                  <div
                    className={`flex justify-center items-center mx-auto text-xs  font-montserrat ${
                      alertMessage.type === "success"
                        ? "text-[#73CA5C]"
                        : "text-[#FF4949]"
                    }`}
                  >
                    <span className="inline-block">{alertMessage.res}</span>
                  </div>
                )}

                <button
                  onClick={handleVerify}
                  className="flex px-6 py-3 text-sm text-center text-white bg-blue-700 border border-none outline-none rounded-xl hover:bg-black"
                >
                  Verify OTP
                </button>
                <button
                  className="px-3 py-2 text-sm text-center bg-gray-300 border border-none outline-none rounded-xl hover:bg-blue-700"
                  // onClick={handleClearOTP}
                >
                  Clear OTP
                </button>

                <p className="mt-2 text-sm text-center text-gray-600 font-poppins">
                  {isTimerActive ? (
                    <p>Resend OTP in {timer} seconds</p>
                  ) : (
                    <p>
                      Didnt get code ? &nbsp;
                      <button
                        className="font-bold text-blue-950 font-poppins"
                        onClick={handleResendCode}
                      >
                        Resend OTP
                      </button>
                    </p>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPPage;
