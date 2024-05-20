/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CardKategori = ({ data }) => {
  return (
    <>
      <div className="relative">
        <Link
          to={"/"}
          className="flex flex-col items-center pt-2 hover:scale-[1.07] duration-500"
        >
          <img
            src={data.image}
            alt="gambar"
            className="w-80 md:w-80 md:h-44 p-2 rounded-3xl lg:blur-[2px] hover:blur-0"
          />
          <h1 className="my-4 font-medium text-black">{data.categoryName}</h1>
        </Link>
      </div>
    </>
  );
};

export default CardKategori;

CardKategori.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
};
