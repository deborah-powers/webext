// importer mes scipts et styles persos
var headPage =`
	<title>$page | audit rgaa</title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<base target='_blank'>
	<link rel='icon' type='image/svg+xml' href='file:///C:/wamp64/www/site-dp/data/nounours-perso.svg' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/structure.css' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/perso.css' media='screen' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/shapes.css' />
`;
// récupérer les metadonnées de mes articles
var pageFinale = `<h1>audit de la page<a href='$lien'>$page</a></h1><p>par $auditeur</p><p>le $date</p>
<h2>score</h2>
<p>106 critères en tout</p>
<p>$nbCf critères conformes.</p>
<p>$nbNc critères non conformes.</p>
<p>$nbNa critères non applicables.</p>
<p>$nbNt critères non testés.</p>
<p>$nbDe critères dérrogés.</p>
<p>score: $nbCf / $bareme</p>
<h2>grille</h2>
<table>
<tr><td>thématique</td><td>critère</td><td>conformité</td><td>dérrogation</td><td>critère</td><td>commentaire</td></tr>
$tableau`;
// variable de import-js
crutialData =`
count: function (text, word){ return text.count (word); },
cleanTxt: function (text){ return text.cleanTxt(); }
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
const htmlLib = callLibrary ([ 'textFct', 'htmlFct' ]);
var pageOriginale = htmlLib.cleanTxt (document.body.innerHTML);

// rajourer les métadonnées du header
trouverMetadonneeHeader ("ate d'audit", 'date');
trouverMetadonneeHeader ('udité par', 'auditeur');
trouverMetadonneeHeader ('age audité', 'page');
trouverMetadonneeHeader ('ien de la page', 'lien');
headPage = headPage.replace ('$page', pageName);
document.head.innerHTML = headPage;

// traiter le texte
var d=3+ pageOriginale.indexOf ('== 01');
pageOriginale = pageOriginale.substring (d, pageOriginale.length -6);

// repérer les commentaires
var tables = pageOriginale.split ('\n');
for (var t=1; t< tables.length; t++){
	if (! tables[t].includes ('\t') && ! tables[t].includes ('== ')) tables[t] ='\t'+ tables[t];
	else tables[t] ='\n'+ tables[t];
}
pageOriginale = tables.join ("");
tables = pageOriginale.split ('\n');
for (var t=1; t< tables.length; t++) if (3=== htmlLib.count (tables[t], '\t')){ tables[t] = tables[t] +'\t.'; }
pageOriginale = tables.join ('\n');
// traiter les critères
tables = pageOriginale.split ('\n== ');
var tableStr ="";
for (var table of tables){
	d= table.indexOf ('\n');
	const tableName = table.substring (0,d);
	table = table.substring (d);
	table = table.replaceAll ('\n', '\n'+ tableName +'\t');
	tableStr = tableStr + table;
}
// calculer le score
const nbCf = htmlLib.count (tableStr, '\tc\t');
const nbNc = htmlLib.count (tableStr, '\tnc\t');
const nbNa = htmlLib.count (tableStr, '\tna\t');
const nbNt = htmlLib.count (tableStr, '\tnt\t');
const nbDe = htmlLib.count (tableStr, '\td\t');
const bareme = nbCf + htmlLib.count (tableStr, '\tnc\tn\t');
pageFinale = pageFinale.replaceAll ('$nbCf', nbCf.toString());
pageFinale = pageFinale.replace ('$nbNc', nbNc.toString());
pageFinale = pageFinale.replace ('$nbNa', nbNa.toString());
pageFinale = pageFinale.replace ('$nbNt', nbNt.toString());
pageFinale = pageFinale.replace ('$nbDe', nbDe.toString());
pageFinale = pageFinale.replace ('$bareme', bareme.toString());

// afficher mon travail
tableStr = tableStr.replaceAll ('\n', '</td></tr><tr><td>');
tableStr = tableStr.replaceAll ('\t', '</td><td>');
tableStr = '<table>' + tableStr + '</table>';
pageFinale = pageFinale.replace ('$tableau', tableStr);
document.body.innerHTML = pageFinale;
// le style
const styleList =[ 'structure', 'perso' ];
addCss (styleList);
