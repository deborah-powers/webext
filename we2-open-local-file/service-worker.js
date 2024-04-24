chrome.runtime.onConnectExternal.addListener(
	// connection durable, avec la possiblité de lancer les fonction locales
	function (port){
	port.onMessage.addListener (function (data){
		// tabId doit être injecté manuellement dans data
		console.dir (data);
		chrome.scripting.executeScript ({
			target: { tabId: data.tabId, allFrames: true },
			files: [ 'cleanLib.js', 'cleanAction.js' ]
		});
});});