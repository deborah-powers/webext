function chooseAction (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.removeCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: [ 'ana-common.css', 'color.css' ]
		});
		if (action === 'del-style') chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			files: [ 'del-style.js' ]
		});
		else if (action === 'ana-image'){
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				files: [ 'encart.css' ]
			});
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'ana-common.js', 'encart.js', 'ana-image.js' ]
		});}
		else if (action === 'ana-langue'){
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				files: [ 'encart.css' ]
			});
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'ana-common.js', 'encart.js', 'ana-langue.js' ]
		});}
		else if (action === 'ana-iframe'){
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				files: [ 'encart.css' ]
			});
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'ana-common.js', 'encart.js', 'ana-iframe.js' ]
		});}
		else if (action === 'ana-color'){
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'volet.js', 'ana-color.js', 'color.js' ]
			});
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				files: [ 'volet.css', 'color.css' ]
		});}
		else if (action === 'ana-structure'){
			chrome.scripting.executeScript ({
				target: {tabId: activeTab.id, allFrames: true },
				files: [ 'ana-common.js', 'volet.js', 'ana-structure.js' ]
			});
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				files: [ 'volet.css', 'structure.css' ]
		});}
		else if (action === 'ana-balis'){
			chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			files: [ 'ana-common.js', 'volet.js', 'ana-balis.js' ]
			});
			chrome.scripting.insertCSS ({
				target: {tabId: activeTab.id, allFrames: true},
				files: [ 'volet.css', ]
		});}
});}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('p');
	for (var p=0; p< plist.length; p++) plist[p].addEventListener ('click', chooseAction);
});
