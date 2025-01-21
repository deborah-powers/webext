function chooseAction (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.removeCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: [
				'ana-color.css', 'ana-common.css', 'ana-contrast.css', 'ana-focus.css', 'ana-iframe.css', 'ana-image.css', 'ana-langue.css',
				'ana-liste.css', 'elm-conteneur.css', 'elm-hidden.css', 'elm-interdit.css', 'elm-link.css', 'elm-table.css', 'elm-titre.css', 'encart.css', 'volet.css'
		]});
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
		else if (action === 'ana-contrast'){
			listStyle =[ 'ana-common.css', 'volet.css', 'ana-contrast.css' ];
			listScript =[ 'volet.js', 'ana-contrast.js' ];
		}
		else if (action === 'elm-font') listScript =[ 'elm-font.js' ];
		else if (action === 'ana-color'){
			listStyle =[ 'ana-color.css' ];
			listScript =[ 'ana-color.js' ];
		}
		else if (action === 'elm-link'){
			listStyle =[ 'elm-link.css' ];
			listScript =[ 'elm-link.js' ];
		}
		else if (action === 'elm-table'){
			listStyle =[ 'encart.css', 'elm-table.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'elm-table.js' ];
		}
		else if (action === 'elm-interdit'){
			listStyle =[ 'encart.css', 'elm-interdit.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'elm-interdit.js' ];
		}
		else if (action === 'elm-vide'){
			listStyle =[ 'ana-common.css' ];
			listScript =[ 'elm-vide.js' ];
		}
		else if (action === 'elm-hidden'){
			listStyle =[ 'elm-hidden.css' ];
			listScript =[ 'elm-hidden.js' ];
		}
		else if (action === 'ana-focus'){
			listStyle =[ 'ana-focus.css' ];
			listScript =[ 'ana-focus.js' ];
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
