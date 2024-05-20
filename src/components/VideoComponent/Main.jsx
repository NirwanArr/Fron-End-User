/* eslint-disable react/prop-types */
import ReactPlayer from "react-player";
import InfoCourse from "./InfoCourse";
import DescriptionCourse from "./DescriptionCourse";
import PropTypes from "prop-types";

const Main = ({ courseData, videoLink }) => {
  if (!courseData) {
    return null; // Atau tindakan yang sesuai jika item tidak ada
  }
  return (
    <div>
      <div className="flex flex-col">
        {/* isinya kyk judul, rating dll */}
        {/* InfoCourse ketika tampilan web */}
        <div className="hidden md:block">
          <InfoCourse item={courseData} />
        </div>
        {/* tampilan video */}
        <div className="flex justify-center">
          <div className="w-full mt-1 md:mt-8 ">
            <div className="overflow-hidden player-wrapper md:rounded-xl">
              {videoLink && (
                <ReactPlayer
                  url={videoLink}
                  controls
                  width="100%"
                  height="100%"
                  className="react-player"
                />
              )}
            </div>
          </div>
        </div>
        {/* Infocourse ketika mobile */}
        <div className="block w-full py-4 bg-layer md:hidden">
          <InfoCourse />
        </div>
        {/* deskripsi course isinya kyk tentang kelas */}
        <DescriptionCourse item={courseData} />
      </div>
    </div>
  );
};

Main.propTypes = {
  courseData: PropTypes.object,
};

export default Main;
