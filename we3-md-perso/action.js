// récupérer les metadonnées de mes articles
var head = "<h1><a href='$lien'>$titre</a></h1><p>par <a href='$laut'>$auteur</a></p><p>à propos de $sujet</p>";

function titleFromUrl(){
	var d=1+ window.location.pathname.lastIndexOf ('/');
	var title = window.location.pathname.substring (d);
	if (title.includes ('.')){
		d= title.lastIndexOf ('.');
		title = title.substring (0,d);
	}
	title = title.replaceAll ('%20'," ");
	title = title.replaceAll ('.'," ");
	title = title.replaceAll ('_'," ");
	title = title.replaceAll ('-'," ");
	return title;
}
function findMetaLocal (meta){
	if (meta !=={} && meta['lien'] !== undefined){
		if (meta['titre'] === undefined) meta['titre'] = titleFromUrl();
		// afficher les meta dans le header
		if (meta['lien'] === 'o'){
			head = head.replace ("<a href='$lien'>", "");
			head = head.replace ('</a>', "");
		}
		else meta['lien'] = meta['lien'].replaceAll (" ","");
		if (meta['laut'] === 'o'){
			head = head.replace ("<a href='$laut'>", "");
			head = head.replace ('</a></p>', '</p>');
		}
		else meta['laut'] = meta['laut'].replaceAll (" ","");
		if (meta['date'] !== undefined) head = head + '<p>date: $date</p>';
		for (const [key, value] of Object.entries (meta)) head = head.replace ('$'+ key, value);
		if (! head.includes ('$lien')) text = head + text;
		document.body.innerHTML = head + document.body.innerHTML;
}}
var meta = prepareText();
findMetaLocal (meta);
