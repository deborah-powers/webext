function saveMyPage(){
	const marqueur = document.getElementById ('marqueur-nettoyage');
	if (marqueur.innerHTML === 'page propre'){
		sendToBackend();
		marqueur.innerHTML = 'page sauvée';
	}
}
function savePage (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			function: saveMyPage
});});}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.insertCSS ({
			target: {tabId: activeTab.id, allFrames: true },
			files: ['structure.css', 'perso.css'],
		});
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			files: [ 'cleanLib.js', 'cleanPage.js' ]
		});
	});
	var button = document.body.getElementsByTagName ('h1')[0];
	button.addEventListener ('click', savePage);
});
