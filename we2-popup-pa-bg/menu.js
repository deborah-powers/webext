function chooseAction (event){
	// event.target contient le bouton de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		// envoyer un message au background
		chrome.tabs.sendMessage (activeTab.id, { action: 'avancer' }, function (response){ console.log ('réponse:', response); });
	});
	event.target.focus();
}
// créer les options
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('button');
	for (var p=0; p< plist.length; p++) plist[p].addEventListener ('click', chooseAction);
});
