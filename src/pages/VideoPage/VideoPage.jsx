// import ReactPlayer from "react-player";

import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import ProgressCourse from "../../components/VideoComponent/ProgressCourse";
import Navbar from "../../components/NavbarComponent/Navbar";
import Main from "../../components/VideoComponent/Main";
import { CiBoxList } from "react-icons/ci";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
// import PopupOnboarding from "../../components/VideoComponent/PopupOnboarding";
import { getCourseById, updateCourseStatus } from "../../api/fetching";

const VideoPage = () => {
  const { userId, courseId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState();
  const [videoLink, setVideoLink] = useState();
  const [contentStatus, setContentStatus] = useState(true);
  const [clickedContentIndex, setClickedContentIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await getCourseById(userId, courseId);
        await updateCourseStatus(userId, courseId);
        let allContentStatus = [];
        // let ContentStatus

        resData.chapters.forEach((chapter) => {
          chapter.contents.forEach((content) => {
            allContentStatus.push(content.status);
          });
        });

        const firstChapter = resData.chapters && resData.chapters[0];
        const firstContent = firstChapter && firstChapter.contents[0];
        const firstVideoLink = firstContent && firstContent.contentUrl;
        setClickedContentIndex(0);

        setVideoLink(firstVideoLink);
        setCourse(resData);
        setContentStatus(allContentStatus);
      } catch (err) {
        throw new Error(err.message);
      }
    };
    fetchData();
  }, [userId, courseId]);

  const handleSetVideoLink = (link) => {
    setVideoLink(link);
    // Mengatur status sesuai dengan konten yang di-klik
    setContentStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];

      // Hanya memperbarui status menjadi true jika sebelumnya adalah false
      if (!updatedStatus[clickedContentIndex]) {
        updatedStatus[clickedContentIndex] = true;
      }

      return updatedStatus;
    });
  };

  return (
    <>
      <Navbar />
      {/* tombol untuk menampilkan/menghilangkan progressCourse */}
      <div className="lg:hidden fixed bottom-2 sm:bottom-4 md:bottom-6 left-[50%] -translate-x-[50%] z-30  duration-300 transition-all">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md bg-primary"
        >
          <span className="mr-2">
            {isOpen ? <IoMdCloseCircleOutline /> : <CiBoxList />}
          </span>{" "}
          {isOpen ? "Close" : "List Course"}
        </button>
      </div>

      {/*  */}
      <div className="relative w-full">
        <div className="z-10 left-[50%] -translate-x-[50%] absolute w-full md:w-10/12 mt-20 md:mt-24 ">
          {/* Tombol kembali ke halaman kelas */}
          <Link to={`/myCourse/${userId}`}>
            <h1 className="flex items-center text-sm font-semibold transition-all duration-300 md:text-base hover:underline hover:scale-105">
              <span className="block mr-1 md:mr-2">
                <ArrowLeft className="w-4 h-4" />
              </span>{" "}
              Kelas Lainnya
            </h1>
          </Link>
          <div className="grid grid-cols-3 mx-auto gap-x-14 md:mt-5">
            {/* main section, isinya video sama deskripsi course */}
            <div className="col-span-3 lg:col-span-2">
              <Main
                courseData={course}
                videoLink={videoLink}
                contentStatus={contentStatus}
              />
            </div>
            {/* progress course, ada di sebelah kanan */}
            <div className="col-span-3 lg:col-span-1">
              <ProgressCourse
                isOpen={isOpen}
                chapters={course}
                handleVideoLink={handleSetVideoLink}
                contentStatus={contentStatus}
                onVideoClick={clickedContentIndex}
              />
            </div>
          </div>
        </div>
        {/* background yang beda warna */}
        <div className="bg-layer h-[280px] hidden md:block" />
      </div>
    </>
  );
};

export default VideoPage;
