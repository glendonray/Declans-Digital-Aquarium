/**
 * Service Worker for Declan's Digital Aquarium
 * Handles caching for offline support
 */

const CACHE_NAME = "aquarium-v2";

// Core assets to precache
const PRECACHE_ASSETS = ["./", "./index.html", "./css/main.css", "./src/js/main.js", "./manifest.json", "./assets/icons/icon-192.svg", "./assets/icons/icon-512.svg", "./api/index.json"];

// Install event - precache core assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Precaching core assets");
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log("[SW] Deleting old cache:", name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        // Claim all clients immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - network first with cache fallback for fish data
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET requests
  if (event.request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // Fish JSON files - network first, cache fallback
  if (url.pathname.includes("/api/fish/") && url.pathname.endsWith(".json")) {
    event.respondWith(networkFirstWithCache(event.request));
    return;
  }

  // Core assets - cache first, network fallback
  event.respondWith(cacheFirstWithNetwork(event.request));
});

/**
 * Network first strategy with cache fallback
 * Good for data that might update (fish JSON)
 */
async function networkFirstWithCache(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const networkResponse = await fetch(request);
    // Cache the fresh response
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log("[SW] Serving from cache:", request.url);
      return cachedResponse;
    }
    // No cache either, return error response
    return new Response("Offline - resource not cached", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

/**
 * Cache first strategy with network fallback
 * Good for static assets that rarely change
 */
async function cacheFirstWithNetwork(request) {
  const cache = await caches.open(CACHE_NAME);

  // Try cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Not in cache, fetch from network
  try {
    const networkResponse = await fetch(request);
    // Cache the response for future use
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Network failed, no cache available
    console.log("[SW] Network failed, no cache for:", request.url);
    return new Response("Offline - resource not available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}
