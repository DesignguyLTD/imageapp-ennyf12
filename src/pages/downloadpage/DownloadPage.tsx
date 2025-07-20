import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faDownload, faHeart, faLayerGroup, faShareSquare } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

import styles from './DownloadPage.module.css';
import { Photo } from '../../types/pexels';

interface DownloadPageParams {
  imageId: string;
  [key: string]: string | undefined;
}

interface DownloadPageProps {
  storyImageId?: string;
  storyImageData?: Photo | null;
  storyLoading?: boolean;
  storyError?: string | null;
}

const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

const DownloadPage: React.FC<DownloadPageProps> = ({
  storyImageId,
  storyImageData,
  storyLoading,
  storyError,
}) => {
  const { imageId: paramImageId } = useParams<DownloadPageParams>();
  const currentImageId = storyImageId || paramImageId;

  const [imageData, setImageData] = useState<Photo | null>(storyImageData || null);
  const [loading, setLoading] = useState<boolean>(storyLoading !== undefined ? storyLoading : true);
  const [error, setError] = useState<string | null>(storyError !== undefined ? storyError : null);

  useEffect(() => {
    if (storyImageId || storyLoading !== undefined || storyError !== undefined || storyImageData !== undefined) {
      return;
    }

    const fetchImageDetails = async () => {
      if (!currentImageId) {
        setError("Image ID not found in URL.");
        setLoading(false);
        return;
      }

      if (!PEXELS_API_KEY) {
        setError("Pexels API key not found. Please set REACT_APP_PEXELS_API_KEY in your .env.local file.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.pexels.com/v1/photos/${currentImageId}`, {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Image with ID ${currentImageId} not found.`);
          }
          const errorData = await response.json();
          throw new Error(`Failed to fetch image: ${errorData.error || response.statusText}`);
        }

        const data: Photo = await response.json();
        setImageData(data);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred while fetching image details.');
        console.error("Error fetching image details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [currentImageId, storyImageId, storyLoading, storyError, storyImageData]);

  const handleDownload = async () => {
    if (storyImageId || storyLoading !== undefined || storyError !== undefined || storyImageData !== undefined) {
      console.log(`Storybook: Download button clicked for Image ID: ${currentImageId}`);
      alert('Storybook: Download simulated!');
      return;
    }

    if (!imageData?.src.large2x) {
      alert("Image source not available for download.");
      return;
    }

    const imageUrl = imageData.src.large2x;
    const downloadFileName = `${imageData.alt || 'pexels-image'}-${imageData.id}.jpg`;

    try {
      const response = await fetch(imageUrl, { mode: 'cors' });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = downloadFileName;
      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(objectUrl);
     
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Download failed. Please check the console for details.');
    }
  };

  if (loading) {
    return (
      <div className={styles.downloadPage} >
        <h2 className={styles.loadingMessage}>Loading image details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.downloadPage} >
        <h2 className={styles.errorMessage}>Error: {error}</h2>
        <p>Please try navigating back or searching for another image.</p>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className={styles.downloadPage}>
        <h2 className={styles.noDataMessage}>Image data not found.</h2>
      </div>
    );
  }

  return (
    <div className={styles.downloadPage}>
      <div className={styles.preview}>
        <div className={styles.leftSection}>
          <img
            src={imageData.src.large || imageData.src.original}
            alt={imageData.alt || `Photo by ${imageData.photographer}`}
            className={styles.mainImage}
          />

          <div className={styles.creatorInfo}>
            <div className={styles.creatorAvatar}>
              <img src="https://via.placeholder.com/60/cccccc/000000?text=C" alt="creator avatar" className={styles.creatorAvatarImage} />
            </div>
            <div className={styles.creatorDetails}>
              <h2>{imageData.photographer}</h2>
              <p>43444+ Elements</p>
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.productInfo}>
              <h2> Image</h2>
              <p>Product ID: {imageData.id} <FontAwesomeIcon icon={faCopy} /></p>
            </div>
            <p className={styles.description}>
              {imageData.alt || 'No specific description available for this image.'}
            </p>
            <p style={{marginTop: '10px', fontSize: '0.9em', color: '#888'}}>
                <a href={imageData.url} target="_blank" rel="noopener noreferrer" style={{color: '#4a00e0'}}>View on Pexels.com</a>
            </p>
          </div>
        </div>

        <div className={styles.rightSection}>
          <h2 className={styles.rightSectionTitle}>{imageData.alt || 'Untitled Image'}</h2>
          <h3 className={styles.rightSectionSubtitle}>Free With Attribution</h3>
          <p className={styles.downloadFormats}>Download in PNG, and Eps or AI-Formats</p>

          <div className={styles.detailsCounts}>
            <p><FontAwesomeIcon icon={faEye} />45.23K</p>
            <p><FontAwesomeIcon icon={faDownload} /> 19.23K</p>
            <p><FontAwesomeIcon icon={faHeart} />19.23K</p>
          </div>

          <button
            type="submit"
            className={styles.downloadButton}
            onClick={handleDownload}
          >
            Download
          </button>

          <div className={styles.connectButtons}>
            <p><FontAwesomeIcon icon={faLayerGroup}/>Collection</p>
            <p> <FontAwesomeIcon icon={faHeart}/> Favorite</p>
            <p><FontAwesomeIcon icon={faShareSquare}/> Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;