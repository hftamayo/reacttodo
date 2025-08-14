// Modal types for the application
export type ModalType =
  | 'login'
  | 'signup'
  | 'resetPassword'
  | 'settings'
  | 'profile'
  | 'logout'
  | 'customSearch'
  | 'reportOptions'
  | 'exportReport'
  | null;

export interface ModalProps {
  [key: string]: any;
}

export interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  modalProps?: ModalProps;
}
