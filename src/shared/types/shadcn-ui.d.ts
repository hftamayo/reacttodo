declare module '@shadcn/ui' {
  import * as React from 'react';

  export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  export const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>>;
  export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>>;
  export const TextArea: React.FC<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
  >;
  export const Checkbox: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  export const Radio: React.FC<React.InputHTMLAttributes<HTMLInputElement>>;
  export const Modal: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ModalBody: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ModalCloseButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
  export const ModalOverlay: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ModalContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const ModalHeaderCloseButton: React.FC<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
  export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;

  // Add other components as needed
}
