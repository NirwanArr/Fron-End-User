import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Collapse } from "react-collapse";
import PropTypes from "prop-types";

const Accordion = ({ open, toggle, title, desc }) => {
  return (
    <>
      <div className="pt-[10px]">
        <div
          className="bg-sky-900 py-[25px] px-[50px] flex justify-between items-center cursor-pointer text-white"
          onClick={toggle}
        >
          <p className="text-[22px] font-semibold">{title}</p>
          <div>{open ? <AiOutlineMinus /> : <AiOutlinePlus />}</div>
        </div>
      </div>
      <Collapse isOpened={open}>
        <div className="bg-black px-[50px] pb-[20px]">{desc}</div>
      </Collapse>
    </>
  );
};

export default Accordion;

Accordion.propTypes = {
  open: PropTypes.bool,
  toggle: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.node,
};
