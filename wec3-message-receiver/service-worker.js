/* https://developer.chrome.com/docs/extensions/mv3/messaging/#external
https://stackoverflow.com/questions/71369177/chrome-extension-onmessage-addlistener-vs-chrome-runtime-onmessage-addlistener-o
*/
function coloriseBg(){
	console.log ('coucou');
	const divs = document.getElementsByTagName ('div');
	for (var d=0; d< divs.length; d++) divs[d].style.backgroundColor = 'lime';
}
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			function: coloriseBg
});}});
chrome.runtime.onMessageExternal.addListener(
	// connection brêve, pour renvoyer un message à la webext appelante
	function (data, sender, funcResponse){
		funcResponse ('lightblue');
});
chrome.runtime.onConnectExternal.addListener(
	// connection durable, avec la possiblité de lancer les fonction locales
	function (port){
	port.onMessage.addListener (function (data){
		// tabId doit être injecté manuellement dans data
		chrome.scripting.executeScript ({
			target: { tabId: data.tabId, allFrames: true },
			function: coloriseBg
		});
});});