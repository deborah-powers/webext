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
<style>
	td.non-teste { background-color: var(--fond-color); }
	td.non-conforme { background-color: orange; }
	td.conforme { background-color: springgreen; }
	td.derroge { background-color: skyblue; }
</style>`;
// récupérer les metadonnées de mes articles
var pageFinale = `<h1>audit de la page<a href='$lien'>$page</a></h1><p>par $auditeur</p><p>le $date</p>
<h2>score</h2>
<p>106 critères en tout</p>
<p>$nbCf critères conformes.</p>
<p>$nbNc critères non conformes.</p>
<p>$nbNa critères non applicables.</p>
<p>$nbNt critères non testés.</p>
<p>$nbDe critères dérrogés.</p>
<p>score: $score %. la page est $conformite</p>
<h2>grille</h2>
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
var tableau ="";
for (var t=0; t< tables.length; t++){
	tables[t] = tables[t].replace ('\n', '</caption><tr><th>critère</th><th>conformité</th><th>dérrogation</th><th>critère</th><th>commentaire</th></tr><tr><td>');
	tables[t] = tables[t].replaceAll ('\n', '</td></tr><tr><td>');
	tables[t] = tables[t].replaceAll ('\t', '</td><td>');
}
tableau = tables.join ('</td></tr></table><table><caption>');
tableau = '<table><caption>' + tableau + '</td></tr></table>';
/*
for (var table of tables){
	d= table.indexOf ('\n');
	const tableName = table.substring (0,d);
	table = table.substring (d);
	table = table.replaceAll ('\n', '\n'+ tableName +'\t');
	tableau = tableau + table;
}*/
// calculer le score
const nbCf = htmlLib.count (tableau, '>c<');
const nbNc = htmlLib.count (tableau, '>nc<');
const nbNa = htmlLib.count (tableau, '>na<');
const nbNt = htmlLib.count (tableau, '>nt<');
const nbDe = htmlLib.count (tableau, '>d<');
const score = 100* nbCf / (nbCf + htmlLib.count (tableau, '>nc</td><td>n<'));
var conformite = 'non conforme';
if (score ===100) conformite = 'totalement conforme';
else if (score >=50) conformite = 'partiellement conforme';
pageFinale = pageFinale.replace ('$nbCf', nbCf.toString());
pageFinale = pageFinale.replace ('$nbNc', nbNc.toString());
pageFinale = pageFinale.replace ('$nbNa', nbNa.toString());
pageFinale = pageFinale.replace ('$nbNt', nbNt.toString());
pageFinale = pageFinale.replace ('$nbDe', nbDe.toString());
pageFinale = pageFinale.replace ('$score', score.toString());
pageFinale = pageFinale.replace ('$conformite', conformite);

// afficher mon travail
/*
tableau = tableau.replaceAll ('\n', '</td></tr><tr><td>');
tableau = tableau.replaceAll ('\t', '</td><td>');
tableau = '<table><tr><th>thématique</th><th>critère</th><th>conformité</th><th>dérrogation</th><th>critère</th><th>commentaire</th></tr>' + tableau + '</table>';
*/
tableau = tableau.replaceAll ('>c<', " class='conforme'>conforme<");
tableau = tableau.replaceAll ('>nc<', " class='non-conforme'>non conforme<");
tableau = tableau.replaceAll ('>nt<', " class='non-teste'>non testé<");
tableau = tableau.replaceAll ('>d<', " class='derroge'>dérrogé<");
tableau = tableau.replaceAll ('>na<', ">non applicable<");
tableau = tableau.replaceAll ('>n<', ">suivi<");
pageFinale = pageFinale.replace ('$tableau', tableau);
document.body.innerHTML = pageFinale;
// le style
const styleList =[ 'structure', 'perso' ];
addCss (styleList);
