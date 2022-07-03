import { useSelector } from "react-redux";
import { RootState } from "../../features/store";
import EventCreateModal from "./eventCreateModal/EventCreateModal";
import EventDeleteModal from "./eventDeleteModal/EventDeleteModal";

const Modal = () => {
  const { enabled, modalType } = useSelector(
    (state: RootState) => state.modalControl
  );

  return (
    <div>
      {!enabled ? null : modalType === "event-create" ? (
        <EventCreateModal />
      ) : (
        <EventDeleteModal />
      )}
    </div>
  );
};

export default Modal;
