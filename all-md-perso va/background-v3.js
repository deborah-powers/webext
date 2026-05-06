chrome.runtime.onMessage.addListener (function (data, sender, sendResponse){
	console.log ('sender', sender);
	console.log ('chrome', chrome);
	console.log ('tabs', chrome.tabs);
	console.log ('scripting', chrome.scripting);
	console.log ('data', data);
	chrome.scripting.executeScript ({
		target: { tabId: sender.tab.id, allFrames: false },
		files: data.scripts
});});