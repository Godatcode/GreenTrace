import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
  className?: string;
}

function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5,
  className = ''
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visible range
  const visibleRange = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(
      start + Math.ceil(containerHeight / itemHeight) + overscan,
      items.length
    );
    
    return {
      start: Math.max(0, start - overscan),
      end
    };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  // Calculate total height and transform
  const totalHeight = items.length * itemHeight;
  const transform = `translateY(${visibleRange.start * itemHeight}px)`;

  // Handle scroll
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Scroll to specific item
  const scrollToItem = useCallback((index: number) => {
    if (containerRef.current) {
      const scrollTop = index * itemHeight;
      containerRef.current.scrollTop = scrollTop;
    }
  }, [itemHeight]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end);
  }, [items, visibleRange.start, visibleRange.end]);

  // Performance optimization: memoize rendered items
  const renderedItems = useMemo(() => {
    return visibleItems.map((item, index) => {
      const actualIndex = visibleRange.start + index;
      return (
        <div
          key={actualIndex}
          style={{ height: itemHeight }}
          className="virtual-list-item"
        >
          {renderItem(item, actualIndex)}
        </div>
      );
    });
  }, [visibleItems, visibleRange.start, itemHeight, renderItem]);

  return (
    <div className={`virtual-list ${className}`}>
      <div
        ref={containerRef}
        className="virtual-list-container"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div
          className="virtual-list-content"
          style={{
            height: totalHeight,
            transform
          }}
        >
          {renderedItems}
        </div>
      </div>
      
      {/* Scroll to top button */}
      {scrollTop > 100 && (
        <button
          className="scroll-to-top-btn"
          onClick={scrollToTop}
          title="Scroll to top"
        >
          ↑
        </button>
      )}
      
      {/* Scroll position indicator */}
      <div className="scroll-indicator">
        {Math.round((scrollTop / (totalHeight - containerHeight)) * 100)}%
      </div>
    </div>
  );
}

export default VirtualList;
