/**
 * Utility functions for SEO-related operations
 */

/**
 * Interface for collection page JSON-LD data
 */
interface CollectionPageJsonLdProps {
  title: string;
  description: string;
  url: string;
  items: Array<{
    position: number;
    url: string;
    name: string;
    image?: string;
    description?: string;
  }>;
}

/**
 * Creates JSON-LD structured data for a collection page
 * @param props - Collection page properties
 * @returns JSON-LD structured data object
 */
export const createCollectionPageJsonLd = (props: CollectionPageJsonLdProps) => {
  const { title, description, url, items } = props;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': title,
    'description': description,
    'url': url,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': items.map((item, index) => {
        const listItem: Record<string, any> = {
          '@type': 'ListItem',
          'position': item.position || index + 1,
          'url': item.url,
          'name': item.name,
        };

        if (item.image) {
          listItem.image = item.image;
        }

        if (item.description) {
          listItem.item = {
            '@type': 'Thing',
            'name': item.name,
            'description': item.description,
            'url': item.url
          };
        }

        return listItem;
      })
    }
  };
};
