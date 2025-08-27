import { useAppSelector } from './useAppSelector';
import { useAppDispatch } from './useAppDispatch';
import { openModal, closeModal, setModalProps } from '../slices/modalSlice';
import { ModalType, ModalProps } from '@/shared/types/ui/modal.type';

/**
 * Custom hook for modal state management
 * Provides actions and selectors for modal operations
 */
export const useModalState = () => {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector((state) => state.modal);

  const handleOpenModal = (modalType: ModalType, modalProps?: ModalProps) => {
    dispatch(openModal({ modalType, modalProps }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleSetModalProps = (props: ModalProps) => {
    dispatch(setModalProps(props));
  };

  return {
    // State
    isOpen: modalState.isOpen,
    modalType: modalState.modalType,
    modalProps: modalState.modalProps,

    // Actions
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
    setModalProps: handleSetModalProps,
  };
};
