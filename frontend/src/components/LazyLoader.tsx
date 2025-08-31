import React, { useState, useEffect, useRef } from 'react';

interface LazyLoaderProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  placeholder?: React.ReactNode;
  className?: string;
}

const LazyLoader: React.FC<LazyLoaderProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '50px',
  placeholder,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      // Simulate loading delay for smooth transition
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const defaultPlaceholder = (
    <div className="lazy-placeholder">
      <div className="lazy-skeleton">
        <div className="skeleton-line skeleton-title"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-text"></div>
        <div className="skeleton-line skeleton-text-short"></div>
      </div>
    </div>
  );

  return (
    <div ref={ref} className={`lazy-loader ${className}`}>
      {!isLoaded ? (
        placeholder || defaultPlaceholder
      ) : (
        <div className={`lazy-content ${isLoaded ? 'fade-in' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default LazyLoader;
