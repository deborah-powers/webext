document.body.innerHTML = document.body.innerHTML.cleanHtml();
var fanfic = new Fanfic();
fanfic.title = findTitle();
fanfic.cleanTitle();
fanfic.findSubject();
var styleLocal ="";

if (window.location.href.includes ('https://menace-theoriste.fr/')){
	document.body.cleanBody();
	document.body.replaceTag ('wrap_all');
	document.body.replaceTag ('main');
}
else if (window.location.href.includes ('https://www.fanfiction.net/s/')){
	document.body.replaceTag ('content_parent');
	// les métadonnées
	const head = document.body.findTag ('profile_top');
	fanfic.title = head.findTag ('b').innerText;
	fanfic.author = head.findTag ('a').innerText;
	fanfic.authlink = head.findTag ('a').href;
	fanfic.subject = 'fanfic';
	// le texte, y compris les autres chapitres
	const chapters = document.body.findTag ('chap_select');
	document.body.replaceTag ('storytextp');
	if (chapters) document.body.appendChild (chapters);
}
else if (window.location.href.includes ('https://archiveofourown.org/works/')){
	document.body.replaceTag ('main');
	document.body.replaceTag ('inner');
	// trouver le sujet
	var tag = document.body.findTag ('wrapper');
	tag.replaceTagList ('dd');
	tag.replaceTagList ('a');
	fanfic.subject ="";
	for (var a=0; a< tag.children.length; a++) fanfic.subject = fanfic.subject +', '+ tag.children[a].innerText;
	// trouver les autres infos
	document.body.replaceTag ('workskin');
	fanfic.title = document.body.findTag ('title heading').innerText;
	// trouver l'auteur
	tag = document.body.findTag ('a');
	fanfic.author = tag.innerText;
	fanfic.authlink = tag.getAttribute ('href');
	// trouver le texte
	document.body.replaceTag ('chapters');
	document.body.replaceTagList ('userstuff module');
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<h3 class="landmark heading" id="work">Chapter Text</h3>', "");
	document.body.innerHTML = document.body.innerHTML.replaceAll ('<h3 class="landmark heading" id="work">Work Text:</h3>', "");
}
else if (window.location.href.includes ('https://www.gutenberg.org/cache/epub/')){
	// les métadonnées
	var metas = document.head.findTagList ('meta');
	for (var m=0; m< metas.length; m++){
		if (metas[m].name === 'dc.title') fanfic.title = metas[m].content;
		else if (metas[m].name === 'dcterms.source') fanfic.link = metas[m].content;
		else if (metas[m].name === 'dc.creator') fanfic.author = metas[m].content;
	}
	// le texte
	document.body.replaceTagList ('chapter');
}
else if (window.location.href.includes ('https://disic.github.io/guide-lecteurs_ecran')){
	fanfic.title = 'guide lecteur ecran z';
	fanfic.subject = 'programmation, accessibilité';
	fanfic.author = 'dinsic';
	document.body.replaceTag ('wrapper');
	const next = document.getElementsByTagName ('nav')[0].getElementsByTagName ('a')[0];
	document.body.replaceTag ('main');
	document.body.innerHTML = next.outerHTML + document.body.innerHTML;
}
else if (window.location.href.includes ('https://www.test-recette.fr/recette/')){
	document.body.cleanBody();
	fanfic.title = document.getElementsByTagName ('title')[0].innerHTML;
	fanfic.subject = 'programmation';
	fanfic.author = 'test-recette';
	fanfic.authlink = 'https://www.test-recette.fr/recette/';
	document.body.replaceTag ('container');
	document.body.innerHTML = document.body.children[0].innerHTML;
}
else if (window.location.href.includes ('https://stackoverflow.com/questions/')){
	document.body.replaceTag ('container');
	document.body.replaceTag ('content');
	document.body.replaceTag ('inner-content');
	var title = '<h1>' + document.body.findTag ('h1').innerText + '</h1>';
	title = title + '<p>' + document.body.children[1].children[1].findTag ('a').innerHTML + '</p>';
	document.body.replaceTag ('mainbar');
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
}
img { max-width: 100%; }`;
}
else{
	fanfic.title = document.getElementsByTagName ('title')[0].innerHTML;
}
fanfic.cleanTitle();
document.body.cleanBody();
document.body.delAttributes();
document.body.delIds();
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
var downloadText = document.getElementsByTagName ('body')[0].innerHTML.replaceAll ('> ','>');
downloadText = '<!DOCTYPE html><html><head>' + fanfic.fillHeader() + '</head><body>' + downloadText + '</body></html>';
downloadFile (fanfic.title +'.html', downloadText);

