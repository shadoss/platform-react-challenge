import React from 'react';

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
  color?: 'primary' | 'secondary' | 'white';
  variant?: 'spinner' | 'dots' | 'pulse';
}

interface LoadingOverlayProps {
  text?: string;
  className?: string;
  blur?: boolean;
}

interface LoadingSectionProps {
  text?: string;
  height?: string;
  className?: string;
  variant?: 'spinner' | 'dots' | 'pulse';
}

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'line' | 'circle' | 'rectangle';
  height?: string;
  width?: string;
  count?: number;
}

interface LoadingComponent extends React.FC<LoadingProps> {
  Overlay: React.FC<LoadingOverlayProps>;
  Section: React.FC<LoadingSectionProps>;
  Skeleton: React.FC<LoadingSkeletonProps>;
}

/**
 * Loading component
 * Displays a loading spinner with optional text
 */
const Loading: LoadingComponent = ({
  size = 'md',
  className = '',
  text,
  color = 'primary',
  variant = 'spinner'
}) => {
  // Using CSS classes from index.css
  const sizeClass = `loading-spinner-${size}`;
  const colorClass = `loading-spinner-${color}`;
  const dotSizeClass = `loading-dot-${size}`;

  // Render spinner variant
  if (variant === 'spinner') {
    return (
      <div className={`loading-container ${className}`}>
        <svg
          className={`loading-spinner ${colorClass} ${sizeClass}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {text && <p className="loading-text">{text}</p>}
      </div>
    );
  }

  // Render dots variant
  if (variant === 'dots') {
    return (
      <div className={`loading-container ${className}`}>
        <div className="loading-dots-container">
          <div className={`loading-dot ${dotSizeClass} ${colorClass}`} style={{ animationDelay: '0ms' }}></div>
          <div className={`loading-dot ${dotSizeClass} ${colorClass}`} style={{ animationDelay: '150ms' }}></div>
          <div className={`loading-dot ${dotSizeClass} ${colorClass}`} style={{ animationDelay: '300ms' }}></div>
        </div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    );
  }

  // Render pulse variant
  if (variant === 'pulse') {
    return (
      <div className={`loading-container ${className}`}>
        <div className={`loading-pulse ${sizeClass} ${colorClass}`}></div>
        {text && <p className="loading-text">{text}</p>}
      </div>
    );
  }

  return null;
};

/**
 * LoadingOverlay component
 * Displays a full-screen loading overlay
 */
Loading.Overlay = function LoadingOverlay({
  text = 'Loading...',
  className = '',
  blur = true
}: LoadingOverlayProps) {
  const backdropClass = blur ? 'loading-overlay-blur' : 'loading-overlay-no-blur';

  return (
    <div className={`loading-overlay ${backdropClass} ${className}`}>
      <Loading size="lg" text={text} />
    </div>
  );
};

/**
 * LoadingSection component
 * Displays a loading indicator for a section of the page
 */
Loading.Section = function LoadingSection({
  text = 'Loading...',
  height = 'h-40',
  className = '',
  variant = 'spinner'
}: LoadingSectionProps) {
  return (
    <div className={`loading-section ${height} ${className}`}>
      <Loading text={text} variant={variant} />
    </div>
  );
};

/**
 * LoadingSkeleton component
 * Displays a skeleton loading placeholder
 */
Loading.Skeleton = function LoadingSkeleton({
  className = '',
  variant = 'line',
  height = 'h-4',
  width = 'w-full',
  count = 1
}: LoadingSkeletonProps) {
  // Using CSS classes from index.css
  let skeletonClass = 'loading-skeleton';

  if (variant === 'circle') {
    skeletonClass += ' loading-skeleton-circle';
  }

  const combinedClasses = `${skeletonClass} ${height} ${width} ${className}`;

  return (
    <div className="loading-skeleton-container">
      {[...Array(count)].map((_, i) => (
        <div key={i} className={combinedClasses}></div>
      ))}
    </div>
  );
};

export default Loading;
