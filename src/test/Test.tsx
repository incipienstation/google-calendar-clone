import { useSelector, useDispatch } from "react-redux"
import { setSelectedDate } from "../features/selectedDate/selectedDateSlice";
import { RootState } from "../features/store";

const Test = () => {
  const currDate = useSelector((state: RootState) => state.selectedDate);
  const dispatch = useDispatch();

  return <div className="zindex-tooltip">{currDate.date}</div>
}

export default Test;
