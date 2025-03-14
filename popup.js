document.addEventListener('DOMContentLoaded', function() {
    const newSiteInput = document.getElementById('newSiteInput');
    const addSiteButton = document.getElementById('addSiteButton');
    const sitesList = document.getElementById('sitesList');

    // Load and display current restricted sites
    function loadRestrictedSites() {
        chrome.storage.local.get(['restrictedSites'], function(result) {
            const sites = result.restrictedSites || [];
            displayRestrictedSites(sites);
        });
    }

    // Display the restricted sites in the popup
    function displayRestrictedSites(sites) {
        sitesList.innerHTML = '';
        sites.forEach(site => {
            const li = document.createElement('li');
            const siteText = document.createElement('span');
            siteText.textContent = site;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.className = 'remove';
            removeButton.onclick = () => removeSite(site);
            
            li.appendChild(siteText);
            li.appendChild(removeButton);
            sitesList.appendChild(li);
        });
    }

    // Add a new site to the restricted list
    async function addSite(newSite) {
        try {
            // Format the site pattern
            let sitePattern = newSite.trim();
            if (!sitePattern.startsWith('^https?://')) {
                sitePattern = `^https?://(?:www\\.)?${sitePattern}.*`;
            }

            const result = await chrome.storage.local.get(['restrictedSites']);
            const sites = result.restrictedSites || [];
            
            if (!sites.includes(sitePattern)) {
                sites.push(sitePattern);
                await saveRestrictedSites(sites);
                loadRestrictedSites();
                newSiteInput.value = '';
            }
        } catch (error) {
            console.error('Error adding site:', error);
        }
    }

    // Remove a site from the restricted list
    async function removeSite(siteToRemove) {
        try {
            const result = await chrome.storage.local.get(['restrictedSites']);
            const sites = result.restrictedSites || [];
            
            const updatedSites = sites.filter(site => site !== siteToRemove);
            await saveRestrictedSites(updatedSites);
            loadRestrictedSites();
        } catch (error) {
            console.error('Error removing site:', error);
        }
    }

    // Save updated restricted sites and notify background script
    async function saveRestrictedSites(sites) {
        try {
            await chrome.storage.local.set({ restrictedSites: sites });
            chrome.runtime.sendMessage({ action: 'updateRestrictedSites', sites: sites });
        } catch (error) {
            console.error('Error saving restricted sites:', error);
        }
    }

    // Event listeners
    addSiteButton.addEventListener('click', () => {
        const newSite = newSiteInput.value.trim();
        if (newSite) {
            addSite(newSite);
        }
    });

    newSiteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newSite = newSiteInput.value.trim();
            if (newSite) {
                addSite(newSite);
            }
        }
    });

    // Load sites when popup opens
    loadRestrictedSites();
});
  