import { useState, useEffect, useCallback, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  loadTime: number;
  networkLatency: number;
}

interface PerformanceOptions {
  fpsInterval?: number;
  memoryInterval?: number;
  enableLogging?: boolean;
}

const usePerformance = (options: PerformanceOptions = {}) => {
  const {
    fpsInterval = 1000,
    memoryInterval = 5000,
    enableLogging = false
  } = options;

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    memoryUsage: 0,
    renderTime: 0,
    loadTime: 0,
    networkLatency: 0
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const animationFrameId = useRef<number | undefined>(undefined);
  const memoryIntervalId = useRef<NodeJS.Timeout | undefined>(undefined);

  // FPS calculation
  const calculateFPS = useCallback(() => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime.current;
    
    if (deltaTime >= fpsInterval) {
      const fps = Math.round((frameCount.current * 1000) / deltaTime);
      setMetrics(prev => ({ ...prev, fps }));
      
      frameCount.current = 0;
      lastTime.current = currentTime;
      
      if (enableLogging) {
        console.log(`FPS: ${fps}`);
      }
    }
    
    frameCount.current++;
    animationFrameId.current = requestAnimationFrame(calculateFPS);
  }, [fpsInterval, enableLogging]);

  // Memory usage monitoring
  const checkMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = Math.round(memory.usedJSHeapSize / 1024 / 1024); // MB
      
      setMetrics(prev => ({ ...prev, memoryUsage }));
      
      if (enableLogging) {
        console.log(`Memory Usage: ${memoryUsage}MB`);
      }
    }
  }, [enableLogging]);

  // Render time measurement
  const measureRenderTime = useCallback((callback: () => void) => {
    const startTime = performance.now();
    callback();
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    setMetrics(prev => ({ ...prev, renderTime }));
    
    if (enableLogging) {
      console.log(`Render Time: ${renderTime.toFixed(2)}ms`);
    }
    
    return renderTime;
  }, [enableLogging]);

  // Load time measurement
  const measureLoadTime = useCallback((asyncOperation: () => Promise<any>) => {
    const startTime = performance.now();
    
    return asyncOperation().finally(() => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      setMetrics(prev => ({ ...prev, loadTime }));
      
      if (enableLogging) {
        console.log(`Load Time: ${loadTime.toFixed(2)}ms`);
      }
    });
  }, [enableLogging]);

  // Network latency measurement
  const measureNetworkLatency = useCallback(async (url: string) => {
    const startTime = performance.now();
    
    try {
      await fetch(url, { method: 'HEAD' });
      const endTime = performance.now();
      const networkLatency = endTime - startTime;
      
      setMetrics(prev => ({ ...prev, networkLatency }));
      
      if (enableLogging) {
        console.log(`Network Latency: ${networkLatency.toFixed(2)}ms`);
      }
      
      return networkLatency;
    } catch (error) {
      console.error('Failed to measure network latency:', error);
      return 0;
    }
  }, [enableLogging]);

  // Performance warning system
  const getPerformanceWarnings = useCallback(() => {
    const warnings: string[] = [];
    
    if (metrics.fps < 30) {
      warnings.push('Low FPS detected. Consider optimizing animations or reducing complexity.');
    }
    
    if (metrics.memoryUsage > 100) {
      warnings.push('High memory usage detected. Check for memory leaks.');
    }
    
    if (metrics.renderTime > 16) {
      warnings.push('Slow render time detected. Consider optimizing component rendering.');
    }
    
    if (metrics.loadTime > 1000) {
      warnings.push('Slow load time detected. Consider optimizing data fetching.');
    }
    
    if (metrics.networkLatency > 200) {
      warnings.push('High network latency detected. Check network connection.');
    }
    
    return warnings;
  }, [metrics]);

  // Performance score calculation
  const getPerformanceScore = useCallback(() => {
    let score = 100;
    
    // FPS penalty
    if (metrics.fps < 60) score -= 20;
    if (metrics.fps < 30) score -= 30;
    
    // Memory penalty
    if (metrics.memoryUsage > 50) score -= 15;
    if (metrics.memoryUsage > 100) score -= 25;
    
    // Render time penalty
    if (metrics.renderTime > 16) score -= 15;
    if (metrics.renderTime > 32) score -= 25;
    
    // Load time penalty
    if (metrics.loadTime > 500) score -= 10;
    if (metrics.loadTime > 1000) score -= 20;
    
    return Math.max(0, score);
  }, [metrics]);

  // Start monitoring
  useEffect(() => {
    calculateFPS();
    checkMemoryUsage();
    
    memoryIntervalId.current = setInterval(checkMemoryUsage, memoryInterval);
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (memoryIntervalId.current) {
        clearInterval(memoryIntervalId.current);
      }
    };
  }, [calculateFPS, checkMemoryUsage, memoryInterval]);

  return {
    metrics,
    measureRenderTime,
    measureLoadTime,
    measureNetworkLatency,
    getPerformanceWarnings,
    getPerformanceScore
  };
};

export default usePerformance;
