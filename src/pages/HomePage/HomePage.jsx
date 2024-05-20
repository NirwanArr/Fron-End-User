import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import CardCategory from "../../components/HomeComponent/CardCategory";
import ButtonCourse from "../../components/HomeComponent/ButtonCourse";
import CardCourse from "../../components/HomeComponent/CardCourse";
import Navbar from "../../components/NavbarComponent/Navbar";
import { getCategory, getCourse } from "../../api/fetching";
import { decodeToken } from "../../api/payload";

const HomePage = () => {
  // const [item, setItems] = useState(Data);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("..."));
  const [token, setToken] = useState(localStorage.getItem("..."));
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("...");
    if (token) {
      const dataToken = decodeToken();
      if (dataToken && dataToken.id) {
        return dataToken.id;
      }
    }
    return null;
  };
  const userId = getUserIdFromToken();

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("..."));
    setToken(localStorage.getItem("..."));
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCategory = await getCategory();
        const resCourse = await getCourse();
        setCategories(resCategory);
        setCourses(resCourse);
      } catch (err) {
        throw new Error(err.message);
      }
    };
    fetchData();
  }, []);
  const menuItems = [...new Set(categories.map((val) => val.categoryName))];
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  var settingsCategory = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    pauseOnHover: true,
    speed: 800,
    responsive: [
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 2000, // max
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  var settingsCourse = {
    infinite: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: false,
    responsive: [
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 2000, // max
        settings: {
          slidesToShow: 6,
        },
      },
    ],
  };

  return (
    <>
      <Navbar />
      {/* main section */}
      <div className="w-full pt-[74px] relative h-64">
        <img
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="picture"
          className="absolute object-cover w-full h-full mix-blend-overlay"
        />
        <div className="flex flex-col h-64 pt-16 pl-10 bg-gradient-to-r from-indigo-600 lg:items-end lg:pr-40 lg:bg-gradient-to-l">
          <h1 className="text-xl font-semibold text-white">
            Belajar dari <br /> Praktisi Terbaik!
          </h1>
          <p className="hidden lg:block lg:absolute lg:text-3xl lg:top-[130px]">
            💡
          </p>
          {!isLoggedIn && (
            <NavLink as={Link} to={"/login"} className="z-10 mt-4">
              <button className="w-40 px-2 py-1 text-base font-semibold text-indigo-600 duration-300 bg-white rounded-lg h-9 hover:scale-110 hover:bg-indigo-600 hover:text-white lg:hover:border-white lg:hover:border">
                IKUTI KELAS
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Kategori Belajar */}
      <div className="w-full bg-layer lg:h-[350px]">
        <div className="max-w-screen-lg mx-auto">
          <div className="mt-[74px] h-96">
            <h1 className="px-6 pt-4 pb-1 text-xl font-bold text-black md:text-2xl lg:pb-2">
              Kategori Belajar
            </h1>
            <Slider {...settingsCategory} className="px-4">
              {categories.map((category, index) => (
                <div key={index}>
                  <CardCategory key={category.id} data={category} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Kursus Populer */}
      <div className="max-w-screen-lg px-6 mx-auto mt-20 md:mt-0 lg:p-0">
        {/* title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <h1 className="my-4 text-xl font-bold md:text-2xl">
              Kursus Populer
            </h1>
          </div>
          <Link to={`/course/${userId}`} className="text-sm text-indigo-500">
            Lihat Semua
          </Link>
        </div>
        {/* button filter */}
        <Slider {...settingsCourse}>
          {menuItems.map((val, i) => (
            <ButtonCourse
              key={i}
              val={val}
              filterItems={handleCategorySelect}
              isActive={val === selectedCategory}
            />
          ))}
        </Slider>
        <button
          className="flex justify-center w-full px-2 py-2 mt-2 text-xs font-medium text-white duration-300 border-none cursor-pointer lg:mt-4 bg-slate-600 rounded-2xl hover:scale-105 hover:bg-indigo-600 hover:text-white lg:font-semibold"
          onClick={() => handleCategorySelect(null)}
        >
          All
        </button>
        {/* card kursus populer */}

        <div>
          <CardCourse item={courses} selectedCategory={selectedCategory} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
