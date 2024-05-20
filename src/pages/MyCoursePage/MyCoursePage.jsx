/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Search } from "lucide-react";
import Main from "../../components/MyCourseComponent/Main";
import SideFilter from "../../components/MyCourseComponent/SideFilter";
import Navbar from "../../components/NavbarComponent/Navbar";
import { getCourseUser, getCategory } from "../../api/fetching";

const MyCoursePage = () => {
  const data = ["All", "In Progress", "Done"];
  const { userId } = useParams();
  const [userCourses, setUserCourses] = useState();
  const [category, setCategory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [level, setLevel] = useState([]);
  const [valueChecked, setValueChecked] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resGetUserCourse = await getCourseUser(userId);
        const resGetCategory = await getCategory();
        setUserCourses(resGetUserCourse);
        setCategory(resGetCategory);
        setCategories(resGetCategory.Category);
        setLevel(resGetUserCourse);
      } catch (err) {
        throw new Error(err.message);
      }
    };
    fetchData();
  }, [userId]);
  const handleCheckboxChange = (e) => {
    setValueChecked(e.target.checked ? e.target.value : "");
  };

  return (
    <>
      <Navbar />
      <div className="w-full pt-24 bg-layer lg:pt-28">
        <div className="w-10/12 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold md:text-xl lg:text-2xl">
              Kelas Berjalan
            </h1>
            <div className="lg:w-3/12">
              <form className="relative w-full">
                <input
                  type="text"
                  className="w-full h-8 pl-6 font-semibold text-black transition-all outline-none rounded-3xl ring-2 ring-color-primary lg:h-11 focus:outline-1"
                />
                <span className="text-slate-500 absolute -left-3 lg:left-0 top-2 lg:top-[10px] mx-5 font-semibold px-2 transition duration-200 input-text text-xs md:text-sm lg:text-base">
                  Cari kelas...
                </span>
                <span className="absolute right-2 md:right-5 top-[2.5px] inline-block bg-primary p-2 rounded-xl">
                  <Search className="w-3 h-3 text-white lg:w-5 lg:h-5" />
                </span>
              </form>
            </div>
          </div>
          <div className="mt-6 lg:mt-8">
            <div className="grid grid-cols-3 gap-x-4 lg:gap-x-20">
              <div className="col-span-3 md:col-span-1">
                <SideFilter
                  categorys={category}
                  levels={level}
                  handleCheckboxChange={handleCheckboxChange}
                />
              </div>
              <div className="col-span-3 md:col-span-2">
                <Main
                  courses={userCourses}
                  data={data}
                  valueChecked={valueChecked}
                  id={userId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCoursePage;
