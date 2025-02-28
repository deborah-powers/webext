chrome.action.onClicked.addListener (function (tab){
	if ('http' === tab.url.substring (0,4)){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'cleanArticle.js', 'cleanAction.js' ]
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: true},
			files: ['structure.css', 'perso.css'],
		});
}});