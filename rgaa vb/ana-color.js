// dépend de ana-contrast.js, ana-common.js

HTMLElement.prototype.hasColorAndBg = function (style){
	var infosCouleurs ="";
//	const style = window.getComputedStyle (this);
	if (style.backgroundColor === 'rgba(0, 0, 0, 0)' && style.color === 'rgba(0, 0, 0, 0)') infosCouleurs = "le texte et le fond n'ont pas de couleurs précisées";
	else if (style.backgroundColor === 'rgba(0, 0, 0, 0)') infosCouleurs = 'la couleur du fond doit être précisée.';
	else if (style.color === 'rgba(0, 0, 0, 0)') infosCouleurs = 'la couleur du texte doit être précisée.';
	else infosCouleurs = 'le texte et le fond ont des couleurs précisées';
	return infosCouleurs;
}
Element.prototype.hasColorAndBg = function (style){ return ""; }
Element.prototype.hasBgImage = function (style){
//	const style = window.getComputedStyle (this);
	if (style.backgroundImage === 'none') return "";
	var infosCouleurs ="";
	if (style.backgroundColor === 'rgba(0, 0, 0, 0)') infosCouleurs = "l'image de fond doit être doublée par une couleur";
	else infosCouleurs = "une couleur double l'image de fond";
	return infosCouleurs;
}
HTMLElement.prototype.computeContrastBgText = function (style){
	var infosCouleurs = 'contraste du texte et de son fond: ';
	const contraste = compareTwoRgbString (style.color, style.backgroundColor);
	infosCouleurs = infosCouleurs + contraste.toString() + ':1. ';
	if (contraste <3) infosCouleurs = infosCouleurs +'insuffisant';
	else if (contraste < 4.5) infosCouleurs = infosCouleurs +'ok (AA) pour les gros textes';
	else if (contraste < 7) infosCouleurs = infosCouleurs +'ok (AA), ok (AAA) pour les gros textes';
	else infosCouleurs = infosCouleurs +'ok (AAA)';
	return infosCouleurs;
}
Element.prototype.computeContrastBgSupport = function (style){
	const styleParent = window.getComputedStyle (this.parentElement);
	infosCouleurs = infosCouleurs + '\ncontraste avec le fond du support: ';
	contraste = compareTwoRgbString (style.backgroundColor, styleParent.backgroundColor);
	infosCouleurs = infosCouleurs + contraste.toString() + ':1. ';
	if (contraste <3) infosCouleurs = infosCouleurs +'insuffisant';
	else infosCouleurs = infosCouleurs +'ok';
	return infosCouleurs;
}
HTMLElement.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	var infosCouleurs = this.hasColorAndBg (style);
	infosCouleurs = infosCouleurs +'\n'+ this.hasBgImage (style);
	if (infosCouleurs.includes ('ont des couleurs pr')) infosCouleurs = infosCouleurs +'\n'+ this.computeContrastBgText (style);
	while (infosCouleurs.includes ('\n\n')) infosCouleurs = infosCouleurs.replaceAll ('\n\n', '\n');
	infosCouleurs = infosCouleurs.trim();
	if (infosCouleurs !=="") this.infos = infosCouleurs;
}
Element.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	var infosCouleurs = this.hasBgImage (style);
	infosCouleurs = infosCouleurs +'\n'+ this.computeContrastBgSupport (style);
	while (infosCouleurs.includes ('\n\n')) infosCouleurs = infosCouleurs.replaceAll ('\n\n', '\n');
	infosCouleurs = infosCouleurs.trim();
	if (infosCouleurs !=="") this.infos = infosCouleurs;
}
HTMLButtonElement.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	var infosCouleurs = this.hasColorAndBg (style);
	infosCouleurs = infosCouleurs +'\n'+ this.hasBgImage (style);
	if (infosCouleurs.includes ('ont des couleurs pr')){
		infosCouleurs = infosCouleurs +'\n'+ this.computeContrastBgText (style);
		infosCouleurs = infosCouleurs +'\n'+ this.computeContrastBgSupport (style);
	}
	while (infosCouleurs.includes ('\n\n')) infosCouleurs = infosCouleurs.replaceAll ('\n\n', '\n');
	infosCouleurs = infosCouleurs.trim();
	if (infosCouleurs !=="") this.infos = infosCouleurs;
}