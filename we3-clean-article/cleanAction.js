var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
`;
document.body.cleanBody();
var fanfic = new Fanfic();

if (window.location.href.includes ('https://menace-theoriste.fr/')){
	document.body.findTagReplace ('wrap_all');
	document.body.findTagReplace ('main');
}
else if (window.location.href.includes ('https://www.fanfiction.net/s/')){
	document.body.findTagReplace ('content_parent');
	// les métadonnées
	const head = document.body.findTag ('profile_top');
	fanfic.title = head.findTag ('b').innerText;
	fanfic.author = head.findTag ('a').innerText;
	fanfic.authlink = head.findTag ('a').href;
	fanfic.subject = 'fanfic';
	// le texte, y compris les autres chapitres
	const chapters = document.body.findTag ('chap_select');
	document.body.findTagReplace ('storytextp');
	if (chapters) document.body.appendChild (chapters);
}
else if (window.location.href.includes ('https://archiveofourown.org/works/')){
	document.body.findTagReplace ('main');
	document.body.findTagReplace ('inner');
	// trouver le sujet
	var tag = document.body.findTag ('wrapper');
	tag.findTagListReplace ('dd');
	tag.findTagListReplace ('a');
	fanfic.subject ="";
	for (var a=0; a< tag.children.length; a++) fanfic.subject = fanfic.subject +', '+ tag.children[a].innerText;
	// trouver les autres infos
	document.body.findTagReplace ('workskin');
	fanfic.title = document.body.findTag ('title heading').innerText;
	// trouver l'auteur
	tag = document.body.findTag ('a');
	fanfic.author = tag.innerText;
	fanfic.authlink = tag.getAttribute ('href');
	// trouver le texte
	document.body.findTagReplace ('chapters');
	document.body.findTagListReplace ('userstuff module');
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
	document.body.findTagListReplace ('chapter');
}
else{
	fanfic.title = document.getElementsByTagName ('title')[0].innerHTML;
	document.body.findTagReplace ('main');
}

fanfic.cleanTitle();
fanfic.findSubject();
document.body.removeAnnotations();
document.body.innerHTML = document.body.innerHTML.usePlaceholders();
header = header.replace ('<title></title>', '<title>' + fanfic.title + '</title>');
document.head.innerHTML = header;
document.body.delIds();
fanfic.text = document.body.innerHTML;
sendToBackend (fanfic.toData());
