import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRandomCats, getCatImage } from '../api/catService';
import type { CatImage as CatImageType } from '../types';
import { Button, Loading, Error, Card } from '../components/ui';
import { CatImageModal, SEO } from '../components';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

/**
 * RandomCats page component
 * Displays a list of random cat images with load more functionality
 */
const RandomCats: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState<CatImageType[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(
    searchParams.get('imageId')
  );

  // Fetch random cats
  const {
    data: newCats,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['randomCats', page],
    queryFn: () => getRandomCats(10, page),
  });

  // Fetch selected cat image if imageId is in URL
  const {
    data: selectedImage,
    isLoading: isLoadingSelectedImage,
    isError: isErrorSelectedImage,
  } = useQuery({
    queryKey: ['catImage', selectedImageId],
    queryFn: () => (selectedImageId ? getCatImage(selectedImageId) : undefined),
    enabled: !!selectedImageId,
  });

  // Update cats state when new data is fetched
  useEffect(() => {
    if (newCats) {
      if (page === 0) {
        setCats(newCats);
      } else {
        setCats((prevCats) => [...prevCats, ...newCats]);
      }
    }
  }, [newCats, page]);

  // Handle load more button click
  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Handle cat image click
  const handleCatClick = (imageId: string) => {
    setSelectedImageId(imageId);
    setSearchParams({ imageId });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImageId(null);
    setSearchParams({});
  };

  // Create JSON-LD structured data for the page
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': 'Random Cats | Cat Lovers App',
    'description': 'Discover adorable cat photos from our collection of random cat images.',
    'url': window.location.href,
    'mainEntity': {
      '@type': 'ItemList',
      'itemListElement': cats.slice(0, 10).map((cat, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'url': `${window.location.origin}/?imageId=${cat.id}`,
        'name': cat.breeds && cat.breeds.length > 0 ? `${cat.breeds[0].name} Cat` : 'Cat Image',
        'image': cat.url
      }))
    }
  };

  return (
    <div className="page-container">
      <SEO
        title="Random Cats"
        description="Discover adorable cat photos from our collection of random cat images."
        canonicalUrl={window.location.href.split('?')[0]}
        ogImage={cats.length > 0 ? cats[0].url : undefined}
        jsonLd={jsonLd}
      />
      <div className="page-header">
        <h1 className="page-title">Random Cats</h1>
        <p className="page-subtitle">Discover adorable cat photos from our collection</p>
      </div>

      {/* Error state */}
      {isError && cats.length === 0 && (
        <Error
          title="Failed to load cats"
          message={`Error: ${error instanceof Error ? error.message : 'Unknown error'}`}
          onRetry={() => refetch()}
          variant="error"
          className="mb-6"
        />
      )}

      {/* Loading state for initial load */}
      {isLoading && cats.length === 0 && (
        <div className="loading-section-container">
          <Loading.Section text="Loading adorable cats..." variant="dots" />
        </div>
      )}

      {/* Cat images grid */}
      {cats.length > 0 && (
        <div className="grid-container">
          {cats.map((cat) => (
            <Card
              key={cat.id}
              hoverable
              variant="elevated"
              className="card-full-height"
              onClick={() => handleCatClick(cat.id)}
            >
              <Card.Image
                src={cat.url}
                alt="Cat"
                aspectRatio="square"
                className="card-image-fixed-height"
              />
              <Card.Footer>
                  <span className="detail-view-label">View details</span>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && cats.length === 0 && !isError && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
          <h3 className="empty-state-title">No cats found</h3>
          <p className="empty-state-message">Try refreshing the page or check back later.</p>
          <div className="empty-state-actions">
            <Button
              variant="primary"
              onClick={() => refetch()}
              icon={<ArrowPathIcon className="icon-small" />}
            >
              Refresh
            </Button>
          </div>
        </div>
      )}

      {/* Load more button */}
      {cats.length > 0 && (
        <div className="button-container">
          <Button
            variant="secondary"
            size="lg"
            onClick={handleLoadMore}
            isLoading={isLoading && cats.length > 0}
            disabled={isLoading}
            icon={!isLoading ? <ArrowPathIcon className="icon-small" /> : undefined}
            className="wide-button"
          >
            {isLoading ? 'Loading...' : 'Load More Cats'}
          </Button>
        </div>
      )}

      {/* Cat image modal - show whenever selectedImageId is set */}
      {selectedImageId && (
        <CatImageModal
          isOpen={!!selectedImageId}
          onClose={handleCloseModal}
          image={selectedImage}
          isLoading={isLoadingSelectedImage}
          isError={isErrorSelectedImage}
          errorMessage={`We couldn't load the details for this cat. The image ID "${selectedImageId}" might be invalid or the server is unavailable.`}
        />
      )}
    </div>
  );
};

export default RandomCats;
