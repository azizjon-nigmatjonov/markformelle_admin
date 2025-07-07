// Hot reload optimization utilities
export const HotReloadOptimization = {
  // Disable console.logs during development to reduce hot reload overhead
  disableConsoleLogs: () => {
    if (process.env.NODE_ENV === 'development') {
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        // Only log if it's not a performance-critical component
        if (!args[0]?.includes?.('currentPaint')) {
          originalLog(...args);
        }
      };
    }
  },

  // Memoize expensive computations to prevent unnecessary re-renders
  memoizeExpensive: <T,>(fn: () => T, deps: any[]): T => {
    // This is a simplified version - use React.useMemo in components
    return fn();
  },

  // Debounce hot reload triggers
  debounceHotReload: (fn: Function, delay: number = 100) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }
};

// Performance monitoring for hot reloads
export const HotReloadMonitor = {
  startTime: 0,
  
  start: () => {
    HotReloadMonitor.startTime = performance.now();
  },
  
  end: () => {
    const duration = performance.now() - HotReloadMonitor.startTime;
    if (duration > 50) {
      console.warn(`[Hot Reload] Slow reload detected: ${duration.toFixed(2)}ms`);
    }
  }
};

// Auto-disable console.logs in development
if (process.env.NODE_ENV === 'development') {
  HotReloadOptimization.disableConsoleLogs();
} 