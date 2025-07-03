import React, { useState } from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  variant?: 'default' | 'bordered' | 'elevated';
}

interface CardComponent extends React.FC<CardProps> {
  Image: React.FC<CardImageProps>;
  Content: React.FC<CardContentProps>;
  Title: React.FC<CardTitleProps>;
  Description: React.FC<CardDescriptionProps>;
  Footer: React.FC<CardFooterProps>;
  Badge: React.FC<CardBadgeProps>;
}

interface CardImageProps {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'wide';
  onLoad?: () => void;
  onError?: () => void;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'small' | 'normal' | 'large';
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBadgeProps {
  children: React.ReactNode;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}

/**
 * Card component
 * A container component with styling for displaying content in a card format
 */
const Card: CardComponent = ({
  className = '',
  children,
  onClick,
  hoverable = false,
  variant = 'default'
}) => {
  // Combined classes using CSS classes from index.css
  const variantClass = `card-${variant}`;
  const hoverClass = hoverable ? 'card-hoverable' : '';
  const combinedClasses = `card-base ${variantClass} ${hoverClass} ${className}`;

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};

/**
 * Card.Image component
 * For displaying images within a card
 */
Card.Image = function CardImage({
  src,
  alt = '',
  className = '',
  aspectRatio = 'auto',
  onLoad,
  onError
}: CardImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Combined classes using CSS classes from index.css
  const aspectRatioClass = aspectRatio !== 'auto' ? `card-image-aspect-${aspectRatio}` : '';
  const combinedClasses = `card-image ${aspectRatioClass} ${className}`;

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  return (
    <div className={combinedClasses}>
      {/* Loading state */}
      {isLoading && (
        <div className="image-loading-container">
          <div className="image-loading-spinner"></div>
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="image-loading-container">
          <div className="text-center">
            <svg
              className="image-error-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="image-error-text">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className={`card-image-img ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
};

/**
 * Card.Content component
 * For displaying content within a card
 */
Card.Content = function CardContent({
  children,
  className = '',
  padding = 'normal'
}: CardContentProps) {
  // Combined classes using CSS classes from index.css
  const paddingClass = `card-content-${padding}`;
  const combinedClasses = `${paddingClass} ${className}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};

/**
 * Card.Title component
 * For displaying a title within a card
 */
Card.Title = function CardTitle({
  children,
  className = '',
  as = 'h3'
}: CardTitleProps) {
  const Component = as;

  return (
    <Component className={`card-title ${className}`}>
      {children}
    </Component>
  );
};

/**
 * Card.Description component
 * For displaying a description within a card
 */
Card.Description = function CardDescription({
  children,
  className = ''
}: CardDescriptionProps) {
  return (
    <p className={`card-description ${className}`}>
      {children}
    </p>
  );
};

/**
 * Card.Footer component
 * For displaying a footer within a card
 */
Card.Footer = function CardFooter({
  children,
  className = ''
}: CardFooterProps) {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
};

/**
 * Card.Badge component
 * For displaying a badge within a card
 */
Card.Badge = function CardBadge({
  children,
  className = '',
  color = 'primary'
}: CardBadgeProps) {
  // Combined classes using CSS classes from index.css
  const colorClass = `card-badge-${color}`;
  const combinedClasses = `card-badge ${colorClass} ${className}`;

  return (
    <span className={combinedClasses}>
      {children}
    </span>
  );
};

export default Card;
