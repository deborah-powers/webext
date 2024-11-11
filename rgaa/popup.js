function chooseAction (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.removeCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: [ 'ana-all.css', 'ana-image.css' ]
		});
		if (action === 'del-style') chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			files: [ 'del-style.js' ]
		});
		else if (action === 'ana-image'){
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				files: [ 'ana-all.css', 'ana-image.css' ]
			});
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'modal-drag.js', 'ana-all.js', 'ana-image.js' ]
			});
		}
});}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('p');
	for (var p=0; p<3; p++) plist[p].addEventListener ('click', chooseAction);
});
