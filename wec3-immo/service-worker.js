function cleanPage (tabId){
	chrome.scripting.executeScript ({
		target: {tabId: tabId, allFrames: true },
		files: [ 'cleanLib.js', 'carousel.js', 'cleanAction.js' ]
	});
	chrome.scripting.insertCSS ({
		target: {tabId: tabId, allFrames: true},
		files: ['structure.css', 'perso.css'],
	});
}
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')) cleanPage (tab.id);
});