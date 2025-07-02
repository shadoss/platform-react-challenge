import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  jsonLd?: Record<string, any>;
}

/**
 * SEO component for managing document head tags
 * @param title - Page title
 * @param description - Page description
 * @param canonicalUrl - Canonical URL for the page
 * @param ogImage - Open Graph image URL
 * @param ogType - Open Graph type (website or article)
 * @param jsonLd - JSON-LD structured data
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  jsonLd,
}) => {
  useEffect(() => {
    // Update document title
    document.title = `${title} | Cat Lovers App`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);
    } else if (canonicalLink) {
      canonicalLink.remove();
    }

    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', ogType);

    if (ogImage) {
      updateMetaTag('og:image', ogImage);
    }

    // Add JSON-LD structured data
    if (jsonLd) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(jsonLd);
    }

    // Cleanup function
    return () => {
      // Remove JSON-LD script if it exists
      const scriptTag = document.querySelector('script[type="application/ld+json"]');
      if (scriptTag) {
        scriptTag.remove();
      }
    };
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLd]);

  return null;
};

export default SEO;
