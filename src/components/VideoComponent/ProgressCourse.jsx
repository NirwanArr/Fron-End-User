/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import ProgressBar from "../MyCourseComponent/ProgressBar";
import ChapterItem from "./ChapterItem";
import { cn } from "../../libs/utils";
import PropTypes from "prop-types";
import { useState } from "react";
const ProgressCourse = ({
  isOpen,
  chapters,
  handleVideoLink,
  contentStatus,
  onVideoClick,
}) => {
  if (!chapters) {
    return null; // Atau tindakan yang sesuai jika item tidak ada
  }
  if (typeof handleVideoLink !== "function") {
    console.error("handleVideoLink is not a function");
    return null;
  }
  const chapter = chapters.chapters;

  const [isActive, setIsActive] = useState({
    title: 0,
    chapter: 0,
  });

  return (
    <div
      className={cn(
        "absolute -top-[100vh] left-0 right-0 rounded-b-lg md:rounded-none lg:sticky lg:top-24 duration-500 transition-all",
        isOpen && "top-0 md:-top-4"
      )}
    >
      <div className="bg-white rounded-lg shadow-2xl lg:shadow-lg flex flex-col px-2 py-4 h-[75vh] overflow-auto">
        <div className="grid grid-cols-2 md:gap-x-2">
          <h1 className="ml-2 text-sm font-semibold md:text-base">
            Materi Belajar
          </h1>
          <div className="">
            <ProgressBar contentStatus={contentStatus} />
          </div>
        </div>
        {/* loop judul chapter  */}
        {/* Contohnya Chapter 1 - Pendahuluan */}
        {chapter.map((item, i) => (
          <div key={i} className="mx-2 my-1">
            <div className="flex justify-between mt-3 text-xs font-semibold lg:text-sm">
              <h1 className="font-bold text-color-primary">
                Chapter {i + 1} - {item.chapterTitle}
              </h1>
              {/* <p className="mr-2 text-blue-400">60 Menit</p> */}
            </div>
            {/* loop untuk mengambil list data dari setiap chapter */}
            {/* #6148FF */}
            {item.contents.map((content, x) => (
              <div
                key={x}
                className={cn(
                  "duration-300 cursor-pointer",
                  isActive.title === i &&
                    isActive.chapter === x &&
                    "scale-105 bg-primary text-white"
                )}
                onClick={() => {
                  setIsActive({ title: i, chapter: x });
                  handleVideoLink(content.contentUrl);
                }}
              >
                <ChapterItem
                  contentData={content}
                  index={x}
                  isActive={isActive.title === i && isActive.chapter === x}
                  onVideoClick={onVideoClick}
                  // handleContentStatus={() => handleContentStatus()}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

ProgressCourse.propTypes = {
  isOpen: PropTypes.bool,
  chapters: PropTypes.object,
  handleVideoLink: PropTypes.func,
};

export default ProgressCourse;
