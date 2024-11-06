browser.browserAction.onClicked.addListener (function(){
	browser.tabs.executeScript ({ file: 'cleanLib.js' });
	browser.tabs.executeScript ({ file: 'cleanArticle.js' });
	browser.tabs.executeScript ({ file: 'cleanAction.js' });
	browser.tabs.insertCSS ({ file: 'structure.css' });
	browser.tabs.insertCSS ({ file: 'perso.css' });
});