import "../Modal.styles.scss";
import { KeyboardEventHandler, RefObject, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  dateTimeToString,
  dayList,
  deleteEvent,
} from "../../../features/eventData/eventDataSlice";
import { closeModal } from "../../../features/modalControl/modalControlSlice";
import { deleteSelectedEvent } from "../../../features/selectedEvent/selectedEventSlice";
import { RootState } from "../../../features/store";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import ModalCloseButton from "../../common/button/ModalCloseButton";
import { compareSelectedDate } from "../../../features/selectedDate/selectedDateSlice";

const EventDeleteModal = () => {
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const { dateTimeRange } = event!;
  const [startDateTime, endDateTime] = dateTimeRange;
  const {
    date: startDate,
    hour: startHour,
    minute: startMinute,
  } = startDateTime;
  const { date: endDate, hour: endHour, minute: endMinute } = endDateTime;
  const dispatch = useDispatch();
  const ref: RefObject<HTMLDivElement> = useRef(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleClickOutside = () => {
    dispatch(deleteSelectedEvent());
    dispatch(closeModal());
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleClickDelete = () => {
    dispatch(deleteEvent(event?.id!));
    dispatch(deleteSelectedEvent());
    dispatch(closeModal());
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Delete") {
      handleClickDelete();
    } else if (e.key === "Escape") {
      handleClickOutside();
    }
  };

  const eventIndicatorBuilder = () => {
    const startDateTimeString = dateTimeToString(startDateTime);
    const endDateTimeString = dateTimeToString(endDateTime);
    const res = compareSelectedDate(startDate, endDate) === 0 ? (
      <>
        <div>{`${startDate.month}월 ${startDate.date}일 (${
          dayList[startDate.day]
        }요일)`}</div>
        <span style={{ margin: "0 8px", fontWeight: "700" }}>⋅</span>
        <div>
          {startDateTimeString.substring(0, 2) ===
          endDateTimeString.substring(0, 2)
            ? startDateTimeString + "~" + endDateTimeString.substring(2)
            : startDateTimeString + "~" + endDateTimeString}
        </div>
      </>
    ) : (
      <>
        <div>{`${startDate.year}년 ${startDate.month}월 ${
          startDate.date
        }일, ${dateTimeToString(startDateTime)}~${endDate.year}년 ${
          endDate.month
        }월 ${endDate.date}일, ${dateTimeToString(endDateTime)}`}</div>
      </>
    );

    return (
      <>
        <div style={{ fontSize: "22px" }}>{event?.title}</div>
        <div
          className="d-flex flex-row"
          style={{
            fontSize: "14px",
            color: "#3c4043",
          }}
        >
          {res}
        </div>
      </>
    );
  };

  return (
    <div
      ref={ref}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="my-modal my-modal-event-delete"
    >
      <div className="my-modal-header my-modal-header-delete">
        <div
          onClick={handleClickDelete}
          className="material-symbols-outlined delete"
        >
          delete
        </div>
        <ModalCloseButton />
      </div>
      <div className="my-modal-body my-modal-body-delete">
        {eventIndicatorBuilder()}
      </div>
    </div>
  );
};

export default EventDeleteModal;
