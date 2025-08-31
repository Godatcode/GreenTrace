import React, { useState, useEffect, useRef } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
  fallback?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMCAzMEg3MFY3MEgzMFYzMFoiIGZpbGw9IiNFNUU3RUIiLz4KPHN2ZyB4PSIzNSIgeT0iMzUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptLTIgMTVhMSAxIDAgMSAxIDAtMiAxIDEgMCAwIDEgMCAyem0yLTRhMSAxIDAgMCAxLTEtMVY5YTEgMSAwIDAgMSAyIDB2M2ExIDEgMCAwIDEtMSAxeiIgZmlsbD0iIzk5QTNBRiIvPgo8L3N2Zz4KPC9zdmc+',
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkY2QjZCIi8+CjxwYXRoIGQ9Ik01MCAyNUMyNy45MSAyNSA5IDQzLjkxIDkgNjZzMTguOTEgNDEgNDEgNDEgNDEtMTguOTEgNDEtNDFTNzIuMDkgMjUgNTAgMjV6bTAgNzVDMzMuMTUgMTAwIDIwIDg2Ljg1IDIwIDcwczEzLjE1LTMwIDMwLTMwIDMwIDEzLjE1IDMwIDMwLTEzLjE1IDMwLTMwIDMwem0wLTQ1Yy04LjI4IDAtMTUgNi43Mi0xNSAxNXM2LjcyIDE1IDE1IDE1IDE1LTYuNzIgMTUtMTUtNi43Mi0xNS0xNS0xNXoiIGZpbGw9IiNFNTM1MzUiLz4KPC9zdmc+',
  sizes = '100vw',
  priority = false,
  onLoad,
  onError
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      loadImage(src);
    }
  }, [src, priority]);

  const loadImage = (imageUrl: string) => {
    const img = new Image();
    img.onload = () => {
      setImageSrc(imageUrl);
      setIsLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      if (imageUrl !== fallback) {
        loadImage(fallback);
      } else {
        setHasError(true);
        onError?.();
      }
    };
    img.src = imageUrl;
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoaded && !hasError) {
        loadImage(src);
      }
    });
  };

  useEffect(() => {
    if (!priority && !isLoaded && !hasError) {
      const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [priority, isLoaded, hasError, src]);

  return (
    <div 
      ref={imgRef}
      className={`optimized-image ${className} ${isLoaded ? 'loaded' : ''} ${hasError ? 'error' : ''}`}
      style={{ width, height }}
    >
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className="image-element"
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      
      {!isLoaded && !hasError && (
        <div className="image-placeholder">
          <div className="placeholder-spinner"></div>
        </div>
      )}
      
      {hasError && (
        <div className="image-error">
          <span>⚠️</span>
          <p>Failed to load image</p>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
