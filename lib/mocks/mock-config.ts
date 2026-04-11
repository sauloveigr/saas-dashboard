import { appConfig } from "@/config/app";

/**
 * Mock data configuration
 * Mock data is ONLY used as fallback when API fails
 * API is always tried first
 */

export interface MockConfig {
  fallbackOnError: boolean;
  fallbackOnTimeout: boolean;
  timeoutMs: number;
  logFallbacks: boolean;
}

const defaultConfig: MockConfig = {
  fallbackOnError: appConfig.mockData.fallbackOnError,
  fallbackOnTimeout: appConfig.mockData.fallbackOnTimeout,
  timeoutMs: appConfig.mockData.timeoutMs,
  logFallbacks: appConfig.mockData.logFallbacks,
};

let currentConfig: MockConfig = { ...defaultConfig };

export function getMockConfig(): MockConfig {
  return { ...currentConfig };
}

export function updateMockConfig(config: Partial<MockConfig>): void {
  currentConfig = { ...currentConfig, ...config };
}

export function resetMockConfig(): void {
  currentConfig = { ...defaultConfig };
}

export function shouldFallbackOnError(): boolean {
  return currentConfig.fallbackOnError;
}

export function shouldFallbackOnTimeout(): boolean {
  return currentConfig.fallbackOnTimeout;
}

export function getTimeoutMs(): number {
  return currentConfig.timeoutMs;
}

export function logMockFallback(message: string, error?: unknown): void {
  if (currentConfig.logFallbacks) {
    console.warn(`[Mock Fallback] ${message}`, error || "");
  }
}
