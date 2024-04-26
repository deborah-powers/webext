/* https://developer.chrome.com/docs/extensions/mv3/messaging/#external
https://stackoverflow.com/questions/71369177/chrome-extension-onmessage-addlistener-vs-chrome-runtime-onmessage-addlistener-o
*/
function doAction (action){
	console.log ('action dans le receveur', action);
	libraireExiste();
	'abcde'.libraireExiste();
	const divs = document.getElementsByTagName ('div');
	for (var d=0; d< divs.length; d++) divs[d].style.backgroundColor = 'lightgreen';
}
chrome.runtime.onConnectExternal.addListener(
	// connection durable, avec la possiblité de lancer les fonction locales
	function (port){
	port.onMessage.addListener (function (data){
		// tabId doit être injecté manuellement dans data
		chrome.scripting.executeScript ({
			target: { tabId: data.tabId, allFrames: false },
			function: doAction,
			args: [ data.action ]
		});
		port.postMessage({ msg: 'je suis le receveur', nb: 22 });
});});