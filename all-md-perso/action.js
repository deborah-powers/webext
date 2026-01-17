// importer mes scipts et styles persos
var headPage =`
	<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<base target='_blank'>
	<link rel='icon' type='image/svg+xml' href='file:///C:/wamp64/www/site-dp/data/nounours-perso.svg'/>
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/structure.css'/>
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/perso.css'/>
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/shapes.css'/>
`;
// récupérer les metadonnées de mes articles
var header = "<h1><a href='$lien'>$titre</a></h1><p>par <a href='$lienAuteur'>$auteur</a></p><p>à propos de $sujet</p>";
const title = window.location.href.findTitleFromUrl();
headPage = headPage.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = headPage;

function findMetaLocal (metadata, title){
	header = header.replace ('$titre', title);
//	console.log (metadata, metadata['autlink'], exists (metadata['autlink']), metadata.autlink, exists);

	if (""=== metadata['lien']){
		header = header.replace ("<a href='$lien'>", "");
		header = header.replace ('</a>', "");
	}
	else header = header.replace ('$lien', metadata['lien']);
	if (! exists (metadata['autlink'])){
		header = header.replace ("<a href='$lienAuteur'>", "");
		header = header.replace ('$auteur</a>', '$auteur');
	}
	else header = header.replace ('$lienAuteur', metadata['autlink']);
	header = header.replace ('$auteur', metadata['auteur']);
	header = header.replace ('$sujet', metadata['sujet']);
	if (exists (metadata['date'])) header = header + '<p>date: '+ metadata['date'] + '</p>';
	document.body.innerHTML = header + document.body.innerHTML;
}
const metadata = prepareText();
findMetaLocal (metadata, title);
