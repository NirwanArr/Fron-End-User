/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { cn } from "../../libs/utils";
import { XCircle } from "lucide-react";
import { FaFilter } from "react-icons/fa";

const SideFilter = ({ categorys, handleSelectLevel, handleCheckboxChange , setSelectLevel}) => {
  const [open, setOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  if (!categorys) {
    return null;
  }
  const level = ["Beginner", "Intermediate", "Advanced"];

  const handleRadioChange = (e) => {
    setSelectedLevel(e.target.value);
    handleSelectLevel(e)
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((id) => id !== value)
        : [...prev, value]
    );
    handleCheckboxChange(e);
  };

  const resetFilters = () => {
    setSelectedLevel(null);
    setSelectedCategories([]);
    setSelectLevel("")
    // If handleCheckboxChange needs to be called on reset, you can do it here
  };

  return (
    <>
      {/* tombol ketika tampilan mobile untuk melihat filter */}
      <div className="md:hidden fixed bottom-2 left-[50%] -translate-x-[50%] z-30">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-semibold text-white rounded-md bg-primary"
        >
          <span className="mr-2">
            <FaFilter />
          </span>{" "}
          Filter
        </button>
      </div>
      <div
        className={cn(
          "opacity-0 fixed w-full left-0 bottom-[-71vh] z-50 md:z-0 h-[70vh] rounded-t-xl md:opacity-100 md:h-[80vh] overflow-auto  md:flex md:sticky md:top-24 transition-all duration-300 bg-white rounded-lg",
          open && "overflow-auto bottom-0 opacity-100"
        )}
      >
        <div className="flex flex-col w-full shadow-sm">
          {/* tombol x di ukuran mobile */}
          <div
            className="absolute p-2 pt-2 right-2 top-3 md:hidden"
            onClick={() => setOpen(false)}
          >
            <XCircle />
          </div>
          {/* filter  */}
          {/* kategori */}
          <div className="mx-5 my-2">
            <h1 className="text-lg font-bold tracking-wider">Kategori</h1>
            {categorys.map((category) => (
              <div className="flex items-center my-2 ml-1" key={category.id}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    value={category.id}
                    onChange={handleCategoryChange}
                  />
                  <span className="checkbox-custom rectangular"></span>
                </label>
                <p className="ml-4 text-sm font-semibold text-slate-600 -tracking-wide">
                  {category.categoryName}
                </p>
              </div>
            ))}
          </div>
          {/* level kesulitan */}
          <div className="mx-5 my-2">
            <h1 className="text-lg font-bold tracking-wider">
              Level Kesulitan
            </h1>
            {level.map((item, index) => (
              <div className="flex items-center my-2 ml-1" key={index}>
                <label className="checkbox-label">
                  <input
                    type="radio"
                    value={item}
                    name="level"
                    checked={selectedLevel === item}
                    onChange={handleRadioChange}
                  />
                  <span className="checkbox-custom rectangular"></span>
                </label>
                <p className="ml-4 text-sm font-semibold text-slate-600 -tracking-wide">
                  {item}
                </p>
              </div>
            ))}
          </div>
          {/* tombol untuk hapus filter */}
          <div className="mx-5 my-3">
            <button
              className="w-full p-1 mb-4 font-semibold text-red-500 transition duration-300 bg-white rounded-md -tracking-wider bg-inherit md:bg-transparent hover:bg-red-500 hover:text-white hover:scale-105"
              onClick={resetFilters}
            >
              Hapus Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideFilter;
