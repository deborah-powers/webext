browser.browserAction.onClicked.addListener (function (tab){
	browser.tabs.executeScript (tab.id, { file: 'textFct.js' });
	/*
	browser.tabs.executeScript (tab.id, { file: 'htmlFct.js' });
	browser.tabs.executeScript (tab.id, { file: 'pageFct.js' });
	browser.tabs.executeScript (tab.id, { file: 'cleanArticle.js' });
	browser.tabs.executeScript (tab.id, { file: 'cleanAction.js' });
	*/
	browser.tabs.insertCSS (tab.id, { file: 'structure.css', cssOrigin: 'user' });
	browser.tabs.insertCSS (tab.id, { file: 'perso.css', cssOrigin: 'user' });
});