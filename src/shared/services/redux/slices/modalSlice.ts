import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ModalState,
  ModalType,
  ModalProps,
} from '@/shared/types/ui/modal.type';

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  modalProps: undefined,
};

interface OpenModalPayload {
  modalType: ModalType;
  modalProps?: ModalProps;
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<OpenModalPayload>) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
      state.modalProps = undefined;
    },
    setModalProps: (state, action: PayloadAction<ModalProps>) => {
      state.modalProps = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalProps } = modalSlice.actions;
export default modalSlice.reducer;
