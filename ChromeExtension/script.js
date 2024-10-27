const button = document.getElementById('enabledButton');
const state = document.getElementById('Status');

let enabled;

chrome.storage.local.get(['enabled'], function(result) {
    enabled = result.enabled === true; 
    button.innerHTML = enabled ? "Stop Safe Browsing" : "Start Safe Browsing";
    state.innerHTML = enabled ? "Enabled" : "Disabled";
});

button.onclick = () => {
    enabled = !enabled;
    button.innerHTML = enabled ? "Stop Safe Browsing" : "Start Safe Browsing";
    state.innerHTML = enabled ? "Enabled" : "Disabled";
    chrome.storage.local.set({ enabled: enabled }, function() {
        console.log('Enabled set to:', enabled);
    });
};
