import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../App.module.css';
import { Photo } from '../types/pexels';

interface DownloadPageParams {
  imageId: string;
  [key: string]: string | undefined;
}


const PEXELS_API_KEY = process.env.REACT_APP_PEXELS_API_KEY;

const DownloadPage: React.FC = () => {
  const { imageId } = useParams<DownloadPageParams>();
  const [imageData, setImageData] = useState<Photo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      if (!imageId) {
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
        const response = await fetch(`https://api.pexels.com/v1/photos/${imageId}`, {
          headers: {
            Authorization: PEXELS_API_KEY, 
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Image with ID ${imageId} not found.`);
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
  }, [imageId]);

  const handleDownload = async () => {
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
        <h2 className={styles.loading}>Loading image details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.downloadPage} >
        <h2 >Error: {error}</h2>
        <p>Please try navigating back or searching for another image.</p>
      </div>
    );
  }

  if (!imageData) {
    return (
      <div className={styles.downloadPage}>
        <h2>Image data not found.</h2>
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
              {/* This src is empty in your original code. You might need a dynamic src or a placeholder. */}
              <img src="" alt="creator avatar" className={styles.creatorAvatar} />
            </div>
            <div className={styles.creatorDetails}>
              <h2>{imageData.photographer}</h2>
              <p>43444+ Elements</p> {/* This is hardcoded, consider if it should be dynamic */}
            </div>
          </div>

          <div className={styles.contentSection}>
            <div className={styles.productInfo}>
              <h2> Image</h2>
              <p>Product ID: {imageData.id} <FontAwesomeIcon icon={['far', 'copy']} /></p>
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
            <p><FontAwesomeIcon icon={['far', 'eye']} />45.23K</p> {/* Hardcoded */}
            <p><FontAwesomeIcon icon={['fas', 'download']} /> 19.23K</p> {/* Hardcoded */}
            <p><FontAwesomeIcon icon={['far', 'heart']} />19.23K</p> {/* Hardcoded */}
          </div>

          <button
            type="submit"
            className={styles.downloadButton}
            onClick={handleDownload}
          >
            Download
          </button>

          <div className={styles.connectButtons}>
            <p><FontAwesomeIcon icon={['fas', 'layer-group']}/>Collection</p>
            <p> <FontAwesomeIcon icon={['far', 'heart']}/> Favorite</p>
            <p><FontAwesomeIcon icon={['far', 'share-square']}/> Share</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;