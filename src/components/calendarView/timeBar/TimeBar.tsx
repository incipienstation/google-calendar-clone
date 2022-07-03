import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";

const TimeBar = () => {
  const scrollPoint = useSelector((state: RootState) => state.scrollPoint);

  const timeBarBuilder = () => {
    return Array(24)
      .fill(0)
      .map((v, i) => {
        const type: string = i < 12 ? "오전" : "오후";
        const time = `${(i === 12 ? i : i % 12).toString()}시`;
        const text: string = i !== 0 ? type + " " + time : "";
        return (
          <div key={i.toString()} className="time-bar col-12">
            <span className="text-time">{text}</span>
          </div>
        );
      });
  };
  return (
    <div
      style={{
        transform: `translateY(-${scrollPoint.scrollY}px)`,
      }}
    >
      {timeBarBuilder()}
    </div>
  );
};

export default TimeBar;
