function notLaunch(){ console.log ("l'extension fouille sharepoint ne peut pas s'executer sur cette page"); }
function launch(){
	HTMLElement.prototype.extractFileData = function(){
		return this.children[2].innerText + '\t%s\t' + this.children[3].title;
	};
	var content = document.getElementById ('appRoot')
//	document.body.innerHTML = content.innerHTML;
//	console.log (document.getElementsByClassName ('ms-ContextualMenu-list'));
	var listArianne = content.getElementsByTagName ('ol')[0].getElementsByTagName ('li');
	var filArianne =""
	for (var crum of listArianne) filArianne = filArianne +" / "+ crum.innerText;
	filArianne = filArianne.substring (3);
	console.log (filArianne);
	content = document.getElementById ('html-list_2');
	console.log (content.children.length);
	content = content.children[0].children[7].children[1];
	document.body.style.overflow = 'scroll';
	var dataTab ="";	// titre	nom	date de modification	taille	url	fil d'ariane
	var folderList =[];
	for (var frame of content.children){
		if (frame.children[1].children[0].tagName === 'DIV' && frame.children[1].children[0].children[0].getAttribute ('aria-label').includes ('Dossier'))
			folderList.push (frame);
		else dataTab = dataTab + frame.extractFileData() +'\t'+ filArianne +'\n';
	}
	console.log (dataTab);
}
/*
id=%2Fsites%2FMP%2DPRJ%2DANCTSYNERGIECLOUD%2FDocuments%20partages%2FGeneral%2F08%2E%20Fonds%20documentaire%2FSp%C3%A9cifications%20Fonctionnelles
id=%2Fsites%2FMP%2DPRJ%2DANCTSYNERGIECLOUD%2FDocuments%20partages%2FGeneral%2F08%2E%20Fonds%20documentaire%2FSp%C3%A9cifications%20Fonctionnelles%2F01%20%2D%20eSynergie
*/
chrome.browserAction.onClicked.addListener (function (tab){
	if (tab.url.includes ('https://magellanpartners.sharepoint.com/sites/'))
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			func: launch
	});
	else chrome.scripting.executeScript ({
		target: {tabId: tab.id, allFrames: false },
		func: notLaunch
	});
});
