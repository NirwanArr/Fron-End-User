import { BadgeCheck } from "lucide-react";
import { useState } from "react";

// persentase progress
export default function ProgressBar() {
  const [percentage] = useState(90);

  // useEffect(() => {
  //   if (percentage < 99) {
  //     setTimeout(() => {
  //       setpercentage((prev) => prev + 1);
  //     }, 30);
  //   }
  // }, [percentage]);

  return (
    <div className="flex items-center">
      <div className="mr-2">
        <span className="text-green-500">
          <BadgeCheck size={20} />
        </span>
      </div>
      <div className="w-9/12 relative overflow-hidden h-5 rounded-full bg-slate-300">
        <div
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: "purple",
            transition: "width 0.5s",
          }}
          className="animate-fade"
        ></div>
        <span className="font-semibold absolute top-[50%] left-3 -translate-y-[50%] text-white text-xs drop-shadow-lg progressPercent">
          {percentage}% Complete
        </span>
      </div>
    </div>
  );
}
