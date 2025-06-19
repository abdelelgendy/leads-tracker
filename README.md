# Leads Tracker

A lightweight Chrome extension to effortlessly save, organize, and revisit your leads (URLs).

---

## 📋 Table of Contents

* [Features](#-features)
* [Demo](#-demo)
* [Installation](#-installation)
* [Configuration](#-configuration)
* [Usage](#-usage)
* [Tech Stack](#-tech-stack)
* [Contributing](#-contributing)
* [License](#-license)

---

## 🔥 Features

* **Instantly save URLs** from your browser.
* **Organize** leads in a simple, scrollable list with clickable links.
* **Delete all** saved leads with a double-click safeguard.
* **Real-time sync** using Firebase Realtime Database.
* **Responsive UI** that adapts to desktop dimensions.
* **Toast notifications** confirm actions (save/delete).

---

## 🎬 Demo

1. Click the extension icon in your browser toolbar.
2. Enter or paste a URL into the input field.
3. Click **SAVE INPUT** (or press Enter) to store the lead.
4. Double-click **DELETE ALL** to remove every saved lead.

---

## 🚀 Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/leads-tracker.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in top-right).
4. Click **Load unpacked** and select the project folder.
5. The **Leads Tracker** icon will appear in your toolbar.

---

## ⚙️ Configuration

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Realtime Database** and set rules to allow reads/writes:

   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
3. Copy your database URL and update `index.js`:

   ```js
   const firebaseConfig = {
     databaseURL: "https://YOUR-PROJECT.firebaseio.com/"
   }
   ```

---

## 💡 Usage

1. Click the extension icon.
2. Type or paste a URL into the input box.
3. Hit **SAVE INPUT** or press **Enter** to store.
4. View saved leads in the scrollable list below.
5. Double-click **DELETE ALL** to clear all entries.

---

## 🛠️ Tech Stack

* **Chrome Extension**: Manifest V3, vanilla HTML/CSS/JS
* **Realtime Sync**: Firebase Realtime Database
* **Styling**: CSS3 with Flexbox and gradients

---
