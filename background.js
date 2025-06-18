// background.js -- optional background script for auto-saving features
chrome.runtime.onInstalled.addListener(() => {
    console.log('Leads Tracker installed and ready.');
});

// Example: auto-save leads every hour
chrome.alarms.create('autoSaveLeads', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'autoSaveLeads') {
        chrome.storage.local.get('myLeads', (data) => {
            console.log('Auto-saving leads:', data.myLeads);
            // Here you could sync to a server or external storage
        });
    }
});

//^ for future use, if you want to implement auto-saving or syncing features