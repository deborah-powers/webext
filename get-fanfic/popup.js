function cleanPage (event){
	// event.target contient le bouton (</p>) de la popup sur lequel j'ai cliqué
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		if (! activeTab.url.includes ('chrome://')){
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'text-clean.js', 'text.js', 'page-clean.js', 'cleanAction.js' ]
			});
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true },
				files: ['structure.css', 'perso.css']
});}});}
function savePage (event){
	// event.target contient le bouton (</p>) de la popup sur lequel j'ai cliqué
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		if (! activeTab.url.includes ('chrome://')){
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'text-clean.js', 'page-save.js' ]
});}});}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var title = document.body.getElementsByTagName ('p');
	title[0].addEventListener ('click', cleanPage);
	title[1].addEventListener ('click', savePage);
});
