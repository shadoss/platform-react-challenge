import React from 'react';

/**
 * Types related to the Modal component
 */

export interface ModalProps {
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
