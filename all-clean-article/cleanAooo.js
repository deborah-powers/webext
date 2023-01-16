fanfic.style = `div > a {
	display: inline-block;
	margin: 0;
	margin-left: 1em;
}
div > h3 {
	display: inline-block;
	margin: 0;
}
article { margin-top: 1em; }`;

var searchHead = `<header>
<h1>$title</h1>
<nav>
<a href='$tagLink/works'>works</a>
<a href='$tagLink/bookmarks'>bookmarks</a>
<a href='$prevPage'>previous</a>
<a href='$nextPage'>next</a>
<a href='$editSearch'>search</a>
</nav></header>`;
const ficBlock =`<article>
	<h2><a href='$ficLink'>$ficTitle</a>, by <a href='$autLink'>$author</a></h2>
	$summary
	<p>updated: $updated</p>
	<div><h3>fandoms</h3>$fandomList</div>
	<div><h3>tags</h3>$tagList</div>
</article>`;

function getNavigation(){
	const navList = document.getElementsByClassName ('pagination')[0];
	var page = '#';
	if (navList !== undefined && navList.children[0].children[0].tagName === 'A') page = navList.children[0].children[0].href;
	searchHead = searchHead.replace ('$prevPage', page);
	page = '#';
	if (navList !== undefined && navList.children [navList.children.length -1].children[0].tagName === 'A') page = navList.children [navList.children.length -1].children[0].href;
	searchHead = searchHead.replace ('$nextPage', page);
}
HTMLLIElement.prototype.getFicSnippet = function(){
	// rejeter les fanfics que je n'aime pas
	if (this.innerText.includes ('his has been deleted, sorry')) return "";
	var tagParent = document.getElementsByClassName ('required-tags')[0];
	if (tagParent.innerText.includes ('incest') || tagParent.innerText.includes ('Underage Sex')) return "";
	else if (tagParent.innerText.includes ('M/M') && ! tagParent.innerText.includes ('F/')) return "";
	// les infos basiques
	const title = this.getElementsByTagName ('h4')[0];
	var locBlock = ficBlock.replace ('$ficTitle', title.children[0].innerText);
	locBlock = locBlock.replace ('$ficLink', title.children[0].href);
	if (title.innerText.includes ('by Anonymous')){
		locBlock = locBlock.replace ('$author', 'Anonymous');
		locBlock = locBlock.replace ('$autLink', '#');
	}else{
		locBlock = locBlock.replace ('$author', title.children[1].innerText);
		locBlock = locBlock.replace ('$autLink', title.children[1].href);
	}
	locBlock = locBlock.replace ('$updated', this.getElementsByClassName ('datetime')[1].innerText);
	var tagList = this.getElementsByTagName ('h5')[0].getElementsByTagName ('a');
	var tagText = '<ul>';
	for (var t=0; t< tagList.length; t++) tagText = tagText + '<li>' + tagList[t].outerHTML + '</li>';
	tagText = tagText + '</ul>';
	locBlock = locBlock.replace ('$fandomList', tagText);
	tagList = this.getElementsByTagName ('ul')[1].getElementsByTagName ('a');
	tagText = '<ul>';
	for (var t=0; t< tagList.length; t++) tagText = tagText + '<li>' + tagList[t].outerHTML + '</li>';
	tagText = tagText + '</ul>';
	locBlock = locBlock.replace ('$tagList', tagText);
	const dataTag = this.getElementsByTagName ('blockquote')[0];
	if (undefined !== dataTag) locBlock = locBlock.replace ('$summary', dataTag.outerHTML);
	else locBlock = locBlock.replace ('\n\t$summary', "");
	return locBlock;
}
document.body.replaceTag ('main');
// document.body.replaceTag ('inner');

