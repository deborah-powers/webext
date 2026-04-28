const modelHtml = 'common-page.html';	// les modèles doivent être déclarés dans manifest.json / web_accessible_resources
// variable de import-js
crutialData =`
	exists: exists,
	prepareText: prepareText,
	findTitle: function (url){ return url.findTitleFromUrl(); },
	openWEfile: openWEfile
`;
const htmlLib = callLibrary ([ 'textFct', 'file', 'htmlFct' ]);

// les métadonnées
var htmlTemplate = htmlLib.openWEfile (modelHtml);
var pageOriginale = document.body.innerText;

const title = htmlLib.findTitle (window.location.href);
htmlTemplate = htmlTemplate.replace ('<title></title>', '<title>' + title + '</title>');

function findMetaLocal_va (metadata, title){
	// créer la page
	htmlTemplate = htmlTemplate.replaceAll ('$titre', title);
	if (""=== metadata['lien']){
		htmlTemplate = htmlTemplate.replace ("<a href='$lien'>", "");
		htmlTemplate = htmlTemplate.replace ('</a>', "");
	}
	else htmlTemplate = htmlTemplate.replace ('$lien', metadata['lien']);
	if (! htmlLib.exists (metadata['autlink'])){
		htmlTemplate = htmlTemplate.replace ("<a href='$lienAuteur'>", "");
		htmlTemplate = htmlTemplate.replace ('$auteur</a>', '$auteur');
	}
	else htmlTemplate = htmlTemplate.replace ('$lienAuteur', metadata['autlink']);
	htmlTemplate = htmlTemplate.replace ('$auteur', metadata['auteur']);
	htmlTemplate = htmlTemplate.replace ('$sujet', metadata['sujet']);
	// les autres métadonnées
	const metaTemplate = '<p>$key: $value</p>\n\t$text';
	var metaText ="";
	for (var m in metadata) if (! [ 'auteur', 'sujet', 'lien' ].includes (m)){
		metaText = metaTemplate.replace ('$key', m);
		metaText = metaText.replace ('$value', metadata[m]);
		htmlTemplate = htmlTemplate.replace ('$text', metaText);
	}
	// le lien de téléchargement
	htmlTemplate = htmlTemplate.replace ('$text', document.body.innerHTML);
	var textEncoded = encodeURIComponent (htmlTemplate);
	textEncoded = textEncoded.replaceAll ("'", '%27');
	htmlTemplate = htmlTemplate.replace ('$data', textEncoded);
	document.body.innerHTML = htmlTemplate.sliceWords ('<body>', '</body>');
	document.head.innerHTML = htmlTemplate.sliceWords ('<head>', '</head>');
}
function findMetaLocal (metadata, title){
	// créer la page
	htmlTemplate = htmlTemplate.replaceAll ('$titre', title);
	if (""=== metadata['lien']){
		htmlTemplate = htmlTemplate.replace ("<a href='$lien'>", "");
		htmlTemplate = htmlTemplate.replace ('</a>', "");
	}
	else htmlTemplate = htmlTemplate.replace ('$lien', metadata['lien']);
	if (! htmlLib.exists (metadata['autlink'])){
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
		metaText = metaText.replace ('$value', metadata[m]);
		htmlTemplate = htmlTemplate.replace ('$meta', metaText);
	}
	htmlTemplate = htmlTemplate.replace ('$meta', "");
	// le lien de téléchargement
	htmlTemplate = htmlTemplate.replace ('$text', document.body.innerHTML);
	var textEncoded = encodeURIComponent (htmlTemplate);
	textEncoded = textEncoded.replaceAll ("'", '%27');
	htmlTemplate = htmlTemplate.replace ('$data', textEncoded);
	document.body.innerHTML = htmlTemplate.sliceWords ('<body>', '</body>');
	document.head.innerHTML = htmlTemplate.sliceWords ('<head>', '</head>');
}
const metadata = htmlLib.prepareText();
findMetaLocal (metadata, title);