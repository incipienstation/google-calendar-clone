import { createSlice } from "@reduxjs/toolkit";
import { Event } from "../eventData/eventDataSlice";

export type ModalControl = {
  enabled: boolean;
  modalType?: ModalType;
  event?: Event;
  prevEventId?: string;
  isClosable: boolean;
  isPrevEventIdDeletable: boolean;
};

type ModalType = "event-create" | "event-delete";

const initialState: ModalControl = {
  enabled: false,
  isClosable: true,
  isPrevEventIdDeletable: true,
};

export const modalControlSlice = createSlice({
  name: "modalControl",
  initialState,
  reducers: {
    openModal: (
      state,
      action: { payload: { modalType: ModalType; event: Event } }
    ) => {
      state.enabled = true;
      state.modalType = action.payload.modalType;
      state.event = action.payload.event;
      state.prevEventId = action.payload.event.id;
    },
    closeModal: (state) => {
      state.enabled = false;
      state.modalType = undefined;
      state.event = undefined;
      if (state.isPrevEventIdDeletable) {
        state.prevEventId = undefined;
      }
    },
    deleteEventId: (state) => {
      state.prevEventId = undefined;
    },
    setIsClosable: (state, action: { payload: boolean }) => {
      state.isClosable = action.payload;
    },
    setIsPrevEventIdDeletable: (state, action: { payload: boolean }) => {
      state.isPrevEventIdDeletable = action.payload;
    },
  },
});

export const {
  openModal,
  closeModal,
  deleteEventId,
  setIsClosable,
  setIsPrevEventIdDeletable,
} = modalControlSlice.actions;

export default modalControlSlice.reducer;
