import { PiShieldStarBold } from "react-icons/pi";
import { RiBook3Line } from "react-icons/ri";
import { FaClock } from "react-icons/fa6";
import { IoIosChatboxes } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// isinya info tentang course, kyk judul, rating, kategori, dll
const InfoCourse = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <div className="mx-4 md:mx-0">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-color-primary md:text-lg">
          {item.Category}
        </h1>
        <p className="flex text-sm font-semibold md:text-base">
          <span className="mr-1 md:mr-2">
            <FaStar className="w-4 h-4 md:w-5 md:h-5" color="#F9CC00" />
          </span>
          {item.rating}
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold md:text-base -tracking-wide ">
          {item.aboutCourse}
        </h3>
        <div className="w-full mt-3 md:w-11/12 lg:w-10/12">
          <div className="flex justify-between w-full">
            <p className="flex items-center text-xs font-semibold text-color-primary md:text-sm">
              <span className="mr-1 text-green-500">
                <PiShieldStarBold size={24} />
              </span>{" "}
              {item.courseLevel}
            </p>
            <p className="flex items-center text-xs font-semibold text-color-primary md:text-sm">
              <span className="mr-1 text-green-500">
                <RiBook3Line size={24} />
              </span>{" "}
              {item.modulePerCourse} Modul
            </p>
            <p className="flex items-center text-xs font-semibold text-color-primary md:text-sm">
              <span className="mr-1 text-green-500">
                <FaClock size={24} />
              </span>{" "}
              {item.durationPerCourseInMinutes} Menit
            </p>
          </div>
        </div>
        <div className="mt-2 md:w-1/2 lg:w-4/12">
          <Link
            to="https://t.me/+iNYqElh7sSwxYTll"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-xs lg:text-sm py-1 bg-[#73CA5C] text-white font-semibold rounded-full flex justify-center items-center"
          >
            Join Grup Telegram
            <span className="my-auto ml-3">
              <IoIosChatboxes color="white" size={20} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
InfoCourse.propTypes = {
  item: PropTypes.object,
};
export default InfoCourse;
