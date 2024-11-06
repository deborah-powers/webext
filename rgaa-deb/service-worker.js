chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: ['del-style.js']
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: true},
			files: ['style.css']
});}});