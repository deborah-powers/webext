// importer mes scipts et styles persos
var headPage =`
	<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<base target='_blank'>
	<link rel='icon' type='image/svg+xml' href='file:///C:/wamp64/www/site-dp/data/nounours-perso.svg'/>
`;
// récupérer les metadonnées de mes articles
var header = "<h1><a href='$lien'>$titre</a></h1><p>par <a href='$lienAuteur'>$auteur</a></p><p>à propos de $sujet</p>";
// variable de import-js
crutialData =`
	exists: exists,
	prepareText: prepareText,
	findTitle: function (url){ return url.findTitleFromUrl(); }
`;
const htmlLib = callLibrary ([ 'textFct', 'htmlFct' ]);
const title = htmlLib.findTitle (window.location.href);
headPage = headPage.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = headPage;
addCss ('structure');
addCss ('perso');
addCss ('shapes');

function findMetaLocal (metadata, title){
	header = header.replace ('$titre', title);
	if ('o' === metadata.lien ||! htmlLib.exists (metadata.lien)){
		header = header.replace ("<a href='$lien'>", "");
		header = header.replace ('</a>', "");
	}
	else header = header.replace ('$lien', metadata.lien);
	if ('o' === metadata.laut ||! htmlLib.exists (metadata.laut)){
		header = header.replace ("<a href='$lienAuteur'>", "");
		header = header.replace ('</a>', "");
	}
	else header = header.replace ('$lienAuteur', metadata.laut);
	if (htmlLib.exists (metadata.auteur)) header = header.replace ('$auteur', metadata.auteur);
	if (htmlLib.exists (metadata.sujet)) header = header.replace ('$sujet', metadata.sujet);
	if (htmlLib.exists (metadata.date)) header = header + '<p>date: '+ metadata.date + '</p>';
	document.body.innerHTML = header + document.body.innerHTML;
}
const metadata = htmlLib.prepareText();
findMetaLocal (metadata, title);
