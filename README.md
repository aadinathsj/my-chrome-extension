#Website Restrictor Chrome Extension
Website Restrictor is a Chrome extension that notifies users when they visit restricted websites. Users can manage the list of restricted sites through the extension's popup interface.

Features
Notifies users when they visit a restricted website.
Allows users to remove sites from the restricted list via the extension popup.
Automatically reloads the extension to apply changes.
Installation
Clone the Repository:

Copy
git clone https://github.com/yourusername/website-restrictor.git
cd website-restrictor
Load the Extension in Chrome:

Open Chrome and navigate to chrome://extensions/.
Enable "Developer mode" using the toggle in the top right.
Click "Load unpacked" and select the website-restrictor directory.
Usage
Access the Popup:

Click on the Website Restrictor icon in the Chrome toolbar to open the popup.
Remove a Restricted Site:

Enter the URL of the site you want to remove from the restricted list.
Click the "Remove Site" button.
The extension will automatically reload to apply the changes.
View Restricted Sites:

The popup displays a list of currently restricted sites.
File Structure
manifest.json: Chrome extension manifest file.
background.js: Background script to monitor tab updates and check against restricted sites.
popup.html: HTML structure for the extension popup.
popup.js: JavaScript to handle popup interactions and update restricted sites.
styles.css: CSS for styling the popup.
icons/: Directory containing icon images for the extension.
restricted_sites.json: JSON file containing the list of restricted sites.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit them (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Create a new Pull Request.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
If you have any questions or suggestions, feel free to open an issue or contact the maintainers directly.

