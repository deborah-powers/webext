browser.browserAction.onClicked.addListener (function(){
	browser.tabs.insertCSS ({ file: 'structure.css' });
	browser.tabs.insertCSS ({ file: 'perso.css' });

	browser.tabs.executeScript ({ file: 'page-clean.js' });
	/*
	browser.tabs.executeScript ({ file: 'textFct.js' });
	browser.tabs.executeScript ({ file: 'cleanArticle.js' });
	browser.tabs.executeScript ({ file: 'cleanAction.js' });
	*/
});