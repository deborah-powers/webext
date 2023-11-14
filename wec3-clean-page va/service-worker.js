function cleanPage (tabId){
	chrome.scripting.executeScript ({
		target: {tabId: tabId, allFrames: true },
		files: [ 'cleanLib.js', 'metas.js', 'cleanPage.js' ]
	});
	chrome.scripting.insertCSS ({
		target: {tabId: tabId, allFrames: true},
		files: ['structure.css', 'perso.css'],
	});
}
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')) cleanPage (tab.id);
});
function delIds(){ document.body.delIds(); }
/*
data {
	tabId: tabId,
	action: 'truc'
}*/
chrome.runtime.onConnectExternal.addListener(
	function (port){
		port.onMessage.addListener (function (data){
			if (data.action === 'clean'){
				cleanPage (data.tabId);
				port.postMessage ({ tabId: data.tabId, action: 'ok' });
			}
			else if (data.action === 'cleanIds') chrome.scripting.executeScript ({
				target: {tabId: data.tabId, allFrames: true },
				function: delIds
		});});
});