// importer mes scipts et styles persos
document.head.innerHTML = document.head.innerHTML + `<style>
	td.non-teste { background-color: var(--fond-color); }
	td.non-conforme { background-color: orange; }
	td.conforme { background-color: springgreen; }
	td.derroge { background-color: skyblue; }
</style>`;
// résumé de l'audit
pageFinale = pageFinale + `<h2>score</h2>
<p>106 critères en tout</p>
<p>$nbCf critères conformes.</p>
<p>$nbNc critères non conformes.</p>
<p>$nbNa critères non applicables.</p>
<p>$nbNt critères non testés.</p>
<p>$nbDe critères dérrogés.</p>
<p>score: $score %. la page est $conformite</p>
<h2>grille</h2>
$tableau`;
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
