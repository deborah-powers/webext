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
HTMLElement.prototype.inList = function(){
	if (this.tagName === 'LI') return true;
	else if (this.tagName === 'BODY') return false;
	else return this.parentElement.inList();
}
HTMLElement.prototype.computeContrast = function(){
	var infosLocales = '\ndans le texte';
	const style = window.getComputedStyle (this);
	// contraste avec le fond
	infosLocales = infosLocales + '\ncontraste avec le fond: ';
	var contraste = compareTwoRgbString (style.color, style.backgroundColor);
	infosLocales = infosLocales + contraste.toString() + ':1. ';
	if (contraste <3) infosLocales = infosLocales +'insuffisant';
	else if (contraste < 4.5) infosLocales = infosLocales +'ok (AA) pour les gros textes';
	else if (contraste < 7) infosLocales = infosLocales +'ok (AA), ok (AAA) pour les gros textes';
	else infosLocales = infosLocales +'ok (AAA)';
	// contraste avec le texte autour
	const styleParent = window.getComputedStyle (this.parentElement);
	infosLocales = infosLocales + '\ncontraste avec le texte: ';
	contraste = compareTwoRgbString (style.color, styleParent.color);
	infosLocales = infosLocales + contraste.toString() + ':1. ';
	if (contraste <3) infosLocales = infosLocales +'insuffisant';
	else infosLocales = infosLocales +'ok';
	return infosLocales;
}
HTMLAnchorElement.prototype.addInfos = function(){
	this.infos = this.compareNames();
	infos = infos +'\n\n\t'+ this.tagName +'\t'+ this.getXpath() +'\n'+ this.infos;
	var infosLocales =""
	if (! exists (this.href) || this.href === window.location.href) infosLocales = infosLocales + '\npas de destination';
	else if (this.href === '#' || this.href === window.location.href +'#') infosLocales = infosLocales + '\nlien redondant, #';
	if ('link' === this.role) infosLocales = infosLocales + '\nrôle redondant: '+ this.role;
	else if (exists (this.href) && exists (this.role) && ! [ 'button', 'checkbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'switch', 'tab', 'treeitem', 'doc-backlink', 'doc-biblioref', 'doc-glossref', 'doc-noteref' ].includes (this.role))
		infosLocales = infosLocales + '\nrôle interdit: '+ this.role;
	// les liens dans du texte
	if (this.inList()) infosLocales = infosLocales + '\ndans une liste';
	else infosLocales = infosLocales + this.computeContrast();
	infos = infos + infosLocales;
	this.infos = this.infos + infosLocales;
	this.setAttribute ('infos', this.infos);
}
Element.prototype.addInfos = function(){
	// ne concerne que les éléments possédant le rôle lien
	this.infos = this.compareNames();
	const href = this.getAttribute ('href');
	if (! href) this.infos = this.infos + "\npas d'attribut href";
	else if (! exists (href) || href === window.location.href) this.infos = this.infos + '\npas de destination';
	else if (href === '#' || href === window.location.href +'#') this.infos = this.infos + '\nlien redondant, #';
	// les liens dans du texte
	if (this.inList()) this.infos = this.infos + '\ndans une liste';
	else this.infos = this.infos + this.computeContrast();
	infos = infos +'\n\n\t'+ this.tagName +'\t'+ this.getXpath() +'\n'+ this.infos;
	this.setAttribute ('infos', this.infos);
}
var links = document.getElementsByTagName ('a');
links.setNbItemMax ('ancre');
for (var i=0; i< nbItemMax; i++) links[i].addInfos();
links = document.body.getAllByRole ('link');
links.setNbItemMax ('role link');
for (var i=0; i< nbItemMax; i++) links[i].addInfos();
downloadAnalyse ('lien');

