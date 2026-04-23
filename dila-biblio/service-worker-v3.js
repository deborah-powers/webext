chrome.action.onClicked.addListener (function (tab){
	if (tab.url.includes ('/mademarche/demarcheGenerique/?codeDemarche=arnaqueInternet')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'taglib.js', 'action-ai.js' ]
		//	files: [ 'logger.js', 'taglib.js', 'action-ai.js' ]	le logger.js importé dans le content_script est récupéré
	});}
	if (tab.url.includes ('/mademarche/demarcheGenerique/?codeDemarche=INSRegistreFR')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'taglib.js', 'action-fe.js' ]
	});}
});
