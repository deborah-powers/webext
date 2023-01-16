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
	fanfic.autlink = head.findTag ('a').href;
	fanfic.subject = 'fanfic';
	// le texte, y compris les autres chapitres
	const chapters = document.body.findTag ('chap_select');
	document.body.replaceTag ('storytextp');
	if (chapters) document.body.appendChild (chapters);
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
	fanfic.autlink = 'https://www.test-recette.fr/recette/';
	document.body.replaceTag ('container');
	document.body.innerHTML = document.body.children[0].innerHTML;
}
else if (window.location.href.includes ('https://stackoverflow.com/questions/') || window.location.href.includes ('/stackoverflow')){
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