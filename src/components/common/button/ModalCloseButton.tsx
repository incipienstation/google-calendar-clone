import { useDispatch } from "react-redux";
import { closeModal } from "../../../features/modalControl/modalControlSlice";
import { deleteSelectedEvent } from "../../../features/selectedEvent/selectedEventSlice";

const ModalCloseButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteSelectedEvent());
    dispatch(closeModal());
  };
  return (
    <div onClick={handleClick} className="material-symbols-outlined close">
      close
    </div>
  );
};

export default ModalCloseButton;
