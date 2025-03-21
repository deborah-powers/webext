chrome.browserAction.onClicked.addListener (function (tab){
	if (tab.url.includes ('https://osmose.numerique.gouv.fr/jcms/')){
		// mission pour récupérer les pages html de la nouvelle spec et les mettre dans un word
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'import-perso.js', 'cleanArticle.js', 'cleanOsmose.js' ]
	});}
	else if ('http' === tab.url.substring (0,4) || 'file:///C:/' === tab.url.substring (0,11)){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'import-perso.js', 'cleanArticle.js', 'cleanAction.js' ]
		});
}});
/*
browser.browserAction.onClicked.addListener (function (tab){
	browser.tabs.executeScript (tab.id, { file: 'textFct.js' });
	browser.tabs.executeScript (tab.id, { file: 'htmlFct.js' });
	browser.tabs.executeScript (tab.id, { file: 'pageFct.js' });
	browser.tabs.executeScript (tab.id, { file: 'cleanArticle.js' });
	browser.tabs.executeScript (tab.id, { file: 'cleanAction.js' });
	browser.tabs.insertCSS (tab.id, { file: 'structure.css', cssOrigin: 'user' });
	browser.tabs.insertCSS (tab.id, { file: 'perso.css', cssOrigin: 'user' });
});
chrome.browserAction.onClicked.addListener (function (tab){
	if ('http' === tab.url.substring (0,4)){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'cleanArticle.js', 'cleanAction.js' ]
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: true },
			files: ['structure.css', 'perso.css']
		});
}});
*/