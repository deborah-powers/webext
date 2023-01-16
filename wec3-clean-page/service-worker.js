function cleanPage (tabId){
	chrome.scripting.executeScript ({
		target: {tabId: tabId, allFrames: true },
		files: [ 'cleanLib.js', 'cleanPage.js' ]
	});
	chrome.scripting.insertCSS ({
		target: {tabId: tabId, allFrames: true},
		files: ['structure.css', 'perso.css'],
	});
}
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')) cleanPage (tab.id);
});
chrome.runtime.onConnectExternal.addListener(
	function (port){
		port.onMessage.addListener (function (tabId){ cleanPage (tabId) });
});