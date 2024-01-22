function sendToBackend (mode){
	// ecrire le body propre dans un fichier grâce à un backend python
	const urlBE = 'http://localhost:1407/';

	var fullPageTemplate =`<!DOCTYPE html><html><head>
	<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<link rel='icon' type='image/svg+xml' href='/home/ent6904919/Bureau/site-dp/data/nounours-perso.svg'/>
	<link rel='stylesheet' type='text/css' href='/home/ent6904919/Bureau/site-dp/library-css/structure.css'/>
	<link rel='stylesheet' type='text/css' href='/home/ent6904919/Bureau/site-dp/library-css/perso.css' media='screen'/>
</head><body></body></html>`;

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
		else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
	};
	xhttp.open ('POST', urlBE, true);
	data = document.getElementsByTagName ('title')[0].innerText;
	if (data === null || data.length <3) data = 'tmp';
	else data = data.toLowerCase();

	if (mode === 'full'){
		fullPageTemplate = fullPageTemplate.replace ('<title></title>', '<title>' + data + '</title>');
		fullPageTemplate = fullPageTemplate.replace ('<body></body>', '<body>\n' + document.body.innerHTML + '\n</body>');
		data = data + '\n\n' + fullPageTemplate;
	}
	else data = data + '\n\n' + document.body.innerHTML;
	xhttp.send (data);
}
function downloadContent (event){
	// event.target contient le bouton (h1) de la popup sur lequel j'ai cliqué
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			function: sendToBackend,
			args: [ 'content' ]
		});
	});
}
function downloadFullPage (event){
	// event.target contient le bouton (h1) de la popup sur lequel j'ai cliqué
	chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
		var activeTab = tabs[0];
		chrome.scripting.executeScript ({
			target: {tabId: activeTab.id, allFrames: true },
			function: sendToBackend,
			args: [ 'full' ]
		});
	});
}
chrome.tabs.query ({currentWindow: true, active: true}, function (tabs){
// connection longue, possibilité d'executer les fonctions de la webext destinataire
	const wextMessageReceiver = "odgjooegjjbgpjgncngpdogigllmipmp";
	var port = chrome.runtime.connect (wextMessageReceiver);
	port.postMessage (tabs[0].id);
});
document.addEventListener ('DOMContentLoaded', function(){
	// document.body contient le body de la popup
	var title = document.body.getElementsByTagName ('p');
	title[0].addEventListener ('click', downloadFullPage);
	title[1].addEventListener ('click', downloadContent);
});
