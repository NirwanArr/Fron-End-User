import { FiEdit3 } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { MdMenuBook } from "react-icons/md";
import { decodeToken } from "../../api/payload";

const HamburgerMenuAccount = ({ handleHamburgerClick, openHamburger }) => {
  const handleLogout = () => {
    localStorage.removeItem("...");
  };
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
  return (
    // ini baru muncul saat masuk mode mobile dan tablet
    <div className="relative z-50 mt-3 ml-5 lg:hidden">
      <button className="text-indigo-600" onClick={handleHamburgerClick}>
        {openHamburger ? (
          <RxCross2 className="w-10 h-9" />
        ) : (
          <MdMenuBook className="w-10 h-9" />
        )}
      </button>
      <div
        className={`${
          openHamburger
            ? "-translate-x-24 md:-translate-x-[230px]"
            : "-translate-x-[685px] md:-translate-x-[877px]"
        }
                        transition-transform duration-300 ease-in-out absolute top-0 right-0 mt-11  bg-gradient-to-br via-indigo-300 from-indigo-600 bg-indigo-100 border-2 border-indigo-300 px-5 py-6 rounded-xl shadow-xl `}
      >
        <ul className="flex flex-col gap-3 text-left items-left">
          {/* link profil saya */}
          <li>
            <NavLink
              as={Link}
              to={`/user/${userId}`}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row gap-2 py-2 px-3 rounded-lg items-center text-sm bg-indigo-600 text-white"
                  : "flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-indigo-800 items-center text-sm hover:bg-indigo-600 hover:text-white duration-500"
              }
            >
              <FiEdit3 className="w-8 h-6" />
              <span className="font-medium">Profil Saya</span>
            </NavLink>
          </li>
          {/* link ubah password */}
          <li>
            <NavLink
              as={Link}
              to={`/changepassword/${userId}`}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row gap-2 py-2 px-3 rounded-lg items-center text-sm bg-indigo-600 text-white"
                  : "flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-indigo-800 items-center text-sm hover:bg-indigo-600 hover:text-white duration-500"
              }
            >
              <IoSettingsSharp className="w-8 h-6" />
              <span className="font-medium">Ubah Password</span>
            </NavLink>
          </li>
          {/* link ini logout dan ditampilkan jika sudah punya akun dan login */}
          <li>
            <NavLink
              onClick={handleLogout}
              as={Link}
              to={"/"}
              className={({ isActive }) =>
                isActive
                  ? "flex flex-row gap-2 py-2 px-3 rounded-lg items-center text-sm bg-indigo-600 text-white"
                  : "flex flex-row gap-2 bg-white bg-opacity-60 py-2 px-3 rounded-lg text-indigo-800 items-center text-sm hover:bg-indigo-600 hover:text-white duration-500"
              }
            >
              <HiOutlineLogout className="w-8 h-6" />
              <span className="font-medium">Keluar</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenuAccount;

HamburgerMenuAccount.propTypes = {
  // selectedIcon: PropTypes.string,
  handleHamburgerClick: PropTypes.func,
  // handleIconClick: PropTypes.func,
  openHamburger: PropTypes.bool,
};
