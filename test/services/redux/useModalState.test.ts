/**
 * @jest-environment jsdom
 */

import { useModalState } from '../../../src/shared/services/redux/hooks/useModalState';
import { openModal, closeModal, setModalProps } from '../../../src/shared/services/redux/slices/modalSlice';

// Mock the app selector/dispatch hooks to avoid needing a real store/provider
const mockDispatch = jest.fn();
jest.mock('../../../src/shared/services/redux/hooks/useAppDispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

let modalStateMock = { isOpen: false, modalType: null as any, modalProps: undefined as any };
jest.mock('../../../src/shared/services/redux/hooks/useAppSelector', () => ({
  useAppSelector: (selector: any) => selector({ modal: modalStateMock }),
}));

describe('useModalState (unit, AAA)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    modalStateMock = { isOpen: false, modalType: null as any, modalProps: undefined };
  });

  it('returns modal state and bound actions (AAA)', () => {
    // Arrange
    // state already set by modalStateMock

    // Act
    const hook = useModalState();

    // Assert
    expect(hook.isOpen).toBe(false);
    expect(hook.modalType).toBeNull();
    expect(hook.modalProps).toBeUndefined();
    expect(typeof hook.openModal).toBe('function');
    expect(typeof hook.closeModal).toBe('function');
    expect(typeof hook.setModalProps).toBe('function');
  });

  it('openModal dispatches openModal action with payload (AAA)', () => {
    // Arrange
    const hook = useModalState();
    const payload = { modalType: 'login' as const, modalProps: { title: 'Welcome' } };

    // Act
    hook.openModal(payload.modalType, payload.modalProps);

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(openModal(payload));
  });

  it('closeModal dispatches closeModal (AAA)', () => {
    // Arrange
    const hook = useModalState();

    // Act
    hook.closeModal();

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(closeModal());
  });

  it('setModalProps dispatches setModalProps with provided props (AAA)', () => {
    // Arrange
    const hook = useModalState();
    const props = { a: 1 } as any;

    // Act
    hook.setModalProps(props);

    // Assert
    expect(mockDispatch).toHaveBeenCalledWith(setModalProps(props));
  });

  it('reflects updated selector state after actions (AAA)', () => {
    // Arrange
    const hook1 = useModalState();
    expect(hook1.isOpen).toBe(false);

    // Act
    modalStateMock = { isOpen: true, modalType: 'profile', modalProps: { x: 1 } } as any;
    const hook2 = useModalState();

    // Assert
    expect(hook2.isOpen).toBe(true);
    expect(hook2.modalType).toBe('profile');
    expect(hook2.modalProps).toEqual({ x: 1 });
  });
});


