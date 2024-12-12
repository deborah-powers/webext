function chooseAction (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.removeCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: [
				'ana-common.css', 'volet.css', 'encart.css', 'ana-image.css', 'ana-langue.css', 'ana-iframe.css', 'elm-interdit.css',
				'ana-liste.css', 'color.css', 'ana-structure.css', 'elm-interdit.css', 'elm-titre.css'
				]
		});
		var listStyle =[];
		var listScript =[];
		// choisir les actions
		if (action === 'del-style') listScript = [ 'del-style.js' ];
		else if (action === 'ana-image'){
			listStyle =[ 'encart.css', 'ana-image.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'ana-image.js' ];
		}
		else if (action === 'ana-langue'){
			listStyle =[ 'encart.css', 'ana-image.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'ana-langue.js' ];
		}
		else if (action === 'ana-iframe'){
			listStyle =[ 'encart.css', 'ana-iframe.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'ana-iframe.js' ];
		}
		else if (action === 'ana-color'){
			listStyle =[ 'ana-common.css', 'volet.css', 'ana-color.css' ];
			listScript =[ 'volet.js', 'ana-color.js' ];
		}
		else if (action === 'elm-interdit') listStyle =[ 'elm-interdit.css' ];
		else if (action === 'elm-vide'){
			listStyle =[ 'ana-common.css' ];
			listScript =[ 'elm-vide.js' ];
		}
		else if (action === 'elm-conteneur'){
			listStyle =[ 'volet.css', 'elm-conteneur.css' ];
			listScript =[ 'volet.js', 'elm-conteneur.js' ];
		}
		else if (action === 'elm-titre'){
			listStyle =[ 'volet.css', 'elm-titre.css' ];
			listScript =[ 'volet.js', 'elm-titre.js' ];
		}
		else if (action === 'ana-liste'){
			listStyle =[ 'ana-liste.css' ];
			listScript =[ 'ana-liste.js' ];
		}
		// lancer les actions
		if (listStyle.length >0) chrome.scripting.insertCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: listStyle
		});
		if (listScript.length >0) chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true},
			files: listScript
		});
});}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('p');
	for (var p=0; p< plist.length; p++) plist[p].addEventListener ('click', chooseAction);
});
