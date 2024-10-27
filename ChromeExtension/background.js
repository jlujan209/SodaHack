async function checkWebsiteRisk(url) {
    try {
        const response = await fetch('http://localhost:8080/checkURL?URL=' + encodeURIComponent(url));
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.risk_score;
    } catch (error) {
        console.error('Error fetching risk score:', error);
        return null;
    }
}

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.status === 'loading' && changeInfo.url) {
        chrome.storage.local.get(['enabled', 'shownUrls', 'popupOpen'], async (result) => {
            const enabled = result.enabled;
            const shownUrls = result.shownUrls || {};
            const popupOpen = result.popupOpen || false;

            if (enabled && !shownUrls[changeInfo.url] && !popupOpen) {
                const riskScore = await checkWebsiteRisk(changeInfo.url);

                if (riskScore !== null && riskScore > 50) {
                    try {
                        chrome.storage.local.set({ popupOpen: true });

                        chrome.windows.create({
                            url: 'confirm.html',
                            type: 'popup',
                            width: 400,
                            height: 300
                        });

                        shownUrls[changeInfo.url] = true;
                        chrome.storage.local.set({ shownUrls });
                        setTimeout(() => {
                            chrome.storage.local.set({ popupOpen: false });
                        }, 500); 
                    } catch (error) {
                        console.error('Error creating popup:', error);
                        chrome.storage.local.set({ popupOpen: false });
                    }
                }
            }
        });
    }
});

chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.set({ shownUrls: {}, popupOpen: false });
});
