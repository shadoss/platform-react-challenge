import React from 'react';

/**
 * Types related to the Loading component
 */

export interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  color?: 'primary' | 'secondary' | 'white';
  variant?: 'spinner' | 'dots' | 'pulse';
}

export interface LoadingOverlayProps {
  text?: string;
  className?: string;
  blur?: boolean;
}

export interface LoadingSectionProps {
  text?: string;
  height?: string;
  className?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
}

export interface LoadingSkeletonProps {
  className?: string;
  variant?: 'line' | 'circle' | 'rectangle';
  height?: string;
  width?: string;
  count?: number;
}

export interface LoadingComponent extends React.FC<LoadingProps> {
  Overlay: React.FC<LoadingOverlayProps>;
  Section: React.FC<LoadingSectionProps>;
  Skeleton: React.FC<LoadingSkeletonProps>;
}
