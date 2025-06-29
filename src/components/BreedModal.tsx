import React, { useState, useEffect } from 'react';
import { Modal, Button, Loading, Error } from './ui';
import { getCatsByBreed } from '../api/catService';
import type { CatBreed, CatImage as CatImageType } from '../api/catService';
import CatImage from './CatImage';
import CatImageModal from './CatImageModal';
import useApiStatus from '../hooks/useApiStatus';

interface BreedModalProps {
  isOpen: boolean;
  onClose: () => void;
  breed: CatBreed;
}

/**
 * BreedModal component
 * Displays a modal with a list of cat images for a specific breed
 */
const BreedModal: React.FC<BreedModalProps> = ({
  isOpen,
  onClose,
  breed,
}) => {
  const [images, setImages] = useState<CatImageType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedImage, setSelectedImage] = useState<CatImageType | null>(null);
  const { status, setLoading, setSuccess, setError } = useApiStatus();

  // Fetch images for the breed
  const fetchImages = async (pageNum: number, append = false) => {
    try {
      setLoading();
      const limit = 8;
      const newImages = await getCatsByBreed(breed.id, limit, pageNum);

      if (append) {
        setImages(prev => [...prev, ...newImages]);
      } else {
        setImages(newImages);
      }

      setHasMore(newImages.length === limit);
      setSuccess();
    } catch (err) {
      console.error('Error fetching breed images:', err);
      setError();
    }
  };

  // Load images when the modal opens
  useEffect(() => {
    if (isOpen) {
      fetchImages(0);
    }
  }, [isOpen, breed.id]);

  // Handle loading more images
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage, true);
  };

  // Handle image click
  const handleImageClick = (image: CatImageType) => {
    setSelectedImage(image);
  };

  // Handle closing the image modal
  const handleCloseImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${breed.name} Cats`}
        maxWidth="4xl"
      >
        <div>
          <p className="breed-description">{breed.description}</p>

          {status === 'loading' && images.length === 0 ? (
            <Loading.Section text={`Loading ${breed.name} cats...`} />
          ) : status === 'error' && images.length === 0 ? (
            <Error
              title="Failed to load images"
              message={`We couldn't load images for ${breed.name}. Please try again.`}
              onRetry={() => fetchImages(0)}
            />
          ) : (
            <>
              <div className="breed-grid">
                {images.map((image) => (
                  <CatImage
                    key={image.id}
                    image={image}
                    onClick={() => handleImageClick(image)}
                    showBreedName={false}
                  />
                ))}
              </div>

              {images.length === 0 && (
                <p className="empty-message">No images found for this breed.</p>
              )}

              {hasMore && (
                <div className="mt-6 text-center">
                  <Button
                    onClick={handleLoadMore}
                    isLoading={status === 'loading' && images.length > 0}
                    disabled={status === 'loading'}
                  >
                    Load More
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </Modal>

      {selectedImage && (
        <CatImageModal
          isOpen={!!selectedImage}
          onClose={handleCloseImageModal}
          image={selectedImage}
        />
      )}
    </>
  );
};

export default BreedModal;
