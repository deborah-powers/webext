// dépend de ana-contrast.js, ana-common.js

HTMLElement.prototype.hasColorAndBg = function (style){
//	const style = window.getComputedStyle (this);
	var hasColAndBg = true;
	if (style.backgroundColor === 'rgba(0, 0, 0, 0)' && style.color === 'rgba(0, 0, 0, 0)'){
		this.infos = this.infos + "\nle texte et le fond n'ont pas de couleurs précisées";
		hasColAndBg = false;
	}
	else if (style.backgroundColor === 'rgba(0, 0, 0, 0)'){
		this.infos = this.infos + '\nla couleur du fond doit être précisée.';
		hasColAndBg = false;
	}
	else if (style.color === 'rgba(0, 0, 0, 0)'){
		this.infos = this.infos + '\nla couleur du texte doit être précisée.';
		hasColAndBg = false;
	}
	return hasColAndBg;
}
Element.prototype.hasColorAndBg = function (style){ return true; }
Element.prototype.hasBgImage = function (style){
//	const style = window.getComputedStyle (this);
	if (style.backgroundImage === 'none') return;
	else if (style.backgroundColor === 'rgba(0, 0, 0, 0)')
		this.infos = this.infos + "\nl'image de fond doit être doublée par une couleur";
}
HTMLElement.prototype.computeContrastBgText = function (style){
	this.infos = this.infos + '\ncontraste du texte et de son fond: ';
	const contraste = compareTwoRgbString (style.color, style.backgroundColor);
	this.infos = this.infos + contraste.toString() + ':1. ';
	if (contraste <3) this.infos = this.infos +'insuffisant';
	else if (contraste < 4.5) this.infos = this.infos +'ok (AA) pour les gros textes';
	else if (contraste < 7) this.infos = this.infos +'ok (AA), ok (AAA) pour les gros textes';
	else this.infos = this.infos +'ok (AAA)';
}
Element.prototype.computeContrastBgSupport = function (style){
	const styleParent = window.getComputedStyle (this.parentElement);
	this.infos = this.infos + '\ncontraste avec le fond du support: ';
	contraste = compareTwoRgbString (style.backgroundColor, styleParent.backgroundColor);
	this.infos = this.infos + contraste.toString() + ':1. ';
	if (contraste <3) this.infos = this.infos + 'insuffisant';
	else this.infos = this.infos + 'ok';
}
HTMLElement.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	var hasColAndBg = this.hasColorAndBg (style);
	if (hasColAndBg) this.computeContrastBgText (style);
	this.hasBgImage (style);
	while (this.infos.includes ('\n\n')) this.infos = this.infos.replaceAll ('\n\n', '\n');
	this.infos = this.infos.trim();
}
Element.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	this.computeContrastBgSupport (style);
	this.hasBgImage (style);
	while (this.infos.includes ('\n\n')) this.infos = this.infos.replaceAll ('\n\n', '\n');
	this.infos = this.infos.trim();
}
HTMLButtonElement.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	var hasColAndBg = this.hasColorAndBg (style);
	if (hasColAndBg){
		this.computeContrastBgText (style);
		this.computeContrastBgSupport (style);
	}
	this.hasBgImage (style);
	while (this.infos.includes ('\n\n')) this.infos = this.infos.replaceAll ('\n\n', '\n');
	this.infos = this.infos.trim();
}