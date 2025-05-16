function chooseAction (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.removeCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: [
				'ana-common.css', 'volet.css',
				'ana-color.css', 'ana-common.css', 'ana-contrast.css', 'ana-download.css', 'ana-focus.css', 'ana-langue.css',
				'elm-click.css', 'elm-conteneur.css', 'elm-form.css', 'elm-hidden.css', 'elm-iframe.css', 'elm-image.css', 'elm-interract.css', 'elm-interdit.css',
				'elm-link.css', 'elm-liste.css', 'elm-media.css', 'elm-table.css', 'elm-titre.css'
		]});
		var listStyle =[];
		var listScript =[];
		// choisir les actions
		if (action === 'del-style'){
			listStyle =[ 'ana-common.css' ];
			listScript = [ 'del-style.js' ];
		}
		else if (action === 'elm-image'){
			listStyle =[ 'ana-common.css', 'elm-image.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'ana-name.js', 'elm-image.js' ];
		}
		else if (action === 'elm-media') listStyle =[ 'elm-media.css' ];
		else if (action === 'elm-link-modale-js'){
			listStyle =[ 'ana-common.css', 'elm-link.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'ana-name.js', 'elm-link.js' ];
		}
		else if (action === 'elm-link'){
			listStyle =[ 'ana-common.css', 'elm-link.css' ];
			listScript =[ 'ana-common.js', 'ana-name.js', 'elm-link.js' ];
		}
		else if (action === 'elm-click'){
			listStyle =[ 'ana-common.css', 'elm-link.css', 'elm-click.css' ];
			listScript =[ 'ana-common.js', 'ana-name.js', 'elm-link.js', 'elm-click.js' ];
		}
		else if (action === 'elm-interract'){
			listStyle =[ 'ana-common.css', 'elm-link.css', 'elm-click.css', 'elm-interract.css' ];
			listScript =[ 'ana-common.js', 'ana-name.js', 'elm-link.js', 'elm-click.js' ];
		}
		else if (action === 'ana-langue'){
			listStyle =[ 'ana-common.css', 'elm-image.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'ana-langue.js' ];
		}
		else if (action === 'elm-iframe'){
			listStyle =[ 'ana-common.css', 'elm-iframe.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'elm-iframe.js' ];
		}
		else if (action === 'elm-form'){
			listStyle =[ 'ana-common.css', 'elm-form.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'ana-name.js', 'elm-form.js' ];
		}
		else if (action === 'ana-download'){
			listStyle =[ 'ana-download.css' ];
			listScript =[ 'ana-download.js' ];
		}
		else if (action === 'ana-contrast'){
			listStyle =[ 'ana-common.css', 'volet.css', 'ana-contrast.css' ];
			listScript =[ 'volet.js', 'ana-contrast.js' ];
		}
		else if (action === 'ana-font') listScript =[ 'ana-font.js' ];
		else if (action === 'ana-color'){
			listStyle =[ 'ana-color.css' ];
			listScript =[ 'ana-color.js' ];
		}
		else if (action === 'elm-table'){
			listStyle =[ 'ana-common.css', 'elm-table.css' ];
			listScript =[ 'ana-common.js', 'encart.js', 'elm-table.js' ];
		}
		else if (action === 'elm-interdit'){
			listStyle =[ 'ana-common.css', 'elm-interdit.css' ];
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
			listScript =[ 'ana-common.js', 'volet.js', 'elm-titre.js' ];
		}
		else if (action === 'elm-liste'){
			listStyle =[ 'elm-liste.css' ];
			listScript =[ 'elm-liste.js' ];
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
	console.log ('ok');
	// document.body contient le body de la popup
	var plist = document.body.getElementsByTagName ('p');
	for (var p=0; p< plist.length; p++) plist[p].addEventListener ('click', chooseAction);
});
