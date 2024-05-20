import PropTypes from "prop-types";

const ButtonCourse = ({ filterItems, val, isActive }) => {
  return (
    <>
      <div className="grid">
        <button
          onClick={() => filterItems(val)}
          className={`flex justify-center text-xs font-medium border-none cursor-pointer py-2 px-2 mx-2 rounded-2xl
                      ${
                        isActive
                          ? "bg-indigo-600 text-white"
                          : "bg-layer text-black"
                      }
                      hover:scale-105 duration-300 hover:bg-indigo-600 hover:text-white lg:font-semibold`}
        >
          {val}
        </button>
      </div>
    </>
  );
};

export default ButtonCourse;

ButtonCourse.propTypes = {
  filterItems: PropTypes.func,
  val: PropTypes.string,
  isActive: PropTypes.bool,
};
