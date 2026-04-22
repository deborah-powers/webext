chrome.action.onClicked.addListener (function (tab){
	if (tab.url.includes ('/mademarche/demarcheGenerique/?codeDemarche=arnaqueInternet')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'action.js' ]
		//	files: [ 'logger.js', 'action.js' ]	le logger.js importé dans le content_script est récupéré
	});}
});
