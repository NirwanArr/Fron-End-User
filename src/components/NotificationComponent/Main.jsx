import { IoNotificationsCircleSharp } from "react-icons/io5";

const Main = () => {
  return (
    <div className="w-full pb-10 overflow-hidden bg-white border rounded-xl border-color-primary">
      <div className="w-full bg-primary">
        <h1 className="py-3 font-semibold tracking-wider text-center text-white lg:py-4 lg:text-lg">
          Notifikasi
        </h1>
      </div>
      <div className="flex w-10/12 mx-auto mt-10">
        <div className="">
          <span className="text-color-primary">
            <IoNotificationsCircleSharp className="w-6 h-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </span>
        </div>
        <div className="flex justify-between w-full ml-3">
          <div className="flex flex-col">
            <h1 className="font-semibold text-color-primary lg:text-lg">
              🚀 Selamat Datang di Pejuang Ilmu!
            </h1>
            <h3 className="text-sm font-medium lg:text-base">
              Jelajahi berbagai kelas kami dan tingkatkan keterampilan Anda.
            </h3>
            <p className="text-xs font-medium opacity-50 lg:text-sm">
              Ada banyak pengetahuan menarik yang bisa Anda temukan!
            </p>
          </div>
          <div className="flex">
            <p className="text-xs font-medium lg:text-sm text-slate-600">
              2 Maret, 12.00
              <span className="hidden w-2 h-2 ml-3 bg-green-500 rounded-full lg:h-3 lg:w-3 md:inline-block" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
