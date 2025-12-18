/**
 * PWAService
 * Handles Service Worker registration and install prompt
 */

const INSTALL_DISMISSED_KEY = "aquarium_installDismissed";

let deferredPrompt = null;
let installBanner = null;
let installBtn = null;
let dismissBtn = null;

/**
 * Initialize the PWA service
 * - Registers service worker
 * - Sets up install prompt handling
 */
export function init() {
  registerServiceWorker();
  setupInstallPrompt();
}

/**
 * Register the service worker
 */
async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.log("Service Worker not supported");
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    console.log("Service Worker registered:", registration.scope);

    // Listen for updates
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
          console.log("New content available, refresh to update");
        }
      });
    });
  } catch (error) {
    console.error("Service Worker registration failed:", error);
  }
}

/**
 * Set up the install prompt handling
 */
function setupInstallPrompt() {
  // Get DOM elements
  installBanner = document.getElementById("install-banner");
  installBtn = document.getElementById("install-btn");
  dismissBtn = document.getElementById("install-dismiss");

  if (!installBanner) {
    console.log("Install banner not found in DOM");
    return;
  }

  // Listen for the beforeinstallprompt event
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent the mini-infobar from appearing
    e.preventDefault();
    // Store the event for later use
    deferredPrompt = e;
    // Show our custom install banner (if not previously dismissed)
    showInstallBanner();
  });

  // Handle install button click
  if (installBtn) {
    installBtn.addEventListener("click", handleInstallClick);
  }

  // Handle dismiss button click
  if (dismissBtn) {
    dismissBtn.addEventListener("click", dismissInstallBanner);
  }

  // Listen for successful install
  window.addEventListener("appinstalled", () => {
    console.log("App installed successfully");
    hideInstallBanner();
    deferredPrompt = null;
  });
}

/**
 * Show the install banner if not dismissed
 */
function showInstallBanner() {
  if (!installBanner) return;

  // Check if user previously dismissed
  if (localStorage.getItem(INSTALL_DISMISSED_KEY) === "true") {
    return;
  }

  installBanner.hidden = false;
  installBanner.classList.add("install-banner--visible");
}

/**
 * Hide the install banner
 */
function hideInstallBanner() {
  if (!installBanner) return;
  installBanner.hidden = true;
  installBanner.classList.remove("install-banner--visible");
}

/**
 * Dismiss the install banner and remember preference
 */
function dismissInstallBanner() {
  localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
  hideInstallBanner();
}

/**
 * Handle install button click
 */
async function handleInstallClick() {
  if (!deferredPrompt) {
    console.log("No install prompt available");
    return;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user's response
  const { outcome } = await deferredPrompt.userChoice;
  console.log("Install prompt outcome:", outcome);

  // Clear the deferred prompt
  deferredPrompt = null;
  hideInstallBanner();
}

/**
 * Check if the app is installed (standalone mode)
 * @returns {boolean} True if running as installed PWA
 */
export function isInstalled() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

/**
 * Clear install dismissed preference (for testing)
 */
export function clearInstallPreference() {
  localStorage.removeItem(INSTALL_DISMISSED_KEY);
}
