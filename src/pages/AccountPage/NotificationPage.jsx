import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Main from "../../components/NotificationComponent/Main";
import Navbar from "../../components/NavbarComponent/Navbar";

const NotificationPage = () => {
  return (
    <>
      <Navbar />
      <div className="relative w-full">
        <div className="pt-24 lg:pt-32 absolute top-0 translate-x-[-50%] left-[50%]  w-full lg:w-9/12  pb-10">
          <div>
            <Link to="/">
              <h3 className="flex items-center ml-4 font-semibold duration-300 hover:scale-105 hover:underline lg:ml-0">
                <span className="mr-3">
                  <FaArrowLeft />
                </span>
                Kembali ke beranda
              </h3>
            </Link>
          </div>
          <div className="mx-2 mt-5 md:mx-10 ">
            <Main />
          </div>
        </div>
        <div className="bg-layer h-[40vh] md:h-[30vh] lg:h-64"></div>
      </div>
    </>
  );
};

export default NotificationPage;
