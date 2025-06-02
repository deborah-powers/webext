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
findTitle: findTitle,
downloadFile: downloadFile
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
document.body.innerHTML = document.body.innerHTML.cleanHtml();
const codeBlocs = document.getElementsByTagName ('xmp');
for (var b=0; b< codeBlocs.length; b++) codeBlocs[b].simplifyNesting();
var fanfic = new Fanfic();
fanfic.title = libHtml.findTitle();
fanfic.cleanTitle();
fanfic.findSubject();
var styleLocal ="";

if (window.location.href.includes ('https://menace-theoriste.fr/')){
	libHtml.cleanBody();
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
else if (window.location.href.includes ('https://disic.github.io/guide-lecteurs_ecran')){
	fanfic.title = 'guide lecteur ecran z';
	fanfic.subject = 'programmation, accessibilité';
	fanfic.author = 'dinsic';
	libHtml.replaceTag ('wrapper');
	const next = document.getElementsByTagName ('nav')[0].getElementsByTagName ('a')[0];
	libHtml.replaceTag ('main');
	document.body.innerHTML = next.outerHTML + document.body.innerHTML;
}
else if (window.location.href.includes ('https://www.test-recette.fr/recette/')){
	libHtml.cleanBody();
	fanfic.title = document.getElementsByTagName ('title')[0].innerHTML;
	fanfic.subject = 'programmation';
	fanfic.author = 'test-recette';
	fanfic.authlink = 'https://www.test-recette.fr/recette/';
	libHtml.replaceTag ('container');
	document.body.innerHTML = document.body.children[0].innerHTML;
}
else if (window.location.href.includes ('https://stackoverflow.com/questions/')){
	libHtml.replaceTag ('container');
	libHtml.replaceTag ('content');
	libHtml.replaceTag ('inner-content');
	var title = '<h1>' + libHtml.findTag (document.body, 'h1').innerText + '</h1>';
	title = title + '<p>' + libHtml.findTag (document.body.children[1].children[1], 'a').innerHTML + '</p>';
	libHtml.replaceTag ('mainbar');
	var text ="";
	var tagList = document.getElementsByClassName ('post-layout');
	for (var tag of tagList) text = text + tag.outerHTML;
	document.body.innerHTML = text;
	tagList = document.getElementsByClassName ('post-layout--right');
	for (var t=0; t< tagList.length; t++) tagList[t].innerHTML = tagList[t].children[0].innerHTML;
	text ="";
	for (var tag of tagList) text = text + tag.outerHTML;
	document.body.innerHTML = title + text;
	styleLocal = `body > div {
	border-top-style: double;
	border-top-width: 8px;
	padding-top: 1em;
	margin-top: 1em;
}`;
}
else{
	fanfic.title = document.getElementsByTagName ('title')[0].innerHTML;
}
fanfic.cleanTitle();
libHtml.cleanBody();
libHtml.delAttributes();
document.body.removeAnnotations();
fanfic.text = document.body.innerHTML;
fanfic.toPage();
addCss ([ 'structure', 'perso' ]);
var style = document.getElementsByTagName ('style')[0];
if (style === undefined){
	style = document.createElement ('style');
	document.head.appendChild (style);
}
style.innerHTML = style.innerHTML + styleLocal;
var downloadText = document.getElementsByTagName ('html')[0].innerHTML.replaceAll ('> ','>');
downloadText = '<!DOCTYPE html><html>' + downloadText + '</html>';
libHtml.downloadFile (fanfic.title +'.html', downloadText);
/*
const fileCss = 'file:///C:/wamp64/www/site-dp/library-css/perso.css';
function openLibFile (filePath){
	const xhttp = new XMLHttpRequest();
	xhttp.open ('GET', filePath, false);
	xhttp.send();
	if (xhttp.status ==0 || xhttp.status ==200) return xhttp.responseText;
	else return "rien";
}
const res = openLibFile (fileCss);
console.log (res);
*/