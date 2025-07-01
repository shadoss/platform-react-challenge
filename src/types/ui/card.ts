import React from 'react';

/**
 * Types related to the Card component
 */

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'bordered' | 'elevated';
}

export interface CardComponent extends React.FC<CardProps> {
  Image: React.FC<CardImageProps>;
  Content: React.FC<CardContentProps>;
  Title: React.FC<CardTitleProps>;
  Description: React.FC<CardDescriptionProps>;
  Footer: React.FC<CardFooterProps>;
  Badge: React.FC<CardBadgeProps>;
}

export interface CardImageProps {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide';
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'normal' | 'large';
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardBadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}
