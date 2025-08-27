// Modal types for the application
export type ModalType =
  | 'login'
  | 'signup'
  | 'resetPassword'
  | 'settings'
  | 'profile'
  | 'logout'
  | 'updateTask'
  | 'customSearch'
  | 'reportOptions'
  | 'exportReport'
  | 'demo'
  | null;

export interface ModalProps {
  [key: string]: any;
}

export interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  modalProps?: ModalProps;
}
