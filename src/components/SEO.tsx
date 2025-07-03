import React, { useEffect } from 'react';
import {
  updateDocumentTitle,
  updateMetaDescription,
  updateCanonicalUrl,
  updateOpenGraphTags,
  addJsonLdStructuredData,
  removeJsonLdStructuredData
} from '../utils/metaUtils';

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
    updateDocumentTitle(title);

    // Update meta description
    updateMetaDescription(description);

    // Update canonical URL
    updateCanonicalUrl(canonicalUrl);

    // Update Open Graph tags
    updateOpenGraphTags(title, description, ogType, ogImage);

    // Add JSON-LD structured data
    addJsonLdStructuredData(jsonLd);

    // Cleanup function
    return () => {
      removeJsonLdStructuredData();
    };
  }, [title, description, canonicalUrl, ogImage, ogType, jsonLd]);

  return null;
};

export default SEO;
