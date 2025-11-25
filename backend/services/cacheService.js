const redis = require('redis');

const CACHE_TTL = parseInt(process.env.CACHE_TTL) || 3600; // 1 hour default
const CACHE_MAX_SIZE = parseInt(process.env.CACHE_MAX_SIZE) || 1000;
const USE_REDIS = process.env.USE_REDIS === 'true';

class CacheService {
  constructor() {
    this.inMemoryCache = new Map();
    this.cacheKeys = [];
    this.redisClient = null;
    
    if (USE_REDIS) {
      this.initRedis();
    } else {
      console.log('📦 Using in-memory cache');
    }
  }

  /**
   * Initialize Redis client
   */
  async initRedis() {
    try {
      this.redisClient = redis.createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });

      this.redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
        console.log('📦 Falling back to in-memory cache');
        this.redisClient = null;
      });

      this.redisClient.on('connect', () => {
        console.log('✅ Redis connected successfully');
      });

      await this.redisClient.connect();
    } catch (error) {
      console.error('Failed to connect to Redis:', error.message);
      console.log('📦 Using in-memory cache');
      this.redisClient = null;
    }
  }

  /**
   * Get value from cache
   */
  async get(key) {
    try {
      if (this.redisClient && this.redisClient.isOpen) {
        const value = await this.redisClient.get(key);
        return value ? JSON.parse(value) : null;
      } else {
        return this.inMemoryCache.get(key) || null;
      }
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set value in cache
   */
  async set(key, value, ttl = CACHE_TTL) {
    try {
      if (this.redisClient && this.redisClient.isOpen) {
        await this.redisClient.setEx(key, ttl, JSON.stringify(value));
      } else {
        // In-memory cache with LRU eviction
        if (this.inMemoryCache.size >= CACHE_MAX_SIZE) {
          const firstKey = this.cacheKeys.shift();
          this.inMemoryCache.delete(firstKey);
        }
        
        this.inMemoryCache.set(key, value);
        this.cacheKeys.push(key);

        // Set TTL for in-memory cache
        setTimeout(() => {
          this.inMemoryCache.delete(key);
          const index = this.cacheKeys.indexOf(key);
          if (index > -1) {
            this.cacheKeys.splice(index, 1);
          }
        }, ttl * 1000);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  /**
   * Delete value from cache
   */
  async delete(key) {
    try {
      if (this.redisClient && this.redisClient.isOpen) {
        await this.redisClient.del(key);
      } else {
        this.inMemoryCache.delete(key);
        const index = this.cacheKeys.indexOf(key);
        if (index > -1) {
          this.cacheKeys.splice(index, 1);
        }
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  /**
   * Clear all cache
   */
  async clear() {
    try {
      if (this.redisClient && this.redisClient.isOpen) {
        await this.redisClient.flushAll();
      } else {
        this.inMemoryCache.clear();
        this.cacheKeys = [];
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      type: this.redisClient ? 'Redis' : 'In-Memory',
      size: this.inMemoryCache.size,
      maxSize: CACHE_MAX_SIZE,
      ttl: CACHE_TTL
    };
  }
}

// Export singleton instance
module.exports = new CacheService();
