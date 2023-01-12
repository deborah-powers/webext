function coloriseBg(){
	document.body.style.backgroundColor = 'deeppink';
	const divs = document.getElementsByTagName ('div');
	for (var d=0; d< divs.length; d++) divs[d].style.backgroundColor = 'pink';
}
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('chrome://')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			function: coloriseBg
});}});
/*
chrome.scripting.insertCSS ({
	target: {tabId: tab.id, allFrames: true},
	files: ['structure.css', 'perso.css']
});
ou
const cssCode = 'body { background-color: red; }';
chrome.scripting.insertCSS ({
	target: {tabId: tab.id, allFrames: true},
	css: cssCode
});
chrome.scripting.executeScript ({
	target: {tabId: tab.id, allFrames: true },
	files: ['action.js']
});
ou
function coucou(){ document.body.style.backgroundColor = 'red'; }
function coucouArg (color){ document.body.style.backgroundColor = color; }
chrome.scripting.executeScript ({
	target: {tabId: tab.id, allFrames: true },
	function: coucouArg,
	args: [ color ]
});
*/