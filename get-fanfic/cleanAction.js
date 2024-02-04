var header =`<title>$title</title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<meta name='author' content='$author'/>
	<meta name='subject' content='$subject'/>
	<meta name='link' content='$link'/>
	<meta name='autlink' content='$autlink'/>`;
var storyTemplate = "<h1>$title</h1><h2><a href='$autlink'>auteur: $author</a></h2>";

// récupérer le titre et nettoyer les headers
header = header.replace ('$link', window.location.href);
document.body.delAttribute();

function findSubject (subjectStart, title){
	if (subject !== undefined){
		subject = subject.replaceAll ('/', ', ');
		subject = subject.replaceAll ('-', ', ');
	}
	const storyData = title.toLowerCase() +'\t'+ subjectStart.toLowerCase();
	var subjectList ="";
	const subjectDict = {
		romance: ['romance', ' sex', 'x reader', 'rasmus', 'ville valo', 'jyrki', 'him (band)', '30 seconds to mars', 'integra', 'axi'],
		rocker: ['rasmus', 'ville valo', 'jyrki', '69eyes', '69 eyes', 'him (band)', '30 seconds to mars'],
		tstm: ['30 seconds to mars' ],
		him: ['him (band)', 'ville valo'],
		eyes69: ['jyrki', '69eyes', '69 eyes' ],
		hellsing: ['integra', 'axi'],
		monstre: ['mythology', 'vampire', 'naga'],
		sf: ['mythology', 'vampire', 'scify', 'naga'],
		tricot: ['tricot', 'point', 'crochet']
	};
	for (var key in subjectDict){
		if (subjectDict[key].constructor.name === 'Array')
			for (var w=0; w< subjectDict[key].length; w++){
				if (storyData.includes (subjectDict[key][w]) && ! subjectList.includes (key)) subjectList = subjectList +', '+ key;
	}}
	if (subjectList ==="") subjectList = ', divers';
	return subjectList.slice (2);
}
if (window.location.href.includes ('googleads') || window.location.href.includes ('.g.doubleclick.'))
	console.log ("dépendence appelée", window.location.href);
else{
	var title ="";
	var subject ="";
	var author ="";
	var autlink ="";
	if (window.location.href.includes ('https://www.fanfiction.net/s/')){
		document.body.findTagReplace ('content_parent');
		// les métadonnées
		var head = document.body.findTag ('profile_top');
		title = head.findTag ('b').innerText;
		author = head.findTag ('a').innerText;
		autlink = head.findTag ('a').href;
		// le sujet
		head = document.body.findTag ('pre_story_links');
		const heads = head.getElementsByTagName ('a');
		var subject = heads [heads.length -1].innerHTML;
		subject = findSubject (subject, title);
		if (subject === 'divers') subject = 'fanfic';
		document.body.clean();
		// le texte, y compris les autres chapitres
		const chapters = document.body.findTag ('chap_select');
		document.body.findTagReplace ('storytextp');
		if (chapters) document.body.appendChild (chapters);
	}
	else if (window.location.href.includes ('https://archiveofourown.org/works/')){
		document.body.findTagReplace ('main');
		const subjects = document.body.findTag ('work meta group').getElementsByTagName ('dd');
		for (var s=0; s< subjects.length; s++){
			if (subjects[s].className.includes ('fandom') || subjects[s].className.includes ('character')) subject = subject +' '+ subjects[s].innerText;
		}
		var infos = document.getElementsByClassName ('preface group')[0];
		author = infos.getElementsByTagName ('a')[0].innerText.toLowerCase().cleanTxt();
		var autlink = infos.getElementsByTagName ('a')[0].getAttribute ('href');
		document.body.findTagReplace ('workskin');
		title = document.getElementsByTagName ('h2')[0].innerHTML.toLowerCase().cleanTxt();
		subject = findSubject (subject, title);
		if (subject === 'divers') subject = 'fanfic';
		// récupérer le texte
		document.body.findTagReplace ('chapters');
		infos = document.getElementsByClassName ('userstuff module');
		var text ="";
		for (var c=0; c< infos.length; c++) text = text + infos[c].innerHTML + '<hr/>';
		document.body.innerHTML = text;
	}
	else{
		console.log (window.location.href);
		var title = document.head.getElementsByTagName ('title')[0].innerHTML;
		title = title.toLowerCase().cleanHtml();
	}
	header = header.replace ('$title', title.cleanHtml().toLowerCase());
	header = header.replace ('$author', author.cleanHtml().toLowerCase());
	header = header.replace ('$autlink', autlink);
	header = header.replace ('$subject', subject.cleanHtml().toLowerCase());
	storyTemplate = storyTemplate.replace ('$title', title.cleanHtml().toLowerCase());
	storyTemplate = storyTemplate.replace ('$author', author.cleanHtml().toLowerCase());
	storyTemplate = storyTemplate.replace ('$autlink', autlink);
	document.head.innerHTML = header;
	document.body.cleanBody();
	document.body.delIds();
	document.body.innerHTML = document.body.innerHTML.usePlaceholders();
	document.body.innerHTML = storyTemplate + document.body.innerHTML;
}