/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { FaCirclePlay } from "react-icons/fa6";
import { FaRegPauseCircle } from "react-icons/fa";
import { updateStatus } from "../../api/fetching";

// isi dari setiap chapter
const ChapterItem = ({ contentData, isActive, handleVideoLink, index }) => {
  if (!contentData) {
    return null; // Atau tindakan yang sesuai jika item tidak ada
  }
  const status = contentData.status || false;

  const chapterId = contentData.chapterId;
  const contentId = contentData.id;

  const handleContentStatus = async () => {
    try {
      await updateStatus(chapterId, contentId);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div>
      <div onClick={handleContentStatus} className="flex justify-between mt-3">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-center w-6 rounded-full aspect-square md:w-8 bg-slate-200">
            <p className=" text-[10px] text-xs font-bold">{index + 1}</p>
          </div>
          <div className="w-full mx-2">
            <p className="text-xs font-semibold md:text-sm">
              {contentData.contentTitle}
            </p>
          </div>
        </div>
        <div onClick={handleVideoLink} className="flex m-auto mr-3">
          <span>
            {isActive ? (
              <FaRegPauseCircle />
            ) : (
              <FaCirclePlay
                className="w-5 h-5"
                style={{ color: status ? "#73CA5C" : "#6148FF" }}
              />
            )}
          </span>
        </div>
      </div>
      <hr className="mt-2 shadow-md" />
    </div>
  );
};

ChapterItem.propTypes = {
  contentData: PropTypes.object,
  isActive: PropTypes.bool,
  handleVideoLink: PropTypes.func,
};

export default ChapterItem;
