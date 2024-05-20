import { BadgeCheck } from "lucide-react";
import PropTypes from "prop-types";

// persentase progress
export default function ProgressBar({ contentStatus }) {
  const trueCount = contentStatus.filter((status) => status).length;
  const totalContents = contentStatus.length;
  const truePercentage = (trueCount / totalContents) * 100;

  return (
    <div className="flex items-center">
      <div className="mr-2">
        <span className="text-green-500">
          <BadgeCheck size={20} />
        </span>
      </div>
      <div className="relative w-9/12 h-5 overflow-hidden rounded-full bg-slate-300">
        <div
          style={{
            height: "100%",
            width: `${truePercentage}%`,
            backgroundColor: "purple",
            transition: "width 0.5s",
          }}
          className="animate-fade"
        ></div>
        <span className="font-semibold absolute top-[50%] left-3 -translate-y-[50%] text-white text-xs drop-shadow-lg progressPercent">
          {truePercentage.toFixed(2)}% Complete
        </span>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  contentStatus: PropTypes.array,
};
