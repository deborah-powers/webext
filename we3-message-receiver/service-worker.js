/* https://developer.chrome.com/docs/extensions/mv3/messaging/#external
https://stackoverflow.com/questions/71369177/chrome-extension-onmessage-addlistener-vs-chrome-runtime-onmessage-addlistener-o
*/
function coloriseBg(){
	console.log ('coucou je suis le receveur');
	const divs = document.getElementsByTagName ('div');
	for (var d=0; d< divs.length; d++) divs[d].style.backgroundColor = 'lightgreen';
}
chrome.action.onClicked.addListener (function (tab){
	if (tab.url.substring (0,7) === 'http://' || tab.url.substring (0,8) === 'https://'){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: false },
			function: coloriseBg
});}});
chrome.runtime.onMessageExternal.addListener(
	/* connection brêve, pour renvoyer un message à la webext appelante
	elle ne peut envoyer qu'une string en argument
	*/
	function (data, sender, funcResponse){ funcResponse ('lightblue'); }
);
chrome.runtime.onConnectExternal.addListener(
	// connection durable, avec la possiblité de lancer les fonction locales
	function (port){
	port.onMessage.addListener (function (data){
		// tabId doit être injecté manuellement dans data
		chrome.scripting.executeScript ({
			target: { tabId: data.tabId, allFrames: false },
			function: coloriseBg
		});
		port.postMessage({ msg: 'je suis le receveur', nb: 22 });
});});