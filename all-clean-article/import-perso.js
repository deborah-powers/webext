/* importer des scripts js et des styles css externes afin de les utiliser comme des librairies dans mes extensions.
ce script repose sur la XMLHttpRequest (ajax)
et utilise mon site perso, https://deborah-powers.fr/library-xxx/

launchScript: le script s'execute puis se ferme tout seul. les éléments qu'il contient sont innaccessibles depuis mon extension.
callLibrary: utiliser mon script comme une librairie.
addCss: ajouter une feuille de style css. si je modifie un fichier local, les styles locaux sont utilisés. sinon, ce sont ceux de mon site web.

utiliser ce script:
les cors doivent être désactivés. ce script repose sur ajax.
ajouter ces lignes dans votre manifest
	"permissions": [ "...", "https://deborah-powers.fr/" ],
	"content_security_policy": "script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; object-src 'self';",
dans votre content_script:
	crutialData est modifié afin de s'adapter à ce dont l'utilisateur à besoin.
	const mylib = callLibrary ([ dependence1, dependence2 ])
	addCss ([ style1, style2 ])
*/
const urlDist = 'http://deborah-powers.fr';
const urlLoc = 'file:///C:/wamp64/www/site-dp';

var urlLib = urlDist + '/library-';
function setUrlLib(){
	if ('file' === window.location.href.substring (0,4)) urlLib = urlLoc + '/library-';
	else urlLib = urlDist + '/library-';
}
function openLibFile (filePath){
	const fullFile = urlLib + filePath;
	const xhttp = new XMLHttpRequest();
	xhttp.open ('GET', fullFile, false);
	xhttp.setRequestHeader ('Content-Type', 'text/js');
	xhttp.send();
	if (xhttp.status ==0 || xhttp.status ==200) return xhttp.responseText;
	else return "";
}
/* ------------ insérer mes styles ------------ */

function addCss (styleList){
	var styleText = "";
	if (urlLib.substring (0,4) === 'http'){
		const cssLine = 'css/$cssName.css';
		var styleText = "\n<style type='text/css'>";
		for (var cssName of styleList) styleText = styleText +'\n'+ openLibFile (cssLine.replace ('$cssName', cssName));
		styleText = styleText + '\n</style>';
	}
	else{
		const cssLine = "<link rel='stylesheet' type='text/css' href='" + urlLib + "css/$cssName.css'/>";
		for (var cssName of styleList) styleText = styleText + cssLine.replace ('$cssName', cssName);
	}
	document.head.innerHTML = document.head.innerHTML + styleText;
}

/* ------------ insérer mes scripts ------------ */

function launchScript (scriptName){
	/* rajouter un script externe facilement.
	il agit sur la page, mais ses éléments ne peuvent pas être appelés dans l'extension.
	*/
	const jsLine = "<script type='text/javascript' src='" + urlLib + 'js/' + scriptName + ".js'></script>";
	document.head.innerHTML = document.head.innerHTML + jsLine;
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
	/* importer un script externe en temps que librairie. crutialData est modifiable selon ce qui est nécéssaire. */
	var textJs ="";
	for (var s=0; s< scriptList.length; s++) textJs = textJs +'\n'+ openScript (scriptList[s]);
	sendToExtensions = sendToExtensions.replace ('$crutialData', crutialData);
	textJs = textJs + sendToExtensions;
	const library = eval (textJs);
	return library;
}
setUrlLib();
