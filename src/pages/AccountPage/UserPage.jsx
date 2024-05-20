// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef, useState, useEffect } from "react";
import HamburgerMenuAccount from "../../components/AccountComponent/HamburgerMenuAccount";
import ButtonBack from "../../components/AccountComponent/ButtonBack";
import Navbar from "../../components/NavbarComponent/Navbar";
import { useParams } from "react-router-dom";
import { MdOutlineCameraAlt } from "react-icons/md";
import MenuList from "../../components/AccountComponent/MenuList";
import axios from "axios";
import { getMe, updateMe } from "../../api/fetching";

const UserPage = () => {
  const { userId } = useParams();
  const [openHamburger, setOpenHamburger] = useState(false);
  // const [picture, setPicture] = useState(null);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  // eslint-disable-next-line no-unused-vars
  const [alertMessage, setAlertMessage] = useState("");
  const img = useRef();

  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
  };

  useEffect(() => {
    const token = localStorage.getItem("...");
    const fetchData = async () => {
      try {
        const resGetMe = await getMe(token);

        setImage(resGetMe.image);
        setName(resGetMe.name);
        setPhoneNumber(resGetMe.phoneNumber);
        setImage(resGetMe.image);
        setCountry(resGetMe.country);
        setCity(resGetMe.city);
      } catch (err) {
        throw new Error(err.meplitesage);
      }
    };
    fetchData();
  }, []);

  // fungsi update profile
  const handleChange = async () => {
    const token = localStorage.getItem("...");
    try {
      const resUpdate = await updateMe(
        image,
        name,
        phoneNumber,
        country,
        city,
        userId,
        token
      );
      setImage(resUpdate.image);
      window.location.reload(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setAlertMessage({ type: "error", message: err.relitonse.data.message });
      } else {
        setAlertMessage({ type: "error", message: err.message });
      }
    }
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
          <div className="items-center h-full max-w-3xl mx-4 mt-4 mb-6 bg-white border-2 border-indigo-600 lg:mx-auto rounded-2xl">
            {/* heading akun */}
            <div className="py-4 text-center bg-indigo-600 rounded-t-lg">
              <h1 className="text-lg font-bold text-white">Akun</h1>
            </div>

            {/* hamburger menu akun di mobile dan tablet*/}
            <HamburgerMenuAccount
              handleHamburgerClick={handleHamburgerClick}
              openHamburger={openHamburger}
            />

            <div className="flex flex-row justify-center mt-6 lg:justify-around">
              {/* menu pilihan pada laptop */}
              <div className="mt-[18px]">
                <MenuList />
              </div>
              {/* card profile */}
              <div className="flex flex-col items-center justify-center mb-6">
                {/*  image profile */}
                <div className="relative flex flex-col items-center -mt-10 lg:mt-0">
                  <img
                    src={image}
                    alt="avatar"
                    className="rounded-full shadow-md w-28"
                  />
                  <div className="absolute right-0 z-10 flex items-center justify-center p-1 bg-white rounded-full bottom-8 group">
                    <div
                      className="bg-white rounded-full cursor-pointer p-[2px] group-hover:bg-indigo-600"
                      onClick={() => img.current.click()}
                    >
                      <MdOutlineCameraAlt
                        title="upload avatarmu"
                        className="w-5 h-5 text-indigo-600 duration-200 group-hover:text-white"
                      />
                    </div>
                    <input
                      type="file"
                      ref={img}
                      hidden
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div className="flex flex-row items-center gap-1 mt-2 mb-1">
                    <span className="p-[6px] h-2 rounded-full bg-green-500"></span>
                    <p className="text-sm">Online</p>
                  </div>
                </div>
                {/* data input profile */}
                <div className="flex flex-col items-center gap-3">
                  {/* nama */}
                  <div className="text-left">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="w-64 px-2 py-2 text-xs placeholder-black border-2 rounded-xl border-slate-300"
                    />
                  </div>
                  {/* no telepon */}
                  <div className="text-left">
                    <label
                      htmlFor="phoneNumber"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      No Telepon
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(event) => setPhoneNumber(event.target.value)}
                      className="w-64 px-2 py-2 text-xs placeholder-black border-2 rounded-xl border-slate-300"
                    />
                  </div>
                  {/* negara  */}
                  <div className="text-left">
                    <label
                      htmlFor="country"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Negara
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={country}
                      placeholder="Masukkan Negara Tempat Tinggal"
                      onChange={(event) => setCountry(event.target.value)}
                      className="w-64 px-2 py-2 text-xs border-2 rounded-xl border-slate-300"
                    />
                  </div>
                  {/* kota */}
                  <div className="text-left">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-sm font-medium text-gray-800"
                    >
                      Kota
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={city}
                      placeholder="Masukkan Kota Tempat Tinggal"
                      onChange={(event) => setCity(event.target.value)}
                      className="w-64 px-2 py-2 text-xs border-2 rounded-xl border-slate-300"
                    />
                  </div>
                  {/* button save */}
                  <div className="mt-2">
                    <button
                      onClick={handleChange}
                      className={`w-full bg-indigo-500 text-sm font-medium text-white py-2 px-6 rounded-2xl hover:bg-indigo-600 focus:outline-none focus:shadow-outline-blue`}
                    >
                      Simpan Profil Saya
                    </button>
                    <ToastContainer />
                  </div>
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
