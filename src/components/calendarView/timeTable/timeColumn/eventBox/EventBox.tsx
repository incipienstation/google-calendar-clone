import { MouseEventHandler, SyntheticEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Event,
  dateTimeRangeToString,
} from "../../../../../features/eventData/eventDataSlice";
import {
  deleteEventId,
  openModal,
  setIsClosable,
  setIsPrevEventIdDeletable,
} from "../../../../../features/modalControl/modalControlSlice";
import { setSelectedEvent } from "../../../../../features/selectedEvent/selectedEventSlice";
import { RootState } from "../../../../../features/store";

const EventBox = ({
  event,
  range,
}: {
  event: Event;
  range: { start: number; end: number };
}) => {
  const baseWidth = "calc(100vw - 306px)";
  const dispatch = useDispatch();
  const modalControl = useSelector((state: RootState) => state.modalControl);

  const handleClick = () => {
    dispatch(setIsClosable(true));
    dispatch(setIsPrevEventIdDeletable(true));
    dispatch(setSelectedEvent({ event: event }));
    event.isNew ?? false
      ? dispatch(openModal({ modalType: "event-create", event: event }))
      : modalControl.prevEventId !== event.id
      ? dispatch(openModal({ modalType: "event-delete", event: event }))
      : dispatch(deleteEventId());
  };

  const handleAuxClick = () => {
    dispatch(setIsClosable(true));
    dispatch(setIsPrevEventIdDeletable(false));
    dispatch(setSelectedEvent({ event: event }));
    modalControl.prevEventId !== event.id
      ? dispatch(openModal({ modalType: "event-delete", event: event }))
      : dispatch(deleteEventId());
  };

  const handleMouseDown = () => {
    dispatch(setIsClosable(!(event.isNew ?? false)));
    dispatch(setIsPrevEventIdDeletable(false));
  };

  return (
    <div
      className="event-box"
      onClick={handleClick}
      onAuxClick={handleAuxClick}
      onMouseDown={handleMouseDown}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        height: `${range.end - range.start}px`,
        width: "90%",
        top: `calc(${range.start}px - 0.5px)`,
        left: "-0.5px",
        zIndex: "10",
      }}
    >
      <div className="event-box-text">{event.title}</div>
      <div className="event-box-text">
        {dateTimeRangeToString(event.dateTimeRange)}
      </div>
    </div>
  );
};

export default EventBox;
