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
/*
browser.browserAction.onClicked.addListener (function (tab){
	browser.scripting.insertCSS ({
		target: { tabId: tab.id, allFrames: true },
		files: [ 'textFct.js', 'page-clean.js', 'cleanArticle.js', 'cleanAction.js' ]
	});
	browser.scripting.executeScript ({
		target: { tabId: tab.id, allFrames: true },
		files: [ 'structure.css', 'perso.css' ]
	});
});
*/