const themeTable = '<table><caption>$titre</caption><tr><th>critère</th><th>conformité</th><th>dérrogation</th><th>critère</th><th>commentaire</th></tr><tr><td>$lignes</td></tr></table>';
const modelHtml = 'rgaa-grille-page.html';	// les modèles doivent être déclarés dans manifest.json / web_accessible_resources

crutialData =`
	strip: function (text, char){ return text.strip (char); },
	fromModel: function (text, model){ return text.fromModel (model); },
	toModel: function (text, dataDict){ return text.toModel (dataDict); },
	sliceWords: function (text, wordD, wordF){ return text.sliceWords (wordD, wordF); },
	count: function (text, word){ return text.count (word); },
	openWEfile: openWEfile
`;
const htmlLib = callLibrary ([ 'textFct', 'file' ]);
// les métadonnées
var htmlTemplate = htmlLib.openWEfile (modelHtml);
var pageOriginale = document.body.innerText;

function trouverMetadonneeHeader (nomMeta, codeMeta){
	var d=2+ nomMeta.length + pageOriginale.indexOf (nomMeta +": ");
	pageOriginale = pageOriginale.substring (d);
	d= pageOriginale.indexOf ('\n');
	htmlTemplate = htmlTemplate.replaceAll ('$'+ codeMeta, pageOriginale.substring (0,d));
	pageOriginale = pageOriginale.substring (d+1);
}
trouverMetadonneeHeader ("ate d'audit", 'date');
trouverMetadonneeHeader ('age audité', 'page');
trouverMetadonneeHeader ('ien de la page', 'lien');

// l'audit
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
	d= tables[t].indexOf ('\n')
	tableau = themeTable.replace ('$titre', tables[t].substring (0,d));
	tables[t] = tables[t].substring (d+1);
	tables[t] = htmlLib.strip (tables[t]);
	tables[t] = tables[t].replaceAll ('\n', '</td></tr><tr><td>');
	tables[t] = tables[t].replaceAll ('\t', '</td><td>');
	tables[t] = tableau.replace ('$lignes', tables[t]);
}
tableau = tables.join ('\n');
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

htmlTemplate = htmlTemplate.replace ('$nbCf', nbCf.toString());
htmlTemplate = htmlTemplate.replace ('$nbNc', nbNc.toString());
htmlTemplate = htmlTemplate.replace ('$nbNa', nbNa.toString());
htmlTemplate = htmlTemplate.replace ('$nbNt', nbNt.toString());
htmlTemplate = htmlTemplate.replace ('$nbDe', nbDe.toString());
htmlTemplate = htmlTemplate.replace ('$score', score.toString());
htmlTemplate = htmlTemplate.replace ('$conformite', conformite);

// afficher mon travail
tableau = tableau.replaceAll ('>c<', " class='conforme'>conforme<");
tableau = tableau.replaceAll ('>nc<', " class='non-conforme'>non conforme<");
tableau = tableau.replaceAll ('>nt<', " class='non-teste'>non testé<");
tableau = tableau.replaceAll ('>d<', " class='derroge'>dérrogé<");
tableau = tableau.replaceAll ('>na<', ">non applicable<");
tableau = tableau.replaceAll ('>n<', ">suivi<");
htmlTemplate = htmlTemplate.replace ('$tables', tableau);

document.body.innerHTML = htmlTemplate.sliceWords ('<body>', '</body>');
document.head.innerHTML = htmlTemplate.sliceWords ('<head>', '</head>');