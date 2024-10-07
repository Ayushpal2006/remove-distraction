document.getElementById('toggle-home-feed').addEventListener('change', (event) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: toggleHomeFeed,
            args: [event.target.checked]
        });
    });
});

document.getElementById('toggle-recommended').addEventListener('change', (event) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: toggleRecommended,
            args: [event.target.checked]
        });
    });
});

// Function to toggle the home feed
function toggleHomeFeed(isChecked) {
    const homeFeed = document.querySelector('#contents.ytd-rich-grid-renderer');
    if (homeFeed) {
        if (isChecked) {
            homeFeed.style.display = 'none';  // Hides the home feed
            console.log('Home feed hidden');
        } else {
            homeFeed.style.display = '';  // Restores to default display (grid layout)
            console.log('Home feed shown in default layout');
        }
    }
}

// Function to toggle recommended videos
function toggleRecommended(isChecked) {
    const recommended = document.querySelectorAll('#secondary, ytd-compact-video-renderer');
    if (recommended.length) {
        recommended.forEach(item => item.style.display = isChecked ? 'none' : 'block');
        console.log('Recommended videos toggled:', isChecked);
    }
}
