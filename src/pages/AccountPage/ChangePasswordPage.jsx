import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from "../../components/AccountComponent/ButtonBack";
import MenuList from "../../components/AccountComponent/MenuList";
import Navbar from "../../components/NavbarComponent/Navbar";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { newPasswordUser } from "../../api/fetching";
import axios from "axios";

const UserPage = () => {
  const { userId } = useParams();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openHamburger, setOpenHamburger] = useState(false);

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prevShowOldPassword) => !prevShowOldPassword);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleNewPassword = async () => {
    try {
      const res = await newPasswordUser(
        oldPassword,
        newPassword,
        confirmPassword,
        userId
      );
      setAlertMessage({ type: "success", message: res });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlertMessage({ type: "error", message: err.response.data.message });
      } else {
        setAlertMessage({ type: "error", message: err.message });
      }
    }
  };

  // fungsi buka tutup hamburger menu
  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full">
        <div className="w-full h-64 pt-24 bg-layer"></div>
        <div className="container mx-auto -mt-40 lg:-mt-32">
          {/* button kembali ke beranda/home */}
          <ButtonBack />

          {/* card border */}
          <div className="items-center h-full max-w-3xl mx-4 mt-4 bg-white border-2 border-indigo-600 lg:mx-auto rounded-2xl">
            {/* heading akun */}
            <div className="py-4 text-center bg-indigo-600 rounded-t-lg">
              <h1 className="text-lg font-bold text-white">Akun</h1>
            </div>

            {/* hamburger menu akun di mobile dan tablet*/}
            <HamburgerMenuAccount
              handleHamburgerClick={handleHamburgerClick}
              openHamburger={openHamburger}
            />

            <div className="flex flex-col items-center justify-center mb-10 lg:mt-8 lg:flex lg:flex-row lg:justify-around">
              {/* menu pilihan pada laptop */}
              <div className="lg:-mt-[136px]">
                <MenuList />
              </div>
              {/* card ubah password */}
              <div className="-mt-4 lg:mt-3">
                {/* heading ubah password */}
                <div className="mb-2 text-xl font-semibold text-center">
                  Ubah Password
                </div>
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
                {/* input update password */}
                <div className="flex flex-col items-center gap-4">
                  {/* masukkan password lama */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="lama"
                      className="mb-2 text-sm font-medium text-gray-800"
                    >
                      Masukkan Password Lama
                    </label>
                    <div className="relative w-64">
                      <input
                        type={showOldPassword ? "text" : "password"}
                        id="lama"
                        value={oldPassword}
                        className="w-64 px-4 py-2 text-xs border-2 rounded-xl border-slate-300"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                      <div className="absolute flex transform -translate-y-1/2 right-3 top-4">
                        {showOldPassword ? (
                          <FiEyeOff
                            onClick={toggleOldPasswordVisibility}
                            className="text-gray-700 cursor-pointer"
                          />
                        ) : (
                          <FiEye
                            onClick={toggleOldPasswordVisibility}
                            className="text-gray-700 cursor-pointer"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {/* masukkan password baru */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="baru"
                      className="mb-2 text-sm font-medium text-gray-800"
                    >
                      Masukkan Password Baru
                    </label>
                    <div className="relative w-64">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="baru"
                        value={newPassword}
                        className="w-64 px-4 py-2 text-xs border-2 rounded-xl border-slate-300"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <div className="absolute flex transform -translate-y-1/2 right-3 top-4">
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
                  </div>
                  {/* ulangin password baru */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="ulang"
                      className="mb-2 text-sm font-medium text-gray-800"
                    >
                      Ulangi Password Baru
                    </label>
                    <div className="relative w-64">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="ulang"
                        value={confirmPassword}
                        className="w-64 px-4 py-2 text-xs border-2 rounded-xl border-slate-300"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <div className="absolute flex transform -translate-y-1/2 right-3 top-4">
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
                  </div>
                  {/* button simpan perubahan */}
                  <button
                    onClick={handleNewPassword}
                    className="px-6 py-3 mt-2 text-sm font-semibold text-white bg-indigo-500 border-none rounded-2xl hover:bg-indigo-700"
                  >
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
