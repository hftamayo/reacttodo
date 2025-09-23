/**
 * @jest-environment jsdom
 */

import modalReducer, { openModal, closeModal, setModalProps } from '../../../src/shared/services/redux/slices/modalSlice';

describe('modalSlice', () => {
  beforeEach(() => {
    // No global state to reset; placeholder for AAA consistency
  });

  it('should return initial state when passed an empty action (AAA)', () => {
    // Arrange
    const undefinedState = undefined as any;
    const emptyAction = { type: '' } as any;

    // Act
    const state = modalReducer(undefinedState, emptyAction);

    // Assert
    expect(state).toEqual({ isOpen: false, modalType: null, modalProps: undefined });
  });

  it('openModal should set isOpen, modalType and optional props (AAA)', () => {
    // Arrange
    const initialState = { isOpen: false, modalType: null, modalProps: undefined };
    const payload = { modalType: 'login' as const, modalProps: { foo: 'bar' } } as any;

    // Act
    const state = modalReducer(initialState as any, openModal(payload));

    // Assert
    expect(state.isOpen).toBe(true);
    expect(state.modalType).toBe('login');
    expect(state.modalProps).toEqual({ foo: 'bar' });
  });

  it('openModal should work without modalProps (AAA)', () => {
    // Arrange
    const initialState = { isOpen: false, modalType: null, modalProps: undefined };

    // Act
    const state = modalReducer(initialState as any, openModal({ modalType: 'logout' } as any));

    // Assert
    expect(state.isOpen).toBe(true);
    expect(state.modalType).toBe('logout');
    expect(state.modalProps).toBeUndefined();
  });

  it('setModalProps should update only modalProps (AAA)', () => {
    // Arrange
    const initialState = { isOpen: true, modalType: 'login', modalProps: { a: 1 } } as any;
    const newProps = { b: 2 } as any;

    // Act
    const state = modalReducer(initialState, setModalProps(newProps));

    // Assert
    expect(state.isOpen).toBe(true);
    expect(state.modalType).toBe('login');
    expect(state.modalProps).toEqual({ b: 2 });
  });

  it('closeModal should reset to closed state (AAA)', () => {
    // Arrange
    const initialState = { isOpen: true, modalType: 'profile', modalProps: { x: 1 } } as any;

    // Act
    const state = modalReducer(initialState, closeModal());

    // Assert
    expect(state.isOpen).toBe(false);
    expect(state.modalType).toBeNull();
    expect(state.modalProps).toBeUndefined();
  });
});


