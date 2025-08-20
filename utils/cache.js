import redisClient from '../config/redis.js';

// Cache utility functions
export const cache = {
    // Set cache with expiration
    async set(key, value, expireTime = 3600) {
        try {
            if (!redisClient.status === 'ready') {
                return;
            }
            const serializedValue = JSON.stringify(value);
            await redisClient.setex(key, expireTime, serializedValue);
            console.log(`✅ Cached: ${key}`);
        } catch (error) {
            console.log(`⚠️ Cache not available for ${key}`);
        }
    },

    // Get cache
    async get(key) {
        try {
            if (!redisClient.status === 'ready') {
                return null;
            }
            const value = await redisClient.get(key);
            if (value) {
                console.log(`✅ Cache hit: ${key}`);
                return JSON.parse(value);
            }
            console.log(` Cache miss: ${key}`);
            return null;
        } catch (error) {
            console.log(`⚠️ Cache not available for ${key}`);
            return null;
        }
    },

    // Delete cache
    async del(key) {
        try {
            if (!redisClient.status === 'ready') {
                return;
            }
            await redisClient.del(key);
            console.log(`🗑️ Cache deleted: ${key}`);
        } catch (error) {
            console.log(`⚠️ Cache not available for ${key}`);
        }
    },

    // Clear all cache
    async clear() {
        try {
            if (!redisClient.status === 'ready') {
                return;
            }
            await redisClient.flushall();
            console.log('🗑️ All cache cleared');
        } catch (error) {
            console.log('⚠️ Cache not available');
        }
    }
};

// Cache middleware for routes
export const cacheMiddleware = (duration = 3600) => {
    return async (req, res, next) => {
        if (req.method !== 'GET') {
            return next();
        }

        const key = `cache:${req.originalUrl}`;
        
        try {
            const cachedData = await cache.get(key);
            if (cachedData) {
                return res.json(cachedData);
            }

            // Store original send method
            const originalSend = res.json;
            
            // Override send method to cache response
            res.json = function(data) {
                cache.set(key, data, duration);
                return originalSend.call(this, data);
            };

            next();
        } catch (error) {
            console.log('⚠️ Cache middleware not available');
            next();
        }
    };
};

// Cache keys for different entities
export const CACHE_KEYS = {
    EVENTS: 'events',
    EVENT: (id) => `event:${id}`,
    USER_EVENTS: (userId) => `user_events:${userId}`,
    BOOKINGS: (userId) => `bookings:${userId}`,
    BOOKING: (id) => `booking:${id}`
};
