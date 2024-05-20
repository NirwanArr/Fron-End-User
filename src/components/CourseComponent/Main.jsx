/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const Main = ({ courses, valueChecked, handleCardClick, id }) => {
  const [flag, setFlag] = useState(0);

  const filterCourses = () => {
    if (flag === "All" && valueChecked) {
      return courses.filter((item) => item.Category === valueChecked);
    } else if (flag === "Premium" && valueChecked) {
      return courses.filter(
        (item) => item.Category === valueChecked || item.Level === valueChecked
      );
    } else if (flag === "Selesai" && valueChecked) {
      return courses.filter((item) => item.Category === valueChecked);
    } else if (flag === "All") {
      return courses;
    } else {
      return courses.filter((item) => item.courseStatus === flag);
    }
  };
  useEffect(() => {
    setFlag("All");
  }, []);
  return (
    <div>
      {/* filter */}

      {/* loop semua data */}
      <div className="grid gap-8 mt-4 md:grid-cols-2 md:mt-6">
        {Array.isArray(courses) &&
          filterCourses().map((val, i) => (
            <Card
              key={i}
              item={val}
              filter={flag}
              id={id}
              onCardClick={handleCardClick}
            />
          ))}
      </div>
    </div>
  );
};

Main.propTypes = {
  courses: PropTypes.array,
};

export default Main;
