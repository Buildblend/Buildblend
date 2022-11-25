const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("ServiceWorker.js", {
        scope: "",
      });
      if (registration.installing) {
        console.log("Service Worker is being installed.");
      } else if (registration.waiting) {
        console.log("Service Worker has been installed, waiting for activation.");
      } else if (registration.active) {
        console.log("Service Worker is active!");
      }
    } catch (error) {
      console.error(`Registration of Service Worker failed: ${error}`);
    }
  }
};

registerServiceWorker();

const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v2");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/"
    ])
  );
});