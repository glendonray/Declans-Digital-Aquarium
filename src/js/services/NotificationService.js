/**
 * NotificationService
 * Handles browser notification permission and display
 */

const PERMISSION_ASKED_KEY = "aquarium_notificationAsked";

/**
 * Check if notifications are supported
 * @returns {boolean} True if Notification API is available
 */
export function isSupported() {
  return "Notification" in window;
}

/**
 * Get current notification permission status
 * @returns {string} 'granted', 'denied', or 'default'
 */
export function getPermission() {
  if (!isSupported()) return "denied";
  return Notification.permission;
}

/**
 * Check if permission has already been asked
 * @returns {boolean} True if we've already asked
 */
export function hasAskedPermission() {
  return localStorage.getItem(PERMISSION_ASKED_KEY) === "true";
}

/**
 * Request notification permission
 * @returns {Promise<string>} Permission result: 'granted', 'denied', or 'default'
 */
export async function requestPermission() {
  if (!isSupported()) {
    return "denied";
  }

  // Mark that we've asked
  localStorage.setItem(PERMISSION_ASKED_KEY, "true");

  try {
    const result = await Notification.requestPermission();
    return result;
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return "denied";
  }
}

/**
 * Show a notification
 * @param {string} title - Notification title
 * @param {Object} options - Notification options (body, icon, tag, etc.)
 * @returns {Notification|null} The notification instance or null if not permitted
 */
export function showNotification(title, options = {}) {
  if (!isSupported() || getPermission() !== "granted") {
    return null;
  }

  const defaultOptions = {
    icon: "/assets/icons/icon-192.svg",
    badge: "/assets/icons/icon-192.svg",
    tag: "aquarium-notification",
    renotify: true,
    ...options,
  };

  try {
    return new Notification(title, defaultOptions);
  } catch (error) {
    console.error("Error showing notification:", error);
    return null;
  }
}

/**
 * Show the "new fish today" notification
 */
export function showNewFishNotification() {
  return showNotification("New Fish Today!", {
    body: "8 new fish are swimming in Declan's Aquarium. Come say hi!",
    tag: "new-fish-daily",
  });
}

/**
 * Clear the "asked permission" flag (for testing)
 */
export function clearPermissionHistory() {
  localStorage.removeItem(PERMISSION_ASKED_KEY);
}
