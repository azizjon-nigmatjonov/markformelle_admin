
// Performance monitoring utility
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private slowOperations: Map<string, number> = new Map();
  private readonly SLOW_THRESHOLD = 100; // 100ms threshold

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  // Monitor function execution time
  static async measureAsync<T>(
    name: string,
    fn: () => Promise<T>
  ): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      
      if (duration > PerformanceMonitor.getInstance().SLOW_THRESHOLD) {
        console.warn(`[Performance] Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
        PerformanceMonitor.getInstance().slowOperations.set(name, duration);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`[Performance] Error in ${name} after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  }

  // Monitor synchronous function execution time
  static measureSync<T>(name: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      
      if (duration > PerformanceMonitor.getInstance().SLOW_THRESHOLD) {
        console.warn(`[Performance] Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
        PerformanceMonitor.getInstance().slowOperations.set(name, duration);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`[Performance] Error in ${name} after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  }

  // Debounce function to prevent excessive calls
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): T & { cancel: () => void } {
    let timeout: NodeJS.Timeout;
    
    const debounced = ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T & { cancel: () => void };
    
    debounced.cancel = () => {
      clearTimeout(timeout);
    };
    
    return debounced;
  }

  // Throttle function to limit execution frequency
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): T {
    let inThrottle: boolean;
    
    return ((...args: any[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  }

  // Batch DOM updates to prevent forced reflows
  static batchDOMUpdates(updates: (() => void)[]): void {
    requestAnimationFrame(() => {
      updates.forEach(update => {
        try {
          update();
        } catch (error) {
          console.error('[Performance] Error in DOM update:', error);
        }
      });
    });
  }

  // Get performance report
  static getReport(): { slowOperations: [string, number][]; averageTime: number } {
    const instance = this.getInstance();
    const operations = Array.from(instance.slowOperations.entries());
    const averageTime = operations.reduce((sum, [, time]) => sum + time, 0) / operations.length;
    
    return {
      slowOperations: operations.sort(([, a], [, b]) => b - a),
      averageTime: averageTime || 0
    };
  }

  // Clear performance data
  static clear(): void {
    this.getInstance().slowOperations.clear();
  }
}

// Convenience functions
export const measureAsync = PerformanceMonitor.measureAsync;
export const measureSync = PerformanceMonitor.measureSync;
export const debounce = PerformanceMonitor.debounce;
export const throttle = PerformanceMonitor.throttle;
export const batchDOMUpdates = PerformanceMonitor.batchDOMUpdates; 