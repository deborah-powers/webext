// dépend de ana-name.js, ana-common.css
var infos ="";
Element.prototype.infos ="";

Element.prototype.addInfos = function(){
	this.infos = this.compareNames();
	infos = infos +'\n\n\t'+ this.tagName +'\t'+ this.getXpath() +'\n'+ this.infos;
	this.setAttribute ('infos', this.infos);
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
// fonctions utilitaires
Element.prototype.getAllByRole = function (myRole){
	var items =[];
	if (myRole === this.role) items.push (this);
	var itemsChild =[];
	for (var c=0; c< this.children.length; c++){
		itemsChild = this.children[c].getAllByRole (myRole);
		for (var d=0; d< itemsChild.length; d++) items.push (itemsChild[d]);
	}
	return items;
}
// limiter le nombre d'items traités par souci de rapidité
var nbItemMax = 50;
HTMLCollection.prototype.setNbItemMax = function (typeElm){
	if (this.length >50){
		infos = infos + "\ntrop d'élements de type "+ typeElm +", "+ this.length.toString()
			+". je n'analyserai que les 50 premiers par souci de rapidité.";
		nbItemMax =50;
	}
	else nbItemMax = this.length;
}
Array.prototype.setNbItemMax = function (typeElm){
	if (this.length >50){
		infos = infos + "\ntrop d'élements de type "+ typeElm +", "+ this.length.toString()
			+". je n'analyserai que les 50 premiers par souci de rapidité.";
		nbItemMax =50;
	}
	else nbItemMax = this.length;
}
// créer le fichier d'analyse. le css est dans ana-common.css
function downloadAnalyse (anaName){
	var header = 'url: '+ window.location.href + '\ntître: '+ document.title + "\ndate d'audit: "+ new Date().toLocaleString() + '\n\n===';
	infos = header + infos;
	const infosEncoded = encodeURIComponent (infos);
	var downloadLink = document.createElement ('a');
	downloadLink.id = 'rgaa-download-rapport';
	downloadLink.innerHTML = "télécharger l'analyse";
	downloadLink.href = 'data:text/plain;charset=utf-8,' + infosEncoded;
	downloadLink.download = 'rgaa analyse $anaName.txt'.replace ('$anaName', anaName);
	downloadLink.setAttribute ('onmouseleave', "if (this.className.includes ('moved')) this.className =''; else this.className = 'moved'");
	document.body.appendChild (downloadLink);
}