function testTruc(){
	console.log ('coucou', window.location.href);
	if (! window.location.href ('afficheResume'))
}

function chooseAction (event){
	// event.target contient le bouton de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		console.log (window.location.href, activeTab);
		var listScript =[];
		// choisir les actions
		if (action === 'go-resume'){
			listScript =[ 'truc.js', 'machin.js' ];
		}
		// lancer les actions
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: false},
			func: testTruc
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