if (window.location.href.includes ('/works/')){
	if (document.body.innerText.includes ('Adult Content Warning')){
		const choice = document.getElementsByClassName ('actions')[0].children[0].children[0];
		choice.target = '_self';
		choice.click();
	//	window.open (choice.href, '_self');
	}
	else{
		document.body.innerHTML = document.body.getElementsByClassName ('work')[0].innerHTML;
		// vérifier si la page est un avertissement
		// récupérer les métadonnées
		var meta = document.getElementsByTagName ('ul')[0];
		var metaText ="";
		if (window.location.href.includes ('/chapters/'))
			metaText = meta.children[0].outerHTML + meta.children[1].outerHTML + meta.children[2].outerHTML + meta.children[3].outerHTML;
		else if (window.location.href.includes ('view_full_work=true')) metaText = meta.children[0].outerHTML;
		meta = document.body.getElementsByClassName ('wrapper')[0].children[0];
		fanfic.subject = meta.children[7].innerText;
		if ('F/M' === meta.children[5].innerText || 'F/F' === meta.children[5].innerText) fanfic.subject = fanfic.subject + ', romance';
		metaText = '<ul>' + metaText + '<li>' + meta.children[17].children[0].children[3].innerText + '</li></ul>';
		document.body.innerHTML = document.getElementById ('workskin').innerHTML;
		meta = document.body.getElementsByTagName ('h3')[0];
		fanfic.author = meta.innerText;
		fanfic.autlink = meta.getElementsByTagName ('a')[0].href;
		fanfic.title = document.body.getElementsByTagName ('h2')[0].innerText;
		// récupérer le texte
		document.body.innerHTML = document.getElementById ('chapters').innerHTML;
		if (window.location.href.includes ('/chapters/')){
			const lines = document.getElementsByTagName ('p');
			for (var line of lines) metaText = metaText + line.outerHTML;
		}
		else if (window.location.href.includes ('view_full_work=true')){
			const chapters = document.body.getElementsByClassName ('userstuff');
			for (var chapter of chapters){
				var lines = document.getElementsByTagName ('p');
				for (var line of lines) metaText = metaText + line.outerHTML;
				metaText = metaText + '<hr/>';
		}}
		document.body.innerHTML = metaText;
}}
else if (window.location.href.includes ('/users/')){
	// page de l'auteur
	getNavigation();
	searchHead = searchHead.replace ('$title', document.getElementsByClassName ('heading')[0].innerText);
	const ficItems = document.getElementsByClassName ('index group')[0].children;
	var ficList ="";
	for (var fic of ficItems) ficList = ficList + fic.getFicSnippet();
	document.body.innerHTML = searchHead + ficList;
}
/*
// TODO à merger et adapter
else if (window.location.href.includes ('/works/search?'))	// recherche par mot-clefs

// ------------ o ------------

if (window.location.href.includes ('works?work_search')){
	// liste de fanfics
	// le tître
	var tmpTag = document.getElementsByTagName ('h2')[0];
	var d=7+ tmpTag.innerText.indexOf ('orks in');
	searchHead = searchHead.replace ('$title', tmpTag.innerText.substring (d));
	tmpTag = tmpTag.getElementsByTagName ('a')[0];
	searchHead = searchHead.replaceAll ('$tagLink', tmpTag.href);
	searchHead = searchHead.replaceAll ('$editSearch', 'https://archiveofourown.org/works/search?commit=Search&edit_search=true');
	getNavigation();
	getFicSnippetList();
}
else if (window.location.href.includes ('/works/search?')){
	// liste de fanfics
//	document.body.findTagReplace ('inner');
	// le tître
	var tmpTag = document.getElementsByTagName ('h4')[0];
	var tmpText = tmpTag.innerText.substring (18);
	searchHead = searchHead.replace ('$title', tmpText);
	searchHead = searchHead.replaceAll ('$tagLink', '#');
	// la recherche
	tmpTag = document.getElementsByTagName ('ul')[0].children[0].children[0];
	searchHead = searchHead.replace ('$editSearch', tmpTag.href);
	getNavigation();
	getFicSnippetList();
}*/