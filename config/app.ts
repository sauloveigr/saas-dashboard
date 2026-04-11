/**
 * Application configuration
 * Central place for app-wide settings and constants
 */
export const appConfig = {
    name: 'Acme Inc',
    description: 'Modern Crypto Dashboard',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

    /**
     * API configuration (for future integration)
     */
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
        timeout: 30000, // 30 seconds
    },

    /**
     * Mock data configuration
     * Mock data is ONLY used as fallback when API fails
     * API is always tried first
     */
    mockData: {
        fallbackOnError: true,
        fallbackOnTimeout: true,
        timeoutMs: 15000,
        logFallbacks: process.env.NODE_ENV === 'development',
    },

    /**
     * Feature flags
     */
    features: {
        analytics: true,
        darkMode: false, // Coming soon
        notifications: true,
    },
} as const;
