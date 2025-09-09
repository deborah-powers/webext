// dépend de ana-contrast.js, ana-common.js, ana-color.js

Element.prototype.checkColorsTree = function(){
	this.checkColors();
	if (this.infos.includes ('doit être') || this.infos.includes ('insuffisant') || this.infos.includes ('pour les gros textes')){
		infos = infos +'\n\n\t'+ this.tagName +'\n'+ this.getXpath() +'\n'+ this.infos;
		this.infos = this.tagName +'\t'+ this.infos
		this.setAttribute ('infos', this.infos);
		this.addClassError();
}}
HTMLElement.prototype.checkColorsTree = function(){
	if (this.children.length ===0) Element.prototype.checkColorsTree.call (this);
	else for (var c=0; c< this.children.length; c++){ this.children[c].checkColorsTree(); }
}
document.body.checkColorsTree();
downloadAnalyse ('couleurs');

