import { UIEvent } from "react";
import { useDispatch } from "react-redux";
import { setScrollPoint } from "../../../features/scrollPoint/scrollPointSlice";
import TimeColumn from "./timeColumn/TimeColumn";

const TimeTable = () => {
  const dispatch = useDispatch();

  const handleScroll = (e: UIEvent<HTMLElement>) => {
    dispatch(
      setScrollPoint({
        scrollX: e.currentTarget.scrollLeft,
        scrollY: e.currentTarget.scrollTop,
      })
    );
  };

  const timeCellBuilder = Array(8)
    .fill(0)
    .map((v, i) => {
      const danglingBuilder = Array(48)
        .fill(0)
        .map((v, j) => {
          return (
            <div
              key={i.toString() + " " + j.toString()}
              className={
                j % 2 === 0 && j !== 0
                  ? "danglings danglings-bordered"
                  : "danglings"
              }
            />
          );
        });
      return i === 0 ? (
        <div key={i.toString()} className="g-0">
          {danglingBuilder}
        </div>
      ) : (
        <TimeColumn key={i.toString()} day={i - 1} />
      );
    });

  return (
    <div>
      <div className="text-center time-table g-0" onScroll={handleScroll}>
        {timeCellBuilder}
      </div>
    </div>
  );
};

export default TimeTable;
