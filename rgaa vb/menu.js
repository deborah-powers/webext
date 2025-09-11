function openInfos(){
	const buttonList = document.getElementsByTagName ('section')[1];
	const infoBlock = document.getElementsByTagName ('section')[0];
	infoBlock.className ="";
	infoBlock.children[0].children[0].innerHTML = 'cacher les infos';
	buttonList.style.height = '4em';
	buttonList.style.overflow = 'hidden';
}
window.setTimeout (openInfos, 15000);
function chooseAction (event){
	// event.target contient le bouton de la popup sur lequel j'ai cliqué
	var action = event.target.id;
	if (action === 'show-infos'){
		const buttonList = document.getElementsByTagName ('section')[1];
		if (event.target.parentElement.parentElement.className === 'closed'){
			event.target.parentElement.parentElement.className ="";
			event.target.previousElementSibling.innerHTML = 'cacher les infos';
			buttonList.style.height = '3em';
			buttonList.style.overflow = 'hidden';
		}
		else{
			console.log (event.target.parentElement.parentElement);
			event.target.parentElement.parentElement.className = 'closed';
			event.target.previousElementSibling.innerHTML = 'afficher les infos';
			buttonList.style.height = 'unset';
			buttonList.style.overflow = 'unset';
		//	document.body.style.width = '16em';
		}
		event.target.focus();
		return;
	}
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.removeCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: [
				'ana-common.css', 'ana-tabulation.css',
				'elm-image.css', 'elm-interract.css', 'elm-link.css', 'elm-structure.css', 'elm-tooltip.css'
		]});
		var listStyle =[];
		var listScript =[];
		// choisir les actions
		if (action === 'elm-structure'){
			listStyle =[ 'ana-common.css', 'elm-structure.css' ];
			listScript =[ 'xpathFct.js', 'ana-common.js', 'elm-structure.js' ];
		}
		else if (action === 'elm-color'){
			listStyle =[ 'ana-common.css' ];
			listScript =[ 'xpathFct.js', 'ana-contrast.js', 'ana-common.js', 'ana-color.js', 'elm-color.js' ];
		}
		if (action === 'ana-tabulation') listStyle =[ 'ana-tabulation.css' ];
		else if (action === 'elm-tooltip') listStyle =[ 'ana-common.css', 'elm-tooltip.css' ];
		else if (action === 'elm-interract'){
			listStyle =[ 'ana-common.css', 'elm-interract.css' ];
			listScript =[ 'xpathFct.js', 'ana-name.js', 'ana-contrast.js', 'ana-common.js', 'elm-interract.js' ];
		}
		else if (action === 'elm-link'){
			listStyle =[ 'ana-common.css', 'elm-link.css' ];
			listScript =[ 'xpathFct.js', 'ana-name.js', 'ana-contrast.js', 'ana-common.js', 'elm-link.js' ];
		}
		else if (action === 'elm-image'){
			listStyle =[ 'ana-common.css', 'elm-image.css' ];
			listScript =[ 'xpathFct.js', 'ana-name.js', 'ana-common.js', 'elm-image.js' ];
		}
		else if (action === 'del-style') listScript = [ 'del-style.js' ];
		// lancer les actions
		if (listStyle.length >0) chrome.scripting.insertCSS ({
			target: {tabId: activeTab.id, allFrames: true},
			files: listStyle
		});
		if (listScript.length >0) chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true},
			files: listScript
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
