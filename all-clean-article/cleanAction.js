var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
crutialData = `
cleanBody: function(){
	document.body.cleanBody();
	document.body.delAttributes();
	document.body.delIds();
},
findTitle: findTitle
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
libHtml.cleanBody();
const title = libHtml.findTitle();
header = header.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = header;
addStyle ([ 'structure', 'perso' ]);

const urlBackend = 'http://localhost:1407/';
const fanfic ={
	'title': title,
	'text': document.body.innerHTML,
	'subject': 'divers',
	'link': window.location.href,
	'author': 'inconnu'
};
var xhttp = new XMLHttpRequest();
/*
xhttp.onreadystatechange = function(){
	if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
	else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
};*/
xhttp.open ('GET', 'file:///C:/wamp64/www/html/conges.html', false);
console.log ('a');
xhttp.send (JSON.stringify (fanfic));
console.log ('z');
console.log (xhttp.status, xhttp.readyState, xhttp.responseText);
