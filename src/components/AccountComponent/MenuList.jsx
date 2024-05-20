import { NavLink } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { IoSettingsSharp } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { decodeToken } from "../../api/payload";

const Menu = () => {
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
    // menu list ini ada ketika di mode laptop
    <div className="hidden lg:block">
      <NavLink
        to={`/user/${userId}`}
        className={({ isActive }) =>
          isActive
            ? "text-indigo-600 text-sm flex gap-2 items-center font-semibold"
            : "text-black text-sm flex items-center gap-2 font-semibold hover:text-indigo-600 hover:scale-105 duration-300"
        }
      >
        <FiEdit3 className="w-10 h-6 text-indigo-600" />
        <p>Profil Saya</p>
      </NavLink>
      <hr className="w-full my-3" />
      <NavLink
        to={`/changepassword/${userId}`}
        className={({ isActive }) =>
          isActive
            ? "text-indigo-600 text-sm flex gap-2 items-center font-semibold"
            : "text-black text-sm flex items-center gap-2 font-semibold hover:text-indigo-600 hover:scale-105 duration-300"
        }
      >
        <IoSettingsSharp className="w-10 h-6 text-indigo-600" />
        <p>Ubah Password</p>
      </NavLink>
      <hr className="w-full my-3" />
      {/* ini baru muncul ketika sudah login */}
      <NavLink onClick={handleLogout} to={"/"}>
        <div className="flex items-center gap-2 text-sm font-semibold duration-300 hover:text-indigo-600 hover:scale-105">
          <HiOutlineLogout className="w-10 h-6 text-indigo-600" />
          <p>Keluar</p>
        </div>
      </NavLink>
      <hr className="w-full my-3" />
    </div>
  );
};

export default Menu;
