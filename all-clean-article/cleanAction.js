crutialData = `
cleanBody: function(){ document.body.cleanBody(); },
replaceTag: function (tagName){ document.body.replaceTag (tagName); },
replaceTagList: function (tagParent, tagName){ tagParent.replaceTagList (tagName); },
findTag: function (tagParent, tagName){ return tagParent.findTag (tagName); },
findTagList: function (tagParent, tagName){ return tagParent.findTagList (tagName); },
delAttributes: function(){
	document.body.delAttributes();
	document.body.delIds();
},
findTitle: findTitle
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
libHtml.cleanBody();
var fanfic = new Fanfic();
fanfic.title = libHtml.findTitle();
fanfic.cleanTitle();
fanfic.findSubject();

if (window.location.href.includes ('https://menace-theoriste.fr/')){
	libHtml.replaceTag ('wrap_all');
	libHtml.replaceTag ('main');
}
else if (window.location.href.includes ('https://www.fanfiction.net/s/')){
	libHtml.replaceTag ('content_parent');
	// les métadonnées
	const head = libHtml.findTag (document.body, 'profile_top');
	fanfic.title = libHtml.findTag (head, 'b').innerText;
	fanfic.author = libHtml.findTag (head, 'a').innerText;
	fanfic.authlink = libHtml.findTag (head, 'a').href;
	fanfic.subject = 'fanfic';
	// le texte, y compris les autres chapitres
	const chapters = libHtml.findTag (document.body, 'chap_select');
	libHtml.replaceTag ('storytextp');
	if (chapters) document.body.appendChild (chapters);
}
else if (window.location.href.includes ('https://archiveofourown.org/works/')){
	libHtml.replaceTag ('main');
	libHtml.replaceTag ('inner');
	// trouver le sujet
	var tag = libHtml.findTag (document.body, 'wrapper');
	libHtml.replaceTagList (tag, 'dd');
	libHtml.replaceTagList (tag, 'a');
	fanfic.subject ="";
	for (var a=0; a< tag.children.length; a++) fanfic.subject = fanfic.subject +', '+ tag.children[a].innerText;
	// trouver les autres infos
	libHtml.replaceTag ('workskin');
	fanfic.title = libHtml.findTag (document.body, 'title heading').innerText;
	// trouver l'auteur
	tag = libHtml.findTag (document.body, 'a');
	fanfic.author = tag.innerText;
	fanfic.authlink = tag.getAttribute ('href');
	// trouver le texte
	libHtml.replaceTag ('chapters');
	libHtml.replaceTagList (document.body, 'userstuff module');
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<h3 class="landmark heading" id="work">Chapter Text</h3>', "");
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<h3 class="landmark heading" id="work">Work Text:</h3>', "");
}
else if (window.location.href.includes ('https://www.gutenberg.org/cache/epub/')){
	// les métadonnées
	var metas = libHtml.findTagList (document.head, 'meta');
	for (var m=0; m< metas.length; m++){
		if (metas[m].name === 'dc.title') fanfic.title = metas[m].content;
		else if (metas[m].name === 'dcterms.source') fanfic.link = metas[m].content;
		else if (metas[m].name === 'dc.creator') fanfic.author = metas[m].content;
	}
	// le texte
	libHtml.replaceTagList (document.body, 'chapter');
}
else if (window.location.href.includes ('https://www.test-recette.fr/recette/')){
	fanfic.title = document.getElementsByTagName ('title')[0].innerHTML;
	fanfic.subject = 'programmation';
	fanfic.author = 'test-recette';
	fanfic.authlink = 'https://www.test-recette.fr/recette/';
	libHtml.replaceTag ('container');
	document.body.innerHTML = document.body.children[0].innerHTML;
}
else{
	fanfic.title = document.getElementsByTagName ('title')[0].innerHTML;
}
fanfic.cleanTitle();
libHtml.delAttributes();
document.body.removeAnnotations();
fanfic.text = document.body.innerHTML;
fanfic.toPage();
document.body.innerHTML = "<button>télécharger</button>" + document.body.innerHTML;
addStyle ([ 'structure', 'perso' ]);

function download(){
	var urlBackend = fanfic.toBackEndUrl();
	window.location.href = urlBackend;
}
document.getElementsByTagName ('button')[0].addEventListener ('click', download);
/*
const urlBackend = 'http://localhost:1407/';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
	if (this.readyState ===4 && this.status === 200) console.log ("les données ont bien été envoyées au back-end.\nsa réponse:", this.responseText);
	else console.log ("l'échange avec le back-end est en erreur.\nécoute-il sur le port 1407 ?\nétat =", this.readyState, 'status =', this.status);
};
xhttp.open ('GET', urlBackend, true);
const fanficStr = JSON.stringify (fanfic);
xhttp.send (fanficStr);
console.log (xhttp.status, xhttp.readyState, xhttp.responseText);
*/