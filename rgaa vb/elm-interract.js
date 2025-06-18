/* dépend de encart.js, de ana-common.js et de ana-name.js
prendre en compte la valeur des pseudo-classes :before et :after
*/
Element.prototype.addInfosOnHover = function(){
	if ('link' === this.role) return true;
	else return false;
}
HTMLAnchorElement.prototype.addInfosOnHover = function(){
	if (this.id === 'rgaa-download-rapport') return false;
	else return true;
}
HTMLInputElement.prototype.addInfosOnHover = function(){ return true; }
HTMLSelectElement.prototype.addInfosOnHover = function(){ return true; }
HTMLTextAreaElement.prototype.addInfosOnHover = function(){ return true; }

var interractives = document.getElementsByTagName ('a');
interractives.setNbItemMax ('ancre');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();
interractives = document.body.getAllByRole ('link');
interractives.setNbItemMax ('role lien');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();
var interractives = document.getElementsByTagName ('button');
interractives.setNbItemMax ('bouton');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();
interractives = document.body.getAllByRole ('button');
interractives.setNbItemMax ('role bouton');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();
var interractives = document.getElementsByTagName ('input');
interractives.setNbItemMax ('input');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();
var interractives = document.getElementsByTagName ('select');
interractives.setNbItemMax ('select');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();
var interractives = document.getElementsByTagName ('textarea');
interractives.setNbItemMax ('textarea');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();
downloadAnalyse ('éléments interractifs');

