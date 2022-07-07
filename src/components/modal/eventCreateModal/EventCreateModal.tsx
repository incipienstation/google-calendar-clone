import "../Modal.styles.scss";
import TextField from "../../common/textField/TextField";
import TimePicker from "./timePicker/TimePicker";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../features/store";
import { closeModal } from "../../../features/modalControl/modalControlSlice";
import { createEvent } from "../../../features/eventData/eventDataSlice";
import {
  deleteSelectedEvent,
  setRepeatType,
  setSelectedEventTitle,
} from "../../../features/selectedEvent/selectedEventSlice";
import { ChangeEventHandler, KeyboardEventHandler, useRef } from "react";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import ModalCloseButton from "../../common/button/ModalCloseButton";
import RepeatTypeDropdown from "../../common/dropdown/RepeatTypeDropdown";

const EventCreateModal = () => {
  const { event } = useSelector((state: RootState) => state.selectedEvent);
  const { isClosable } = useSelector((state: RootState) => state.modalControl);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleClickOutside = () => {
    if (isClosable) {
      dispatch(deleteSelectedEvent());
      dispatch(closeModal());
    }
  };

  useOnClickOutside(ref, handleClickOutside);

  const handleClickSave = () => {
    dispatch(createEvent(event!));
    dispatch(deleteSelectedEvent());
    dispatch(closeModal());
  };

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter") {
      handleClickSave();
    } else if (e.key === "Escape") {
      handleClickClose();
    }
  };

  const handleClickClose = () => {
    dispatch(deleteSelectedEvent());
    dispatch(closeModal());
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(setSelectedEventTitle(e.target.value));
  };

  return (
    <div
      ref={ref}
      className="my-modal my-modal-event-create draggable"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div className="my-modal-header my-modal-header-create">
        <span className="material-symbols-outlined drag-handle">
          drag_handle
        </span>
        <ModalCloseButton />
      </div>
      <div className="my-modal-body my-modal-body-create">
        <TextField placeholder="제목 추가" onChange={handleChange} />
        <TimePicker />
        <RepeatTypeDropdown />
        <button
          className="btn btn-primary"
          onClick={handleClickSave}
          style={{
            alignSelf: "flex-end",
            zIndex: "0",
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default EventCreateModal;
