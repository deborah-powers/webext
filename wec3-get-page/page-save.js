// dépend de backend.py
const urlBackend = 'http://localhost:1407/';

// récupérer les métadonnées
const data = {
	title: 'nouvel article',
	link: window.location.href,
	text: document.body.innerHTML
};
var title = document.head.getElementsByTagName ('title')[0].innerHTML.toLowerCase().cleanTxt();
// if (exists (title)) data.title = title;
const dataJson = JSON.stringify (data);
// ecrire le body propre dans un fichier grâce à un backend python
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
	if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
//		else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
};
xhttp.open ('POST', urlBackend, true);
xhttp.send (dataJson);
