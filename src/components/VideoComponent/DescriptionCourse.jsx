import PropTypes from "prop-types";

const DescriptionCourse = ({ item }) => {
  if (!item) {
    return null; // Atau tindakan yang sesuai jika item tidak ada
  }
  return (
    <div className="mx-4 mb-5 md:mx-0">
      <div className="flex flex-col">
        <div className="flex flex-col mt-3">
          <h1 className="font-semibold md:text-xl">Tentang Kelas</h1>
          <p className="text-xs text-justify indent-5 md:text-sm ">
            {item.description}
          </p>
        </div>
        <div className="mt-3">
          <h1 className="font-semibold md:text-xl">
            Kelas ini Ditujukan Untuk
          </h1>
          <p className="text-xs text-justify indent-5 md:text-sm">
            {item.objectiveCourse}
          </p>
        </div>
      </div>
    </div>
  );
};
DescriptionCourse.propTypes = {
  item: PropTypes.object,
};
export default DescriptionCourse;
