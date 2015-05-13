chrome.browserAction.onClicked.addListener(function() {
    chrome.windows.create({
        url: chrome.extension.getURL('main.html'),
        type: 'popup',
        focused: true,
        height: 520,
        width: 400,
    });
});

