console.log('Background script loaded and running');

// Function to check if a URL matches any restricted patterns
async function checkRestrictedUrl(url) {
  try {
    const response = await fetch(chrome.runtime.getURL('restricted_sites.json'));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const restrictedSites = await response.json();
    
    if (!Array.isArray(restrictedSites.sites)) {
      console.error('restricted_sites.json should contain an array under "sites" key');
      return false;
    }

    return restrictedSites.sites.some(pattern => {
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

// Listen for tab updates
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only check when the page has finished loading
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
