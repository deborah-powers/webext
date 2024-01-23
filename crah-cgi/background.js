chrome.action.onClicked.addListener (function (tab){
	if (tab.url.includes ('https://psa-fs.ent.cgi.com/')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'action.js' ]
});}});
