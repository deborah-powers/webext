function cleanMyPage (tabId){
	const wextMessageReceiver = "mdhcenbcfmgefkpcabmlfhokbbhcmonf";
	var port = chrome.runtime.connect (wextMessageReceiver);
	port.postMessage (tabId);
}
function saveMyPage(){
	const marqueur = document.getElementById ('marqueur-nettoyage');
	if (marqueur.innerHTML === 'page propre'){
		const data = {
			title: 'nouvel article',
			link: window.location.href,
			body: document.body.innerHTML,
			author: "",
			subject: "",
			autlink: window.location.href
		};
		const title = document.head.getElementsByTagName ('title')[0].innerHTML;
		if (exists (title)) data.title = title;
		const metas = document.head.getElementsByTagName ('meta');
		for (var m=0; m< metas.length; m++){
			if (metas[m].name === 'author') data.author = metas[m].content;
			else if (metas[m].name === 'subject') data.subject = metas[m].content;
			else if (metas[m].name === 'autlink') data.autlink = metas[m].content;
		}
		// ecrire le body propre dans un fichier grâce à un backend python
		const urlBE = 'http://localhost:1407/';
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function(){
			if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
	//		else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
		};
		xhttp.open ('POST', urlBE, true);
		xhttp.send (JSON.stringify (data));
		marqueur.innerHTML = 'page sauvée';
}}
function savePage (event){
	// event.target contient le bouton (p) de la popup sur lequel j'ai cliqué
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			function: saveMyPage
});});}
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			function: cleanMyPage,
			args: [ activeTab.id ]
		});
	});
	var button = document.body.getElementsByTagName ('h1')[0];
	button.addEventListener ('click', savePage);
});