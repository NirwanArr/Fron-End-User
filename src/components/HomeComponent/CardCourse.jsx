import { Book, Clock, Shield } from "lucide-react";
// import Progressbar from "../MyCourseComponent/ProgressBar";
import { FaStar } from "react-icons/fa";
// import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CardCourse = ({ item, selectedCategory }) => {
  const filteredItems = selectedCategory
    ? item.filter((val) => val.Category === selectedCategory)
    : item;

  const compareByRating = (a, b) => {
    if (a.rating < b.rating) return 1;
    if (a.rating > b.rating) return -1;
    return 0;
  };
  const sortedItems = [...filteredItems].sort(compareByRating);
  return (
    <div className="grid grid-cols-1 gap-2 mt-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:mt-4">
      {sortedItems.map((val) => (
        <div
          key={val.id}
          className="w-full pb-3 my-2 mt-3 overflow-hidden bg-white shadow-xl rounded-xl"
        >
          <div className="flex flex-col">
            <div>
              <img
                src={val.image}
                alt="ayam"
                className="object-cover w-full overflow-hidden h-28"
              />
            </div>
            <div className="flex flex-col mx-2 mt-1 md:mx-4 md:mt-2">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-bold text-color-primary lg:text-base -tracking-wide">
                  {val.Category}
                </h1>
                <p className="flex items-center font-semibold">
                  <span className="mr-1 lg:mr-2">
                    <FaStar color="#F9CC00" className="w-4 h-4 lg:w-5 lg:h-5" />
                  </span>
                  {val.rating}
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold text-black lg:text-base -tracking-widest md:-tracking-wider">
                  {val.courseName}
                </h3>
                <p className="text-sm font-semibold text-black">
                  {val.courseBy}
                </p>
                <div className="flex flex-wrap justify-between mt-3">
                  <p className="flex items-center text-xs font-semibold text-color-primary -tracking-widest md:-tracking-wider">
                    <span className="text-green-500 mr-[2.5px]">
                      <Shield size={18} />
                    </span>{" "}
                    {val.courseLevel}
                  </p>
                  <p className="flex items-center text-xs font-semibold text-color-primary -tracking-widest md:-tracking-wider ">
                    <span className="text-green-500 mr-[2.5px]">
                      <Book size={18} />
                    </span>{" "}
                    {val.modulePerCourse} Modul
                  </p>
                  <p className="flex items-center text-xs font-semibold text-color-primary -tracking-widest md:-tracking-wider ">
                    <span className="text-green-500 mr-[2.5px]">
                      <Clock size={18} />
                    </span>{" "}
                    {val.durationPerCourseInMinutes} Menit
                  </p>
                </div>
                {/* ini button ketika sudah beli */}
                {/* <div className="my-2">
                  <Progressbar />
                </div> */}
                {/* Ini button ketika gratis */}

                <div className="my-2">
                  <button className="px-4 py-1 text-xs font-semibold text-white transition-all duration-300 rounded-full bg-primary hover:scale-105">
                    Mulai Kelas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCourse;

CardCourse.propTypes = {
  item: PropTypes.array,
  selectedCategory: PropTypes.string,
};
