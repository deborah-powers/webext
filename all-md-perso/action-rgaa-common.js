// importer mes scipts et styles persos
var headPage =`
	<title>$page | audit rgaa</title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<base target='_blank'>
	<link rel='icon' type='image/svg+xml' href='file:///C:/wamp64/www/site-dp/data/nounours-perso.svg' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/structure.css' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/perso.css' media='screen' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/shapes.css' />`;
// récupérer les metadonnées de mes articles
var pageFinale = "<h1>rapport d'audit de la page<a href='$lien'>$page</a></h1><p>par $auditeur</p><p>le $date</p>";
// variable de import-js
crutialData =`
count: function (text, word){ return text.count (word); },
cleanTxt: function (text){ return text.cleanTxt(); },
fromText: function (text){ document.body.fromText (text); }
`;
var pageName ="";
function trouverMetadonneeHeader (nomMeta, codeMeta){
	var d=2+ nomMeta.length + pageOriginale.indexOf (nomMeta +": ");
	pageOriginale = pageOriginale.substring (d);
	d= pageOriginale.indexOf ('\n');
	pageFinale = pageFinale.replace ('$'+ codeMeta, pageOriginale.substring (0,d));
	if ('page' === codeMeta) pageName = pageOriginale.substring (0,d);
	pageOriginale = pageOriginale.substring (d+1);
}
var htmlLib = callLibrary ([ 'textFct', 'htmlFct' ]);
var pageOriginale = htmlLib.cleanTxt (document.body.innerHTML);

// rajourer les métadonnées du header
trouverMetadonneeHeader ("ate d'audit", 'date');
trouverMetadonneeHeader ('udité par', 'auditeur');
trouverMetadonneeHeader ('age audité', 'page');
trouverMetadonneeHeader ('ien de la page', 'lien');
headPage = headPage.replace ('$page', pageName);
document.head.innerHTML = headPage;
