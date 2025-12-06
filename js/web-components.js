import "/js/components/site-header.js";
import "/js/components/site-footer.js";
import "/js/components/theme-picker.js";

// Register service worker here since all pages use this file
navigator.serviceWorker?.register('/sw.js');