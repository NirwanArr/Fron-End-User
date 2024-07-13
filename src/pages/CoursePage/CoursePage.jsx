import { Search } from "lucide-react";
import Main from "../../components/CourseComponent/Main";
import SideFilter from "../../components/CourseComponent/SideFilter";
import Navbar from "../../components/NavbarComponent/Navbar";
import { useState, useEffect } from "react";
import { getCourse, createCourse, getCategory } from "../../api/fetching";
import { useParams, useNavigate } from "react-router-dom";

const CoursePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [level, setLevel] = useState([]);
  const [selecCategory, setSelectedCategories] = useState([]);
  const [selectLevel, setSelectLevel] = useState("");
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCourse = await getCourse({selecCategory, selectLevel});
        const resGetCategory = await getCategory();
        setCourses(resCourse);
        setCategory(resGetCategory);
        setLevel(resCourse.Level);
      } catch (err) {
        throw new Error(err.message);
      }
    };

    fetchData();
  }, [selecCategory, selectLevel]);


  const handleSelectLevel = (e) => {
    setSelectLevel(e.target.value)
  }

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, parseInt(value)]);
    } else {
      setSelectedCategories((prev) => prev.filter((id) => id !== parseInt(value)));
    }
  };

  const handleCardClick = async (courseId) => {
    // const token = localStorage.getItem("...");

    // await createCourse(userId, courseId, token);
    setTimeout(() => {
      
    navigate(`/course/${courseId}`, {replace: true});
    }, 200);
  };
  
  return (
    <>
      <Navbar />
      <div className="w-full pt-24 bg-layer lg:pt-28">
        <div className="w-10/12 mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-bold md:text-xl lg:text-2xl">
              Topik Kelas
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
                  handleSelectLevel={handleSelectLevel}
                  setSelectLevel={setSelectLevel}
                />
              </div>
              <div className="col-span-3 md:col-span-2">
                <Main
                  // valueChecked={valueChecked}
                  courses={courses}
                  handleCardClick={handleCardClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
