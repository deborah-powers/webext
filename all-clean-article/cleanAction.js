console.log ('clean action');

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
else if (window.location.href.includes ('https://stackoverflow.com/questions/') || window.location.href.includes ('/stackoverflow')){
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
	fanfic.style = `body > div {
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