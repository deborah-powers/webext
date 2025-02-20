// importer mes scipts et styles persos
var headPage =`
	<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<base target='_blank'>
	<link rel='icon' type='image/svg+xml' href='file:///C:/wamp64/www/site-dp/data/nounours-perso.svg'/>
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/structure.css'/>
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/perso.css' media='screen'/>
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/shapes.css'/>
	<!--
	<script type='text/javascript' src='file:///C:/wamp64/www/site-dp/library-js/$textFct.js'></script>
	<script type='text/javascript' src='file:///C:/wamp64/www/site-dp/library-js/$htmlFct.js'></script>
	-->
`;
// récupérer les metadonnées de mes articles
var header = "<h1><a href='$lien'>$titre</a></h1><p>par <a href='$laut'>$auteur</a></p><p>à propos de $sujet</p>";

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
			header = header.replace ("<a href='$lien'>", "");
			header = header.replace ('</a>', "");
		}
		else meta['lien'] = meta['lien'].replaceAll (" ","");
		if (meta['laut'] === 'o'){
			header = header.replace ("<a href='$laut'>", "");
			header = header.replace ('</a></p>', '</p>');
		}
		else meta['laut'] = meta['laut'].replaceAll (" ","");
		if (meta['date'] !== undefined) header = header + '<p>date: $date</p>';
		header = header.printMetadata (meta);
		if (! header.includes ('$')) text = header + text;
		headPage = headPage.replace ('<title></title>', '<title>' + meta['titre'] + '</title>');
		document.body.innerHTML = header + document.body.innerHTML;
}}
document.head.innerHTML = headPage;
/*
var myScriptTag = document.createElement ('script');
myScriptTag.src = 'file:///C:/wamp64/www/site-dp/library-js/textFct.js';
myScriptTag.type = 'text/javascript';
document.head.appendChild (myScriptTag);
myScriptTag = document.createElement ('script');
myScriptTag.src = 'file:///C:/wamp64/www/site-dp/library-js/htmlFct.js';
myScriptTag.type = 'text/javascript';
document.head.appendChild (myScriptTag);
console.log ('insertMyScript b');
setTimeout (function(){
	console.log ('insertMyScript c');
	console.log (document.head.innerHTML);
	dodo();
	var meta = prepareText();
	console.log ('launchAction', meta);
	findMetaLocal (meta);
}, 1000);
*/
