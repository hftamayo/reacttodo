import * as React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@shadcn/ui';
import { cn } from '@/shared/components/ui/forms/utils/cn';

const ModalForm: React.FC<{
  isOpen: boolean;
  onDismiss: () => void;
  title: string;
  description?: string;
}> = ({ isOpen, onDismiss, title, description, children }) => {
  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} className="modal">
      <ModalOverlay className="fixed inset-0 bg-black bg-opacity-50" />
      <ModalContent className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <ModalHeader className="text-lg font-semibold">{title}</ModalHeader>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
          <ModalBody className="mt-4">{children}</ModalBody>
          <ModalFooter>
            <button
              onClick={onDismiss}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </ModalFooter>
        </div>
      </ModalContent>
    </Modal>
  );
};

export { ModalForm };
