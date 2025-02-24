chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'cleanLib.js', 'cleanArticle.js', 'cleanAction.js' ]
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: true},
			files: ['structure.css', 'perso.css'],
		});
}});