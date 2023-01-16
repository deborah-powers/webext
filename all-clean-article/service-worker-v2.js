chrome.browserAction.onClicked.addListener (function (tab){
	if (tab.url.includes ('https://archiveofourown.org/')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'cleanArticle.js', 'cleanStart.js', 'cleanAooo.js', 'cleanEnd.js' ]
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: false},
			files: [ 'structure.css', 'perso.css' ]
		});
	}
	else if (! tab.url.includes ('http://localhost:1407') && 'http' === tab.url.substring (0,4) || 'file:///C:/' === tab.url.substring (0,11)){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: false },
			files: [ 'textFct.js', 'htmlFct.js', 'pageFct.js', 'cleanArticle.js', 'cleanStart.js', 'cleanAction.js', 'cleanEnd.js' ]
		});
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: false},
			files: [ 'structure.css', 'perso.css' ]
		});
}});
