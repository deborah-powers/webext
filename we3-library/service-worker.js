/* https://developer.chrome.com/docs/extensions/mv3/messaging/#external
https://stackoverflow.com/questions/71369177/chrome-extension-onmessage-addlistener-vs-chrome-runtime-onmessage-addlistener-o
*/
function createSummary(){ document.body.createSummary(); }
function toHtml (text){
	var textHtml = text.toHtml();
	textHtml = textHtml.trim();
	return textHtml;
}
function doAction (action){
	console.log ('action dans le receveur', action);
	const divs = document.getElementsByTagName ('div');
	for (var d=0; d< divs.length; d++) divs[d].style.backgroundColor = 'lightgreen';
}
chrome.runtime.onConnectExternal.addListener (function (port){
	port.onMessage.addListener (function (data){
		if (data.action === 'sommaire') chrome.scripting.executeScript ({
			target: { tabId: data.tabId, allFrames: false },
			function: createSummary
		});
		else if (data.action === 'toHtml') chrome.scripting.executeScript ({
			target: { tabId: data.tabId, allFrames: false },
			function: toHtml,
			args: [ data.data ]
		}, function (results){ port.postMessage ({ action: 'to Html', data: results[0].result }); });
		// tabId doit être injecté manuellement dans data
		chrome.scripting.executeScript ({
			target: { tabId: data.tabId, allFrames: false },
			function: doAction,
			args: [ data.action ]
		});
	//	port.postMessage({ msg: 'action éffectuée', action: data.action, value: "" });
});});