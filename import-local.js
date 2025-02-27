/* importer des scripts js externes afin de les utiliser comme des librairies dans mes extensions.
launchScript: le script s'execute puis se ferme tout seul. les éléments qu'il contient sont innaccessibles depuis mon extension.
callLibrary: utiliser mon script comme une librairie.
- les cors doivent être désactivés. cette fonction ouvre un fichier js.
- mes scripts sont sur mon site https://deborah-powers.fr/
- ajouter cette ligne dans le manifest
	"permissions": [ "...", "https://deborah-powers.fr/" ],
	avant: "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
- crutialData est modifié afin de s'adapter à ce dont l'utilisateur à besoin.
const mylib = callLibrary ([ dependence1, dependence2 ])

attention. pour le momment, les fonctions utilisent ma localisation pour les scripts js.
	https://deborah-powers.fr/library-js/
*/
function openLibFile (filePath){
	const fullFile = 'https://deborah-powers.fr/library-' + filePath;
	const xhttp = new XMLHttpRequest();
	xhttp.open ('GET', fullFile, false);
	xhttp.send();
	if (xhttp.status ==0 || xhttp.status ==200) return xhttp.responseText;
	else return "";
}
/* ------------ insérer mes styles ------------ */

function addCss (cssName){
	const cssLine = "<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/" + cssName + ".css'/>";
	document.head.innerHTML = document.head.innerHTML + cssLine;
}
function openStyle (styleName){
	const styleFile = 'css/' + styleName + '.css';
	return openLibFile (styleFile);
}
function addStyle (styleList){
	var textCss = "\n<style type='text/css'>";
	for (var s=0; s< scriptList.length; s++) textCss = textCss +'\n'+ openStyle (scriptList[s]);
	textCss = textCss +'\n</style>';
	document.head.innerHTML = document.head.innerHTML + textCss;
}
/* ------------ insérer mes scripts ------------ */

function launchScript (scriptName){
	/* rajouter un script externe facilement.
	il agit sur la page, mais ses éléments ne peuvent pas être appelés dans l'extension.
	*/
	const jsLine = "<script type='text/javascript' src='file:///C:/wamp64/www/site-dp/library-js/" + scriptName + ".js'></script>";
	document.head.innerHTML = document.head.innerHTML + jsLine;
	/*
	const myScriptTag = document.createElement ('script');
	myScriptTag.src = 'file:///C:/wamp64/www/site-dp/library-js/' + scriptName + '.js';
	myScriptTag.type = 'text/javascript';
	document.head.appendChild (myScriptTag);
	*/
}
function openScript (scriptName){
	const scriptFile = 'js/' + scriptName + '.js';
	return openLibFile (scriptFile);
}
var crutialData = `
	exists: exists,
	prepareText: prepareText,
	findTitle: function (url){ return url.findTitleFromUrl(); }
`;
var sendToExtensions =`
function sendToExtensions(){
	return { $crutialData };
}
sendToExtensions();`;
function callLibrary (scriptList){
	/* importer un script externe en temps que librairie. sendToExtensions est modifiable selon ce qui est nécéssaire. */
	var textJs ="";
	for (var s=0; s< scriptList.length; s++) textJs = textJs +'\n'+ openScript (scriptList[s]);
	sendToExtensions = sendToExtensions.replace ('$crutialData', crutialData);
	textJs = textJs + sendToExtensions;
	const library = eval (textJs);
	return library;
}