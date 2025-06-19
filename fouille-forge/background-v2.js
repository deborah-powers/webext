const cssCodeOrange = 'body { background-color: orange; }';
function notLaunch(){ console.log ("l'extension fouille forge ne peut pas s'executer sur cette page"); }

chrome.browserAction.onClicked.addListener (function (tab){
	if (tab.url.includes ('//forgeaxyus.local.axyus.com/')) chrome.scripting.insertCSS ({
		target: {tabId: tab.id, allFrames: true},
		css: cssCodeOrange
	});
	else chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false},
		func: notLaunch
	});
});
