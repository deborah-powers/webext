function cleanPage (tabId){
	chrome.scripting.executeScript ({
		target: {tabId: tabId, allFrames: true },
		files: [ 'cleanLib.js', 'metas.js', 'cleanAction.js' ]
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
function cleanStr (text){ document.body.delIds(); }
/*
data {
	tabId: tabId,
	action: 'truc'
}*/
function toto(){ console.log ('toto'); }
chrome.runtime.onConnectExternal.addListener(
	function (port){
		port.onMessage.addListener (function (data){
			chrome.scripting.executeScript ({
				target: {tabId: data.tabId, allFrames: true },
				files: [ 'cleanLib.js', 'metas.js' ]
			});
			if (data.action === 'clean'){
				cleanPage (data.tabId);
				port.postMessage ({ tabId: data.tabId, action: 'ok', coco: 'coco', toto: toto, tata: 'tata'
				 });
			}
			else if (data.action === 'cleanIds') chrome.scripting.executeScript ({
				target: {tabId: data.tabId, allFrames: true },
				function: delIds
		});});
});