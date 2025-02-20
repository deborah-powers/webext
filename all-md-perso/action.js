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
	<script type='text/javascript' src='file:///C:/wamp64/www/site-dp/library-js/textFct.js'></script>
	<script type='text/javascript' src='file:///C:/wamp64/www/site-dp/library-js/htmlFct.js'></script>
	-->
`;
// récupérer les metadonnées de mes articles
var header = "<h1><a href='$lien'>$titre</a></h1><p>par <a href='$laut'>$auteur</a></p><p>à propos de $sujet</p>";

function findMetaLocal (meta){
	if (meta !=={} && meta['lien'] !== undefined){
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
function addScript (scriptName){
	const myScriptTag = document.createElement ('script');
	myScriptTag.src = 'file:///C:/wamp64/www/site-dp/library-js/' + scriptName + '.js';
	myScriptTag.type = 'text/javascript';
	document.head.appendChild (myScriptTag);
}
function addScript_vb (scriptName){
	const scriptFile = 'file:///C:/wamp64/www/site-dp/library-js/' + scriptName + '.js';
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if (this.readyState ===5){
			var res = eval ('`'+ this.responseText +'`');
			console.log (document);
		}
		else if (this.readyState ===4){
			const myScriptTag = document.createElement ('script');
			myScriptTag.innerHTML = this.responseText;
			myScriptTag.type = 'text/javascript';
			document.head.appendChild (myScriptTag);
	}};
	xhttp.open ('GET', scriptFile, true);
	xhttp.send();
}
document.head.innerHTML = headPage;
addScript ('textFct');
addScript ('htmlFct');
