chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('/mademarche/demarcheGenerique/')) return;
	else if (tab.url.includes ('DemandeAutorisationEnvironnementale')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-daenv.js' ]
	});
	else if (tab.url.includes ('pub-changement-nom')) chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		files: [ 'demarche-pcn.js' ]
	});
});
