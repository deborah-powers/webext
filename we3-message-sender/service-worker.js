/* https://developer.chrome.com/docs/extensions/mv3/messaging/#external
https://stackoverflow.com/questions/71369177/chrome-extension-onmessage-addlistener-vs-chrome-runtime-onmessage-addlistener-o
*/
function coloriseBg(){
	const wextMessageReceiver = "cklnfaccgogglclldkfdoalbcojcpbfc";
	const divs = document.getElementsByTagName ('div');
	for (var d=0; d< divs.length; d++) divs[d].style.backgroundColor = 'pink';
	chrome.runtime.sendMessage (wextMessageReceiver, {getTargetData: true},
		function (response){ console.log ("j'ai eu une réponse !", response); }
	);
}
function coloriseBgConectionShort (tabId){
	// connection brêve, récupérer un message puis lancer une fonction locale
	const wextMessageReceiver = "cklnfaccgogglclldkfdoalbcojcpbfc";
	var color = 'pink';
	const divs = document.getElementsByTagName ('div');
	chrome.runtime.sendMessage (
		// sendMessage est assynchrone
		wextMessageReceiver, { message: 'coucou' },
		function (colorResponse){
			// la fonction ne peut prendre qu'une string comme argument
			console.log ("la nouvelle couleur est", colorResponse);
			for (var d=0; d< divs.length; d++) divs[d].style.backgroundColor = colorResponse;
			color = colorResponse;
	});
	console.log ('la couleur est', color);
}
function coloriseBgConectionLong (tabId){
	// connection longue, possibilité d'executer les fonctions de la webext destinataire
	const wextMessageReceiver = "cklnfaccgogglclldkfdoalbcojcpbfc";
	console.log ("coucou je suis l'envoyeur");
	document.body.style.border = '20px solid red';
	const divs = document.getElementsByTagName ('div');
	var port = chrome.runtime.connect (wextMessageReceiver);
	port.postMessage ({ message: 'coucou', tabId: tabId });
	port.onMessage.addListener (function (msg){ console.log ('réponse du receveur', msg);});
}
chrome.action.onClicked.addListener (function (tab){
	if (tab.url.substring (0,7) === 'http://' || tab.url.substring (0,8) === 'https://'){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: false },
			function: coloriseBgConectionLong,
			args: [ tab.id ]
		});
}});
