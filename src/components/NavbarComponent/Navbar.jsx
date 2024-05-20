import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

import { BiSearchAlt } from "react-icons/bi";
import { LuLogIn } from "react-icons/lu";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { decodeToken } from "../../api/payload";
import logo from "../../assets/no bg putih.png";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [openHamburger, setOpenHamburger] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [navbar, setNavbar] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("..."));
  const [token, setToken] = useState(localStorage.getItem("..."));

  // const isLoggedIn = !!token;
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("..."));
    setToken(localStorage.getItem("..."));
  }, [token]);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("...");
    if (token) {
      const dataToken = decodeToken();
      if (dataToken && dataToken.id) {
        return dataToken.id;
      }
    }
    return null;
  };
  const userId = getUserIdFromToken();

  // logic navbar on scroll to blur background
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleHamburgerClick = () => {
    setOpenHamburger(!openHamburger);
    // setSelectedIcon(null);
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
  };

  const Menus = [
    {
      name: "Kelas",
      icon: <TfiMenuAlt className="w-8 h-6" />,
      link: `/mycourse/${userId}`,
      dis: "translate-x-[2px]",
    },
    {
      name: "Notifikasi",
      icon: <IoNotifications className="w-8 h-6" />,
      link: "/notif",
      dis: "translate-x-[84px]",
    },
    {
      name: "Akun",
      icon: <FaUser className="w-8 h-6" />,
      link: `/user/${userId}`,
      dis: "translate-x-[165.5px]",
    },
  ];

  // state navmenu web
  const [active, setActive] = useState(0);

  return (
    <>
      <nav
        className={`w-full fixed z-20 bg-indigo-600 ${
          navbar
            ? "bg-indigo-500 bg-opacity-60 backdrop-blur-sm shadow-black shadow-sm duration-500"
            : ""
        }`}
      >
        <div className="flex items-center justify-between px-2 py-4 lg:pt-6 lg:px-10">
          {/* logo */}
          <div>
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-10 h-10" />
            </Link>
          </div>

          <div className="md:flex md:flex-row-reverse md:gap-8 md:items-center">
            {/* search mobile */}
            <div className="relative flex gap-4 lg:hidden">
              <div className="md:hidden">
                <BiSearchAlt
                  className="w-10 h-10 py-1 text-white bg-indigo-600 border cursor-pointer rounded-xl hover:bg-white hover:text-indigo-600 hover:duration-100 "
                  onClick={handleSearchClick}
                />
                <div
                  className={`${
                    isSearchOpen ? "-translate-x-28" : "-translate-x-[750px]"
                  }  transition-transform duration-500 ease-in-out absolute top-0 right-0 flex -mt-1`}
                >
                  <input
                    type="text"
                    placeholder="Cari Kursus Terbaik..."
                    className="px-4 transform border-none font-poppins rounded-s-2xl"
                  />
                  <div className="p-2 bg-white border-none rounded-e-2xl">
                    <BiSearchAlt className="w-8 h-8 py-1 text-indigo-600 cursor-pointer rounded-2xl hover:bg-indigo-700 hover:text-white" />
                  </div>
                </div>
              </div>

              {/* Navmenu mobile */}
              <div className="relative">
                <button
                  className="text-white lg:hidden focus:outline-none"
                  onClick={handleHamburgerClick}
                >
                  {openHamburger ? (
                    <RxCross2 className="w-10 h-9" />
                  ) : (
                    <FiMenu className="w-10 h-9" />
                  )}
                </button>
                <div
                  className={`${
                    openHamburger ? "translate-y-0" : "-translate-y-[290px]"
                  } transition-transform duration-300 ease-in-out absolute top-0 right-0 mt-16  bg-gradient-to-l from-indigo-200 border border-indigo-300 px-5 py-6 rounded-md shadow-lg `}
                >
                  <ul className="flex flex-col gap-4">
                    <NavLink as={Link} to={"/login"}>
                      <li
                        onClick={() => handleIconClick("Masuk")}
                        className="flex flex-row-reverse"
                      >
                        {selectedIcon === "Masuk" ? (
                          <div className="flex flex-row-reverse gap-2 px-3 py-2 text-white bg-indigo-600 rounded-lg">
                            <LuLogIn className="w-8 h-6" />
                            <span className="ml-2">Masuk</span>
                          </div>
                        ) : (
                          <LuLogIn className="w-8 h-6 text-indigo-600" />
                        )}
                      </li>
                    </NavLink>
                    <NavLink as={Link} to={`/mycourse/${userId}`}>
                      <li
                        onClick={() => handleIconClick("Kelas")}
                        className="flex flex-row-reverse"
                      >
                        {selectedIcon === "Kelas" ? (
                          <div className="flex flex-row-reverse gap-2 px-3 py-2 text-white bg-indigo-600 rounded-lg">
                            <TfiMenuAlt className="w-8 h-6" />
                            <span>Kelas</span>
                          </div>
                        ) : (
                          <TfiMenuAlt className="w-8 h-6 text-indigo-600" />
                        )}
                      </li>
                    </NavLink>
                    <NavLink as={Link} to={"/notif"}>
                      <li
                        onClick={() => handleIconClick("Notifikasi")}
                        className="flex flex-row-reverse"
                      >
                        {selectedIcon === "Notifikasi" ? (
                          <div className="flex flex-row-reverse gap-2 px-3 py-2 text-white bg-indigo-600 rounded-lg">
                            <IoNotifications className="w-8 h-6" />
                            <span>Notifkasi</span>
                          </div>
                        ) : (
                          <IoNotifications className="w-8 h-6 text-indigo-600" />
                        )}
                      </li>
                    </NavLink>
                    <NavLink as={Link} to={`/user/${userId}`}>
                      <li
                        onClick={() => handleIconClick("Akun")}
                        className="flex flex-row-reverse"
                      >
                        {selectedIcon === "Akun" ? (
                          <div className="flex flex-row-reverse gap-2 px-3 py-2 text-white bg-indigo-600 rounded-lg">
                            <FaUser className="w-8 h-6 " />
                            <span>Akun</span>
                          </div>
                        ) : (
                          <FaUser className="w-8 h-6 text-indigo-600" />
                        )}
                      </li>
                    </NavLink>
                  </ul>
                </div>
              </div>
            </div>

            {/* search web*/}
            <div className="hidden md:block lg:block">
              <form action="search" className="flex font-poppins">
                <input
                  className="border-none py-3 px-4 rounded-s-2xl bg-white text-sm lg:text-base lg:w-[500px]"
                  placeholder="Cari kursus terbaik..."
                  type="text"
                  name="search"
                />
                <button
                  type="submit"
                  className="flex items-center px-2 bg-white rounded-e-2xl"
                >
                  <BiSearchAlt className="w-10 h-10 py-1 text-white bg-indigo-600 border cursor-pointer rounded-xl hover:shadow-md hover:bg-indigo-700 " />
                </button>
              </form>
            </div>
          </div>

          {/* NavMenu Web */}
          <div className="items-center hidden lg:flex">
            {/* if not login  */}
            {!isLoggedIn && (
              <NavLink
                as={Link}
                to={"/login"}
                className="relative flex flex-row-reverse items-center gap-2 p-2 mr-8 font-semibold text-white transition-all border-2 border-white group font-poppins rounded-2xl hover:text-indigo-600 hover:bg-white"
              >
                <button className="">Masuk</button>
                <div className="">
                  <FaArrowRightLong className="w-8 h-6 mr-2 text-white transition-all group-hover:mr-4" />
                  <LuLogIn className="absolute w-8 h-8 transition-all transform -translate-y-1/2 opacity-0 top-1/2 group-hover:opacity-100 group-hover:translate-x-2" />
                </div>
              </NavLink>
            )}

            {/* if done login */}
            {isLoggedIn && (
              <ul className="relative flex items-center gap-6">
                <span
                  className={`bg-white duration-500 ${Menus[active].dis} border-2 border-white h-14 w-14 absolute -left-2 top-2 rounded-t-full`}
                ></span>
                {Menus.map((menu, i) => (
                  <li key={i}>
                    {/* {acttive} */}
                    <NavLink
                      as={Link}
                      to={menu.link}
                      className="flex flex-col items-center"
                      onClick={() => setActive(i)}
                    >
                      <span
                        className={`z-10 duration-500 text-white hover:text-slate-400 ${
                          i === active && "-mb-12 text-yellow-500"
                        }`}
                      >
                        {menu.icon}
                      </span>
                      <p
                        className={`text-white font-poppins font-medium ${
                          active === i
                            ? "-translate-y-4 duration-700 opacity-100"
                            : "opacity-0 -translate-y-16"
                        }`}
                      >
                        {menu.name}
                      </p>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
