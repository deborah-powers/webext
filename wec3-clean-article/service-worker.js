function cleanPage (tabId){
	chrome.scripting.executeScript ({
		target: {tabId: tabId, allFrames: true },
		files: [ 'text-clean.js', 'text.js', 'page-clean.js', 'cleanAction.js' ]
	});
	chrome.scripting.insertCSS ({
		target: {tabId: tabId, allFrames: true},
		files: ['structure.css', 'perso.css']
	});
}
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://') && ! tab.url.includes ('//googleads.')) cleanPage (tab.id);
});