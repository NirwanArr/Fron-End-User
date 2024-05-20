import { Link } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io";

const ButtonBack = () => {
   return (
      <div className="text-indigo-600 text-sm font-medium lg:text-lg lg:font-semibold lg:flex lg:justify-center lg:mr-[560px]">
         <Link to={'/'} className="flex items-center gap-2 mx-2">
            <IoMdArrowRoundBack />
            <p>Kembali Ke Beranda</p>
         </Link>
      </div>
   )
}

export default ButtonBack