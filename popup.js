document.addEventListener('DOMContentLoaded', function() {
    console.log('Popup script loaded and running');
  
    // Example: Display a message in the popup
    const messageElement = document.createElement('p');
    messageElement.textContent = 'Your extension is active!';
    document.body.appendChild(messageElement);
  
    // Example: Add a button to the popup
    const button = document.createElement('button');
    button.textContent = 'Check Restricted Sites';
    document.body.appendChild(button);
  
    // Example: Add an event listener to the button
    button.addEventListener('click', function() {
      fetch(chrome.runtime.getURL('restricted_sites.json'))
        .then(response => response.json())
        .then(restrictedSites => {
          console.log('Restricted Sites:', restrictedSites);
          alert('Restricted sites have been checked!');
        })
        .catch(error => {
          console.error('Error fetching restricted sites:', error);
        });
    });
  });
  