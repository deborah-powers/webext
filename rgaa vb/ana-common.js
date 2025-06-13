// dépend de ana-name.js
var infos ="";

Element.prototype.addInfos = function(){
	infos = infos +'\n\n\t'+ this.tagName +'\t'+ this.getXpath() +'\n'+ this.compareNames();
}
// fonctions de base pour les string
const blankChars = '\n \t';
function exists (item){
	if (item === null || item === undefined) return false;
	else if (item.constructor === String) return item.exists();
	else if ((item.constructor === Array || item.constructor === HTMLCollection) && item.length ===0) return false;
	else return true;
}
String.prototype.exists = function(){
	var newString = this.replaceAll (blankChars[0], "");
	for (var c=1; c< blankChars.length; c++) newString = newString.replaceAll (blankChars[c], "");
	if (newString ==="") return false;
	else return true;
}
String.prototype.isEmpty = function(){
	if (! this.exists()) return true;
	else if ([ 'absent', 'vide' ].includes (this)) return true;
	else return false;
}
String.prototype.strip = function(){
	var d=0, e= this.length -1;
	while (d< this.length && blankChars.includes (this[d])) d+=1;
	while (e>0 && blankChars.includes (this[e])) e-=1;
	if (e<d) return "";
	var newString = this.substring (d, e+1);
	while (newString.includes ("  ")) newString = newString.replaceAll ("  ", " ");
	while (newString.includes ('\n\n')) newString = newString.replaceAll ('\n\n', '\n');
	return newString;
}
// créer le fichier d'analyse et l'envoyer à la popup
function handleResponse (response){ console.log ("le background à renvoyé le fichier d'audit", response.response); }
function handleError (error){ console.log ('une erreur est survenue lors de la réponse du background', error); }
function prepAnalyse (anaName){
	var header = 'url: '+ window.location.href + '\ntître: '+ document.title + "\ndate d'audit: "+ new Date().toLocaleString() + '\n\n===';
	infos = header + infos;
	var infosEncoded = encodeURIComponent (infos);
	const sending = browser.runtime.sendMessage ({ anaName: anaName, infos: infosEncoded });
	sending.then (handleResponse, handleError);
}
function downloadAnalyse_va (anaName){
	var header = 'url: '+ window.location.href + '\ntître: '+ document.title + "\ndate d'audit: "+ new Date().toLocaleString() + '\n\n===';
	infos = header + infos;
	var infosEncoded = encodeURIComponent (infos);
	const downloadLink = document.createElement ('a');
	downloadLink.style.color = 'maroon';
	downloadLink.style.backgroundColor = 'ivory';
	downloadLink.style.border = 'solid 4px deeppink';
	downloadLink.style.borderRadius = '1em';
	downloadLink.style.height = '4em';
	downloadLink.style.textAlign = 'center';
	downloadLink.style.position = 'fixed';
	downloadLink.style.right = '0';
	downloadLink.style.bottom = '50%';
	downloadLink.style['z-index'] = '10';
	downloadLink.innerHTML = "récupérer l'analyse";
	downloadLink.download = 'rgaa analyse '+ anaName + '.txt';
	downloadLink.href = "data:text/plain;charset=utf-8," + infosEncoded;
	document.body.prepend (downloadLink);
}