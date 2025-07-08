function notLaunch(){ console.log ("l'extension fouille sharepoint ne peut pas s'executer sur cette page"); }
function launch(){
	function waitForElement (selector){
		return new Promise (resolve =>{
		//	if (document.querySelector (selector)) return resolve (document.querySelector (selector));
			const observer = new MutationObserver ((mutations, observer) =>{
				const element = document.querySelector(selector);
				if (element){
					observer.disconnect();
					resolve (element);
			}});
			observer.observe (document.body, { childList: true, subtree: true, });
	});}
	HTMLElement.prototype.extractFileData = function(){
		if (this.children[2].innerText.includes ('.jar') || this.children[2].innerText.includes ('.zip')) return "";
		else{
			var text = this.children[2].innerText + '\t' + this.children[3].title;
			console.log (text);
			this.children[2].getElementsByTagName ('button')[0].click();
			console.log ('a');
			// laisser le temps au menu de se charger
/*			waitForElement ('.ms-ContextualMenu-list').then (menu =>{
				console.log ("le menu existe", menu.getElementsByTagName ('button'));
				menu.getElementsByTagName ('button')[17].click();
				waitForElement ('#Dialog1-title').then (content =>{
					console.log ("le content existe", content);
			});});*/
			window.setTimeout (function(){
				console.log ('b');
				var menu = document.getElementsByClassName ('ms-ContextualMenu-list')[0];
				console.log ('c');
				menu.getElementsByTagName ('button')[17].click();
				console.log ('click');
				window.setTimeout (function(){
					const frame = document.getElementsByTagName ('iframe')[0];
					const buttons = frame.contentDocument.getElementsByTagName ('button');
					console.log ('mes iframes', buttons, buttons.length);
				}, 500);
/*				waitForElement ('#Dialog1-title').then (content =>{
					console.log ("le content existe", content);
				});
				window.setTimeout (function(){
					var content = document.getElementById ('Dialog1-title');
					console.log ('content', content);
					content = content.parentElement.parentElement;
					console.log ('content', content, content.getElementsByTagName (button));
				}, 10000); */
			}, 500);
			return text;
		}
	};
	var content = document.getElementById ('appRoot')
//	document.body.innerHTML = content.innerHTML;
	var listArianne = content.getElementsByTagName ('ol')[0].getElementsByTagName ('li');
	var filArianne =""
	for (var crum of listArianne) filArianne = filArianne +" / "+ crum.innerText;
	filArianne = filArianne.substring (3);
	console.log (filArianne);
	content = document.getElementById ('html-list_2');
	content = content.children[0].children[7].children[1];
	document.body.style.overflow = 'scroll';
	var dataTab ="";	// titre	date de modification	taille	url	fil d'ariane
	var folderList =[];
	for (var frame of content.children){
		if (frame.children[1].children[0].tagName === 'DIV' && frame.children[1].children[0].children[0].getAttribute ('aria-label').includes ('Dossier'))
			folderList.push (frame);
		else dataTab = dataTab + frame.extractFileData() +'\t'+ filArianne +'\n';
	}
//	console.log (dataTab);
}
function getData(){
	content = document.getElementById ('html-list_2');
	content = content.children[0].children[7].children[1];	var dataTab ="";
	// titre	nom	date de modification	taille	url	fil d'ariane
	var folderList =[];
	for (var frame of content.children){
		if (frame.children[1].children[0].tagName === 'DIV' && frame.children[1].children[0].children[0].getAttribute ('aria-label').includes ('Dossier'))
			folderList.push (frame);
		else dataTab = dataTab + frame.extractFileData() +'\t'+ filArianne +'\n';
	}
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
