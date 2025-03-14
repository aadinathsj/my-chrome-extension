console.log('Background script loaded and running');

let restrictedSites = [];

// Initialize restricted sites from storage or file
async function initializeRestrictedSites() {
  try {
    // First try to get from storage
    const storage = await chrome.storage.local.get(['restrictedSites']);
    if (storage.restrictedSites) {
      restrictedSites = storage.restrictedSites;
    } else {
      // If not in storage, load from file
      const response = await fetch(chrome.runtime.getURL('restricted_sites.json'));
      const data = await response.json();
      restrictedSites = data.sites;
      // Save to storage
      await chrome.storage.local.set({ restrictedSites: data.sites });
    }
    console.log('Initialized restricted sites:', restrictedSites);
  } catch (error) {
    console.error('Error initializing restricted sites:', error);
  }
}

// Function to check if a URL matches any restricted patterns
async function checkRestrictedUrl(url) {
  try {
    return restrictedSites.some(pattern => {
      try {
        const regex = new RegExp(pattern, 'i');
        const matches = regex.test(url);
        console.log(`Testing "${url}" against pattern "${pattern}": ${matches}`);
        return matches;
      } catch (e) {
        console.error(`Invalid regex pattern: ${pattern}`, e);
        return false;
      }
    });
  } catch (error) {
    console.error('Error checking restricted URL:', error);
    return false;
  }
}

// Function to show notification
function showNotification(url) {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icons/icon48.png',
    title: 'Restricted Website Detected',
    message: `Access to ${url} is restricted!`,
    priority: 2,
    requireInteraction: true
  }, (notificationId) => {
    if (chrome.runtime.lastError) {
      console.error('Notification error:', chrome.runtime.lastError);
    } else {
      console.log('Notification created:', notificationId);
    }
  });
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateRestrictedSites') {
    restrictedSites = message.sites;
    console.log('Updated restricted sites:', restrictedSites);
  }
});

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && /^https?:\/\//.test(tab.url)) {
    console.log('Checking URL:', tab.url);
    
    const isRestricted = await checkRestrictedUrl(tab.url);
    if (isRestricted) {
      console.log('Restricted site detected:', tab.url);
      showNotification(tab.url);
    } else {
      console.log('Site not restricted:', tab.url);
    }
  }
});

// Listen for tab activation (when user switches tabs)
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab.url && /^https?:\/\//.test(tab.url)) {
      console.log('Tab activated, checking URL:', tab.url);
      const isRestricted = await checkRestrictedUrl(tab.url);
      if (isRestricted) {
        console.log('Restricted site detected on tab activation:', tab.url);
        showNotification(tab.url);
      }
    }
  } catch (error) {
    console.error('Error handling tab activation:', error);
  }
});

// Initialize the restricted sites when the background script loads
initializeRestrictedSites();
