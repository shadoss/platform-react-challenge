/**
 * Utility functions for managing meta tags and SEO
 */

/**
 * Updates a meta tag in the document head
 * @param property - The property attribute of the meta tag
 * @param content - The content attribute of the meta tag
 */
export const updateMetaTag = (property: string, content: string): void => {
  let metaTag = document.querySelector(`meta[property="${property}"]`);
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.setAttribute('property', property);
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute('content', content);
};

/**
 * Updates the document title
 * @param title - The title to set
 * @param suffix - Optional suffix to append to the title
 */
export const updateDocumentTitle = (title: string, suffix: string = '| Cat Lovers App'): void => {
  document.title = `${title} ${suffix}`;
};

/**
 * Updates the meta description
 * @param description - The description to set
 */
export const updateMetaDescription = (description: string): void => {
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', description);
};

/**
 * Updates the canonical URL
 * @param url - The canonical URL to set
 */
export const updateCanonicalUrl = (url?: string): void => {
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (url) {
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);
  } else if (canonicalLink) {
    canonicalLink.remove();
  }
};

/**
 * Updates Open Graph tags
 * @param title - The title for og:title
 * @param description - The description for og:description
 * @param type - The type for og:type
 * @param image - Optional image URL for og:image
 */
export const updateOpenGraphTags = (
  title: string,
  description: string,
  type: 'website' | 'article' = 'website',
  image?: string
): void => {
  updateMetaTag('og:title', title);
  updateMetaTag('og:description', description);
  updateMetaTag('og:type', type);

  if (image) {
    updateMetaTag('og:image', image);
  }
};

/**
 * Adds JSON-LD structured data to the document
 * @param jsonLd - The JSON-LD data to add
 */
export const addJsonLdStructuredData = (jsonLd?: Record<string, any>): void => {
  if (jsonLd) {
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(jsonLd);
  }
};

/**
 * Removes JSON-LD structured data from the document
 */
export const removeJsonLdStructuredData = (): void => {
  const scriptTag = document.querySelector('script[type="application/ld+json"]');
  if (scriptTag) {
    scriptTag.remove();
  }
};
