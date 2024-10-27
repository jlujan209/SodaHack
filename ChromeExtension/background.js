let isPrompting = false; 
let originalUrl = null; 

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
        chrome.storage.local.get(['enabled'], async (result) => {
            const enabled = result.enabled;

            if (enabled && !isPrompting) {
                const riskScore = await checkWebsiteRisk(changeInfo.url);

                if (riskScore !== null && riskScore > 50) {
                    isPrompting = true;  
                    originalUrl = changeInfo.url; 

                    try {
                        chrome.windows.create({
                            url: 'confirm.html',
                            type: 'popup',
                            width: 400,
                            height: 300
                        });
                    } catch (error) {
                        console.error('Error updating tab or handling prompt:', error);
                        isPrompting = false; 
                    }
                }
            }
        });
    }
});
