const modelHtml = 'common-page.html';	// les modèles doivent être déclarés dans manifest.json / web_accessible_resources
var htmlTemplate = openfileWebExt (modelHtml);
var pageOriginale = document.body.innerText;

const title = window.location.href.findTitleFromUrl();
htmlTemplate = htmlTemplate.replace ('<title></title>', '<title>' + title + '</title>');

function findMetaLocal (metadata, title){
	// les principales métadonnées
	htmlTemplate = htmlTemplate.replaceAll ('$titre', title);
	if (""=== metadata['lien']){
		htmlTemplate = htmlTemplate.replace ("<a href='$lien'>", "");
		htmlTemplate = htmlTemplate.replace ('</a>', "");
	}
	else htmlTemplate = htmlTemplate.replace ('$lien', metadata['lien']);
	if (! exists (metadata['autlink'])){
		htmlTemplate = htmlTemplate.replace ("<a href='$lienAuteur'>", "");
		htmlTemplate = htmlTemplate.replace ('$auteur</a>', '$auteur');
	}
	else htmlTemplate = htmlTemplate.replace ('$lienAuteur', metadata['autlink']);
	htmlTemplate = htmlTemplate.replace ('$auteur', metadata['auteur']);
	htmlTemplate = htmlTemplate.replace ('$sujet', metadata['sujet']);
	// les autres métadonnées
	const metaTemplate = '<dt>$key</dt><dd>$value</dd>$meta';
	var metaText ="";
	for (var m in metadata) if (! [ 'auteur', 'sujet', 'lien' ].includes (m)){
		metaText = metaTemplate.replace ('$key', m);
		if (metadata[m].substring (0,4) === 'http'){
			const d=1+ metadata[m].lastIndexOf ('/');
			const titleLink = metadata[m].substring (d).cleanTitle();
			metadata[m] = "<a href='" + metadata[m] +"'>"+ titleLink + '</a>';
		}
		metaText = metaText.replace ('$value', metadata[m]);
		htmlTemplate = htmlTemplate.replace ('$meta', metaText);
	}
	htmlTemplate = htmlTemplate.replace ('$meta', "");
	// créer la page
	htmlTemplate = htmlTemplate.replace ('$text', document.body.innerHTML);
	// le lien de téléchargement
	var textEncoded = encodeURIComponent (htmlTemplate);
	textEncoded = textEncoded.replaceAll ("'", '%27');
	htmlTemplate = htmlTemplate.replace ('$data', textEncoded);
	document.body.innerHTML = htmlTemplate.sliceWords ('<body>', '</body>');
	document.head.innerHTML = htmlTemplate.sliceWords ('<head>', '</head>') + document.head.innerHTML;
}
const metadata = prepareText();
findMetaLocal (metadata, title);
resizeCodeBlocks();