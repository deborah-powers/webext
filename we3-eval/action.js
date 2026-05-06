crutialData =`
	hello: hello,
	tocall: tocall
`;
/*
console.log (openRessource ('file:///C:/Users/deborah.powers/Desktop/cgi/cv-template.txt'));
callLibrary ([ 'test-we-bg' ]);

function testFunc(){ console.log ('hello'); }
console.log (chrome);
chrome.action.onClicked.addListener (function (tab){
	chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: true },
		function: testFunc
	});
});
*/
chrome.action.onClicked.addListener (function (tab){
	console.log ('tab', tab);
	chrome.runtime.sendMessage ({ code: '2+8', scripts: [ 'file:///C:/wamp64/www/site-dp/library-js/textFct.js', 'file:///C:/wamp64/www/site-dp/library-js/htmlFct.js' ] });
});