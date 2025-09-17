// dépend de ana-name.js, ana-common.css
var infos ="";	// rapport
Element.prototype.infos ="";	// détail de chaque élément

Element.prototype.addInfos = function(){
	if (exists (this.role)) this.infos = 'role: '+ this.role +'\n';
	this.infos = this.infos + this.compareNames();
	infos = infos +'\n\n\t'+ this.tagName +'\t'+ this.getXpath() +'\n'+ this.infos;
	this.setAttribute ('infos', this.infos);
}
SVGElement.prototype.addInfosOnHover = function(){
	if (this.className.animVal.includes ('rgaa-error') || this.className.animVal.includes ('rgaa-highlight')) return true;
	else return false;
}
Element.prototype.addInfosOnHover = function(){
	if (this.className.includes ('rgaa-error') || this.className.includes ('rgaa-highlight')) return true;
	else return false;
}
Element.prototype.addClass = function (className){ if (! this.className.includes (className)) this.classList.add (className); }
SVGElement.prototype.addClass = function (className){ if (! this.className.animVal.includes (className)) this.classList.add (className); }
Element.prototype.remClass = function (className){ if (this.className.includes (className)) this.classList.remove (className); }
Element.prototype.addClassError = function(){ this.addClass ('rgaa-error'); }
Element.prototype.addClassHighlight = function(){ this.addClass ('rgaa-highlight'); }

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
// s'il y a trop d'éléments pour tous les traiter, analyser certains au survol
var nbItemMax = 20;
HTMLCollection.prototype.setNbItemMax = function (typeElm){
	if (this.length >20){
		infos = infos + "\ntrop d'élements de type "+ typeElm +", "+ this.length.toString()
			+". je n'analyserai que les 20 premiers par souci de rapidité.";
		nbItemMax =20;
	}
	else nbItemMax = this.length;
}
Array.prototype.setNbItemMax = function (typeElm){
	if (this.length >20){
		infos = infos + "\ntrop d'élements de type "+ typeElm +", "+ this.length.toString()
			+". je n'analyserai que les 20 premiers par souci de rapidité.";
		nbItemMax =20;
	}
	else nbItemMax = this.length;
}
document.body.addEventListener ('mouseover', function (event){
	if ("" === event.target.infos){
		const toAnalyse = event.target.addInfosOnHover();
		if (toAnalyse){
			event.target.addInfos();
			addAnalyse();
}}});
// créer le fichier d'analyse. le css est dans ana-common.css
function addAnalyse(){
	const infosEncoded = encodeURIComponent (infos);
	const downloadLink = document.getElementById ('rgaa-download-rapport');
	downloadLink.href = 'data:text/plain;charset=utf-8,' + infosEncoded;
}
function downloadAnalyse (anaName){
	var header = 'url: '+ window.location.href + '\ntître: '+ document.title + "\ndate d'audit: "+ new Date().toLocaleString() + '\n\n===';
	infos = header + infos;
	const infosEncoded = encodeURIComponent (infos);
	const downloadLink = document.createElement ('a');
	downloadLink.id = 'rgaa-download-rapport';
	downloadLink.innerHTML = "télécharger l'analyse";
	downloadLink.href = 'data:text/plain;charset=utf-8,' + infosEncoded;
	downloadLink.download = 'rgaa analyse $anaName.txt'.replace ('$anaName', anaName);
//	downloadLink.setAttribute ('onmouseleave', "if (this.className.includes ('moved')) this.className =''; else this.className = 'moved'");
	downloadLink.addEventListener ('mouseleave', function (event){
		if (this.className.includes ('moved')) this.className ="";
		else this.className = 'moved';
	});
	document.body.appendChild (downloadLink);
}