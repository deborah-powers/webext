chrome.action.onClicked.addListener (function (tab){
	const extension = tab.url.substring (tab.url.length -4);
	if (extension === '.txt' || extension.substring (1) === '.md'){
		chrome.scripting.insertCSS ({
			target: {tabId: tab.id, allFrames: true},
			files: ['structure.css', 'shapes.css', 'style.css']
		});
		chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: true },
		files: [ 'textFct.js', 'htmlFct.js', 'action.js' ]
});}});