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

// TODO à merger et adapter

if (window.location.href.includes ('https://archiveofourown.org/works/') && ! window.location.href.includes ('/search?')){
	// les fanfics
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

// ------------ recherche de fanfics ------------

function navPrev(){
	const navList = document.getElementsByClassName ('pagination')[0];
	var page = '#';
	if (navList.children[0].children[0].tagName === 'A') page = navList.children[0].children[0].href;
	searchHead = searchHead.replace ('$prevPage', page);
	page = '#';
	if (navList.children [navList.children.length -1].children[0].tagName === 'A') page = navList.children [navList.children.length -1].children[0].href;
	searchHead = searchHead.replace ('$nextPage', page);
}
function cleanFicList(){
	const ficList = document.getElementsByClassName ('work index group')[0];
	var fanfics ="";
	for (var f=0; f< ficList.children.length; f++) fanfics = fanfics + ficList.children[f].cleanFic();
	document.body.innerHTML = searchHead;
	document.body.innerHTML = document.body.innerHTML + fanfics;
}
HTMLLIElement.prototype.cleanFic = function(){
	const title = this.getElementsByTagName ('h4')[0];
	var locBlock = ficBlock.replace ('$ficTitle', title.children[0].innerText);
	locBlock = locBlock.replace ('$ficLink', title.children[0].href);
	if (title.innerText.includes ('by Anonymous')){
		locBlock = locBlock.replace ('$author', 'Anonymous');
		locBlock = locBlock.replace ('$autLink', '#');
	}
	else{
		locBlock = locBlock.replace ('$author', title.children[1].innerText);
		locBlock = locBlock.replace ('$autLink', title.children[1].href);
	}
	var dataTag = this.getElementsByTagName ('ul')[0].getElementsByTagName ('a')[2];
	// les fics que je n'aime pas
	if ('M/M' === dataTag.innerText) return "";
	else{
		// mes fics choisies
		locBlock = locBlock.replace ('$updated', this.getElementsByTagName ('p')[0].innerText);
		var tagList = this.getElementsByTagName ('h5')[0].getElementsByTagName ('a');
		var tagText ="";
		for (var t=0; t< tagList.length; t++) tagText = tagText + tagList[t].outerHTML;
		locBlock = locBlock.replace ('$fandomList', tagText);
		tagList = this.getElementsByTagName ('ul')[1].getElementsByTagName ('a');
		tagText ="";
		for (var t=0; t< tagList.length; t++) tagText = tagText + tagList[t].outerHTML;
		locBlock = locBlock.replace ('$tagList', tagText);
		dataTag = this.getElementsByTagName ('blockquote')[0];
		if (undefined !== dataTag) locBlock = locBlock.replace ('$summary', dataTag.outerHTML);
		else locBlock = locBlock.replace ('\n\t$summary', "");
		return locBlock;
}}
// ------------ o ------------

function cleanPage(){
	document.body.findTagReplace ('main');
	document.body.findTagReplace ('inner');
	document.body.removeEmptyTag();
if (window.location.href.includes ('/users/')){
	// liste de fics d'un auteur. https://archiveofourown.org/users/KaraCee/pseuds/KaraCee
	// l'auteur
	var d=7+ window.location.href.indexOf ('/users/');
	var authorName = window.location.href.substring (d);
	if (authorName.includes ('/pseuds/')) d= authorName.substring (0,d);
	console.log ('users');
	document.body.findTagReplace ('user home');
	const userName = document.body.getElementsByTagName ('h2')[0].innerText;
	main = document.getElementsByTagName ('ol')[0];
	console.log (main);
	// liste de fanfics chez un auteur
	if (window.location.href.includes ('/works') || window.location.href.includes ('/bookmarks')){
		var lists = document.getElementsByTagName ('ol');
		var newBody = lists[0].outerHTML;
		var formSearch = document.getElementsByTagName ('form')[0];
		newBody = newBody + lists[1].cleanStories();
		document.body.innerHTML = newBody;
		document.body.children[O].cleanNavBar (formSearch);
	} else {
		var works = document.getElementById ('user-works');
		var worksStories = works.getElementsByTagName ('ul')[0].cleanStories();
		var worksLink = works.getElementsByClassName ('actions')[0].children[0];
		worksLink.innerHTML = 'quelques histoires';
		var bookmarks = document.getElementById ('user-bookmarks');
		var bookmarksStories = bookmarks.getElementsByTagName ('ol')[0].cleanStories();
		var tmpData = bookmarks.querySelectorAll ('ul.actions');
		var bookmarksLink = tmpData[tmpData.length -1].children[0];
		bookmarksLink.innerHTML = 'quelques favoris';
		document.body.innerHTML = worksLink.outerHTML + worksStories + bookmarksLink.outerHTML + bookmarksStories;
	}
	document.body.delAttribute();
	document.body.className = 'search';
}
else if (window.location.href.includes ('works?work_search')){
	// liste de fanfics
	// le tître
	var tmpTag = document.getElementsByTagName ('h2')[0];
	var d=7+ tmpTag.innerText.indexOf ('orks in');
	searchHead = searchHead.replace ('$title', tmpTag.innerText.substring (d));
	tmpTag = tmpTag.getElementsByTagName ('a')[0];
	searchHead = searchHead.replaceAll ('$tagLink', tmpTag.href);
	searchHead = searchHead.replaceAll ('$editSearch', 'https://archiveofourown.org/works/search?commit=Search&edit_search=true');
	navPrev();
	cleanFicList();
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
	navPrev();
	cleanFicList();
}
else if (window.location.href.includes ('/works/')){
	console.log ('works');
	var storyTemplate = `<h1>$title</h1>
	<nav><a href='$autLink'>auteur: $author</a>$navLinks</nav>
$text
<div id='infos-page' style='display: none;'>
	<p class='etat'>propre</p>
	<p class='subject'>subject: romance</p>
	<p class='author'>author: $author</p>
	<p class='autLink'>autLink: $autLink</p>
</div>
`;
	var headTemplate = `
	<title>$title</title>
	<meta name='viewport' content='width=device-width, initial-scale=1'/>
	<meta charset='utf-8'/>
	<meta name='author' content='$author'/>
	<meta name='subject' content='romance'/>
	<meta name='link' content='$link'/>
	<meta name='autlink' content='$autLink'/>
`;
	var actions = document.getElementsByClassName ('work navigation actions')[0];
	var navLinks ="";
	var c=0;
	if (actions !== undefined){
		while (c< actions.children.length){
			if (actions.children[c].tagName === 'A'){
				if (actions.children[c].innerHTML.includes ('Comments')) c= actions.children.length;
				else navLinks = navLinks + actions.children[c].outerHTML;
			} c++;
	}}
	// récupérer l'auteur
	var infos = document.getElementsByClassName ('preface group')[0];
	var author = infos.getElementsByTagName ('a')[0].innerText.toLowerCase().cleanTxt();
	var autLink = infos.getElementsByTagName ('a')[0].getAttribute ('href');
	document.body.findTag ('workskin');
	var title = document.getElementsByTagName ('h2')[0].innerHTML.toLowerCase().cleanTxt();
	var chapList = document.getElementsByClassName ('userstuff');
	var text ="";
	var c=0;
	if (chapList.length ===1) text = chapList[0].innerHTML;
	else for (var c=0; c< chapList.length; c++) text = text + chapList[c].outerHTML;
	document.body.findTag ('userstuff module');
	storyTemplate = storyTemplate.replace ('$text', text);
	storyTemplate = storyTemplate.replace ('$title', title);
	storyTemplate = storyTemplate.replaceAll ('$author', author);
	storyTemplate = storyTemplate.replaceAll ('$autLink', autLink);
	storyTemplate = storyTemplate.replace ('$navLinks', navLinks);
	headTemplate = headTemplate.replaceAll ('$link', window.location.href);
	headTemplate = headTemplate.replace ('$title', title);
	headTemplate = headTemplate.replaceAll ('$author', author);
	headTemplate = headTemplate.replaceAll ('$autLink', autLink);
	document.body.innerHTML = storyTemplate;
	document.head.innerHTML = headTemplate;
	if (c>0) document.body.className = 'multi-chapter';
//	document.body.innerHTML = document.body.innerHTML.replace ('<h3>Work Text:</h3>');
}}