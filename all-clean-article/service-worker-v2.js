function coco (n1, n2){
	console.log ('coco', n1, n2);
	n2.surnom = 'hello';
}
function dodo (n2){
	console.log ('dodo', n2);
}
chrome.browserAction.onClicked.addListener (function (tab){
	if (tab.url.includes ('https://osmose.numerique.gouv.fr/jcms/')){
		// mission pour récupérer les pages html de la nouvelle spec et les mettre dans un word
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			files: [ 'import-perso.js', 'cleanArticle.js', 'cleanOsmose.js' ]
	});}
	else if (! tab.url.includes ('http://localhost:1407') && 'http' === tab.url.substring (0,4) || 'file:///C:/' === tab.url.substring (0,11)){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: false },
			files: [ 'import-perso.js', 'cleanArticle.js', 'cleanAction.js' ]
		});
}});
