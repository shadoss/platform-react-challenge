import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
  hideCloseButton?: boolean;
  position?: 'center' | 'top';
  footerContent?: React.ReactNode;
}

/**
 * Modal component
 * A dialog component for displaying content in a modal overlay
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
  hideCloseButton = false,
  position = 'center',
  footerContent,
}) => {
  // Using CSS classes from index.css
  const maxWidthClass = `max-w-${maxWidth}`;
  const positionClass = `modal-wrapper-${position}`;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="modal-dialog" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-backdrop" />
        </Transition.Child>

        {/* Modal panel */}
        <div className="modal-container">
          <div className={`modal-wrapper ${positionClass}`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`modal-panel ${maxWidthClass}`}
              >
                {/* Header with title and close button */}
                {title && (
                  <div className="modal-header">
                    <div>
                      <Dialog.Title as="h3" className="modal-title">
                        {title}
                      </Dialog.Title>
                      {description && (
                        <Dialog.Description className="modal-description">
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                    {!hideCloseButton && (
                      <button
                        type="button"
                        className="modal-close-button"
                        onClick={onClose}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="modal-close-icon" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className={title ? 'modal-content-with-title' : 'modal-content-without-title'}>
                  {children}
                </div>

                {/* Footer */}
                {footerContent && (
                  <div className="modal-footer">
                    {footerContent}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
