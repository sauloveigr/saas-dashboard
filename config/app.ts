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
     * Feature flags
     */
    features: {
        analytics: true,
        darkMode: false, // Coming soon
        notifications: true,
    },
} as const;
