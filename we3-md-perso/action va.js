// récupérer les meta de mes articles
var head = "<h1><a href='$lien'>$titre</a></h1><p>par <a href='$laut'>$auteur</a></p><p>à propos de $sujet</p>";
var meta ={};
var text = document.body.children[0].innerHTML;

String.prototype.harmoniserMeta = function(){
	var text = this.cleanTxt();
	text = '\n'+ text;
	const metaFr =[ 'sujet', 'auteur', 'lien', 'titre', 'laut' ];
	const metaEn =[ 'subject', 'author', 'link', 'title' ];
	for (var m=0; m<4; m++){
		text = text.replace ('\n'+ metaEn[m] +':', '\n'+ metaFr[m] +':');
		text = text.replace ('\n'+ metaEn[m].toUpperCase() + metaEn[m].substring (1) +':', '\n'+ metaFr[m] +':');
	}
	for (var m of metaFr){
		text = text.replace ('\n'+ m+':\t', '\n'+ m+': ');
		text = text.replace ('\n'+ m[0].toUpperCase() + m.substring (1) +':\t', '\n'+ m+': ');
		text = text.replace ('\n'+ m[0].toUpperCase() + m.substring (1) +': ', '\n'+ m+': ');
	}
	return text.strip();
}
String.prototype.findMetaOne = function(){
	if (! this.includes (': ')) return false;
	const f= this.indexOf (': ');
	if (f<2 || f>9) return false;
	meta [this.substring (0,f).toLowerCase()] = this.substring (f+2).toLowerCase();
	return true;
}
String.prototype.findMeta = function(){
	// récupérer les meta
	var text = this.harmoniserMeta();
	var textList = text.split ('\n');
	var isMeta = textList[0].findMetaOne();
	var trash ="";
	while (isMeta){
		trash = textList.splice (0,1);
		isMeta = textList[0].findMetaOne();
	}
	// récupérer le titre
	if (meta['titre'] === undefined){
		var d=1+ window.location.pathname.lastIndexOf ('/');
		meta['titre'] = window.location.pathname.substring (d);
		if (meta['titre'].includes ('.')){
			d= meta['titre'].lastIndexOf ('.');
			meta['titre'] = meta['titre'].substring (0,d);
		}
		meta['titre'] = meta['titre'].replaceAll ('%20'," ");
	}
	// nettoyer les meta
	meta['lien'] = meta['lien'].replaceAll (" ","");
	meta['laut'] = meta['laut'].replaceAll (" ","");
	// afficher les meta dans le header
	if (meta['date'] !== undefined) head = head + '<p>date: $date</p>';
	for (const [key, value] of Object.entries (meta)) head = head.replace ('$'+ key, value);
	return textList.join ('\n');
}
// récupérer les meta de mes articles
text = text.findMeta();
// transformer le texte en html
text = text.toHtml();
text = text.toHtmlShapes();
if (! head.includes ('$lien')) text = head + text;
document.body.innerHTML = text.strip();
