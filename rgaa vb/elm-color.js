// dépend de ana-contrast.js, ana-common.js, ana-color.js

HTMLElement.prototype.checkColorsTree = function(){
	if (this.children.length ===0){
		this.checkColors();
		if (this.infos.includes ('doit être') || this.infos.includes ('insuffisant') || this.infos.includes ('pour les gros textes')){
			this.setAttribute ('infos', this.infos);
			this.addClassError();
	}}
	else for (var c=0; c< this.children.length; c++){ this.children[c].checkColorsTree(); }
}
Element.prototype.checkColorsTree = function(){ this.checkColors(); }
HTMLScriptElement.prototype.checkColorsTree = function(){ return ""; }
HTMLButtonElement.prototype.checkColorsTree = function(){
	this.checkColors();
	if (this.infos.includes ('doit être') || this.infos.includes ('insuffisant') || this.infos.includes ('pour les gros textes')){
		this.setAttribute ('infos', this.infos);
		this.addClassError();
}}
HTMLInputElement.prototype.checkColorsTree = function(){
	this.checkColors();
	if (this.infos.includes ('doit être') || this.infos.includes ('insuffisant') || this.infos.includes ('pour les gros textes')){
		this.setAttribute ('infos', this.infos);
		this.addClassError();
}}
document.body.checkColorsTree();
