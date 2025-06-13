/* dépend de encart.js, de ana-common.js et de ana-name.js
prendre en compte la valeur des pseudo-classes :before et :after
*/

HTMLAnchorElement.prototype.addInfos = function(){
	this.infos = this.compareNames();
	infos = infos +'\n\n\t'+ this.tagName +'\t'+ this.getXpath() +'\n'+ this.infos;
	var infosLocales =""
	if (! exists (this.href) || this.href === window.location.href) infosLocales = infosLocales + '\npas de destination';
	else if (this.href === '#' || this.href === window.location.href +'#') infosLocales = infosLocales + '\nlien redondant, #';
	if ('link' === this.role) infosLocales = infosLocales + '\nrôle redondant: '+ this.role;
	else if (exists (this.href) && exists (this.role) && ! [ 'button', 'checkbox', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'radio', 'switch', 'tab', 'treeitem', 'doc-backlink', 'doc-biblioref', 'doc-glossref', 'doc-noteref' ].includes (this.role))
		infosLocales = infosLocales + '\nrôle interdit: '+ this.role;
	infos = infos + infosLocales;
	this.infos = this.infos + infosLocales;
	this.setAttribute ('infos', this.infos);
}
Element.prototype.addInfos = function(){
	// ne concerne que les éléments possédant le rôle lien
	this.infos = this.compareNames();
	const href = this.getAttribute ('href');
	if (! href) this.infos = this.infos + "\npas d'attribut href";
	if (! exists (href) || href === window.location.href) this.infos = this.infos + '\npas de destination';
	else if (href === '#' || href === window.location.href +'#') this.infos = this.infos + '\nlien redondant, #';
	infos = infos +'\n\n\t'+ this.tagName +'\t'+ this.getXpath() +'\n'+ this.infos;
	this.setAttribute ('infos', this.infos);
}
var links = document.getElementsByTagName ('a');
for (var i=0; i< links.length; i++) links[i].addInfos();
links = document.body.getAllByRole ('link');
for (var i=0; i< links.length; i++) links[i].addInfos();
prepAnalyse ('lien');
