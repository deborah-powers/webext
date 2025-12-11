/* https://developer.chrome.com/docs/extensions/mv3/messaging/#external
https://stackoverflow.com/questions/71369177/chrome-extension-onmessage-addlistener-vs-chrome-runtime-onmessage-addlistener-o
*/
function coloriseBgConectionLong (tabId){
	// connection longue, possibilité d'executer les fonctions de la webext destinataire
	const libraryId = "acdheafjnikllipihhdobgdljdngmmco";	// id de la librairie dans les extensions de chrome
	console.log ("coucou je suis l'envoyeur");
	var port = chrome.runtime.connect (libraryId);
	port.postMessage ({ tabId: tabId, action: 'toHtml', data: 'coucou' });
	port.onMessage.addListener (function (msg){ console.log ('réponse reçue', msg); });
}
chrome.action.onClicked.addListener (function (tab){
	if (tab.url.substring (0,7) === 'http://' || tab.url.substring (0,8) === 'https://'){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: false },
			function: coloriseBgConectionLong,
			args: [ tab.id ]
		});
}});
