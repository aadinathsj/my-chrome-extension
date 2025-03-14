
# Website Restrictor Chrome Extension

![Chrome Extension Icon](icons/icon128.png)

**Website Restrictor** is a Chrome extension that notifies users when they visit restricted websites. Users can manage the list of restricted sites through the extension's popup interface.

## ✨ **Features**

- 🔔 **Notifications**: Alerts users when they visit a restricted website.
- 🛠️ **Site Management**: Allows users to remove sites from the restricted list via the extension popup.
- 🔄 **Auto-Reload**: Automatically reloads the extension to apply changes.

## 🛠️ **Installation**

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/website-restrictor.git
   cd website-restrictor
   ```

2. **Load the Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" using the toggle in the top right.
   - Click "Load unpacked" and select the `website-restrictor` directory.

## 🎯 **Usage**

1. **Access the Popup**:
   - Click on the Website Restrictor icon in the Chrome toolbar to open the popup.

2. **Remove a Restricted Site**:
   - Enter the URL of the site you want to remove from the restricted list.
   - Click the "Remove Site" button.
   - The extension will automatically reload to apply the changes.

3. **View Restricted Sites**:
   - The popup displays a list of currently restricted sites.

## 📂 **File Structure**

- `manifest.json`: Chrome extension manifest file.
- `background.js`: Background script to monitor tab updates and check against restricted sites.
- `popup.html`: HTML structure for the extension popup.
- `popup.js`: JavaScript to handle popup interactions and update restricted sites.
- `styles.css`: CSS for styling the popup.
- `icons/`: Directory containing icon images for the extension.
- `restricted_sites.json`: JSON file containing the list of restricted sites.

## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## 📜 **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 📞 **Contact**

If you have any questions or suggestions, feel free to open an issue or contact the maintainers directly.
```
```
