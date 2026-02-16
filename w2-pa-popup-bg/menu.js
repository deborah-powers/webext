function monTest(){
	console.log ('mon test', actionCourrante);
}
function chooseAction (event){
	// event.target contient le bouton de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		// choisir les actions
		if (action === 'vas-resume') listScript =[ 'aller-resume.js' ];
		// lancer les actions
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: false},
			func: monTest
		});
	});
	event.target.focus();
}
// créer les options
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('button');
	for (var p=0; p< plist.length; p++) plist[p].addEventListener ('click', chooseAction);
});
