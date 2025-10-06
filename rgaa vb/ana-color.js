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
	const bgColor = this.getVisibleBgColor (style);
	const contraste = compareTwoRgbString (style.color, bgColor);
	this.infos = this.infos + contraste.toString() + ':1. ';
	if (contraste <3) this.infos = this.infos +'insuffisant';
	else if (contraste < 4.5) this.infos = this.infos +'ok (AA) pour les gros textes';
	else if (contraste < 7) this.infos = this.infos +'ok (AA), ok (AAA) pour les gros textes';
	else this.infos = this.infos +'ok (AAA)';
}
Element.prototype.computeContrastBgSupport = function (bgColor){
	const styleParent = window.getComputedStyle (this.parentElement);
	const bgColorParent = this.parentElement.getVisibleBgColor (styleParent);
	this.infos = this.infos + '\ncontraste avec le fond du support: ';
	contraste = compareTwoRgbString (bgColor, bgColorParent);
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
	const bgColor = this.getVisibleBgColor (style);
	this.computeContrastBgSupport (bgColor);
	this.hasBgImage (style);
	while (this.infos.includes ('\n\n')) this.infos = this.infos.replaceAll ('\n\n', '\n');
	this.infos = this.infos.trim();
}
HTMLButtonElement.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	var hasColAndBg = this.hasColorAndBg (style);
	if (hasColAndBg){
		this.computeContrastBgText (style);
		const bgColor = this.getVisibleBgColor (style);
		this.computeContrastBgSupport (bgColor);
	}
	this.hasBgImage (style);
	while (this.infos.includes ('\n\n')) this.infos = this.infos.replaceAll ('\n\n', '\n');
	this.infos = this.infos.trim();
}
SVGElement.prototype.checkColors = function(){
	Element.prototype.checkColors.call (this);
	if (this.innerHTML.includes ('text')){
		const texts = this.getElementsByTagName ('text');
		for (text of texts) text.checkColors();
}}
function strExists (str){
	if (str === undefined || str === null || str === 'none' || str.strip() ==="") return false;
	else return true;
}
function strIsAcolor (str){
	if (strExists (str) && str !== 'transparent') return true;
	else return false;
}
SVGTextElement.prototype.checkColors = function(){
	const style = window.getComputedStyle (this);
	var styleParent = window.getComputedStyle (this.parentElement);
	var bgParent ="";
	if (this.parentElement.tagName === 'g') bgParent = styleParent.fill;
	else bgParent = styleParent.backgroundColor;
	if (this.parentElement.tagName === 'g' && (bgParent === 'rgba(0, 0, 0, 0)' || bgParent === 'none')){
		styleParent = window.getComputedStyle (this.ownerSVGElement);
		bgParent = styleParent.backgroundColor;
	}
	this.infos = this.infos + '\ncontraste du texte et de son fond: ';
	var contraste =0;
	const isBorder = strIsAcolor (style.stroke);
	if (strIsAcolor (style.fill) && (! isBorder || style.stroke ==='0')) contraste = compareTwoRgbString (style.fill, bgParent);
	else if (isBorder) contraste = compareTwoRgbString (style.stroke, bgParent);
/*
	this.infos = this.infos + contraste.toString() + ':1. ';
	if (contraste <3) this.infos = this.infos +'insuffisant';
	else if (contraste < 4.5) this.infos = this.infos +'ok (AA) pour les gros textes';
	else if (contraste < 7) this.infos = this.infos +'ok (AA), ok (AAA) pour les gros textes';
	else this.infos = this.infos +'ok (AAA)';
*/
}
Element.prototype.getVisibleBgColor = function (style){
	var bgColor = style.backgroundColor;
	return this._computeVisibleBgColor (bgColor);
}
HTMLBodyElement.prototype.getVisibleBgColor = function (style){ return style.backgroundColor; }
SVGElement.prototype.getVisibleBgColor = function (style){
	var bgColor = style.fill;
	return this._computeVisibleBgColor (bgColor);
}
SVGSVGElement.prototype.getVisibleBgColor = function (style){ return Element.prototype.getVisibleBgColor.call (this, style); }
Element.prototype._computeVisibleBgColor = function (bgColor){
	if (bgColor === 'none' || bgColor === 'transparent' || 'rgba' === bgColor.substring (0,4) && ', 0)' === bgColor.substring (12)){
		const styleParent = window.getComputedStyle (this.parentElement);
		bgColor = this.parentElement.getVisibleBgColor (styleParent);
	}
	else if ('rgba' === bgColor.substring (0,4) && ', 1)' !== bgColor.substring (12)){
		const bgColorArray = rgbFromString (bgColor);
		const styleParent = window.getComputedStyle (this.parentElement);
		var bgColorParentArray = rgbFromString (this.parentElement.getVisibleBgColor (styleParent));
		if (bgColorParentArray.length ===3) bgColorParentArray.push (1);
		const opacityTotal = bgColorArray[3] + bgColorParentArray[3];
		bgColorArray[3] /= opacityTotal;
		bgColorParentArray[3] /= opacityTotal;
		for (var c=0; c<3; c++){
			bgColorArray[c] *= bgColorArray[3];
			bgColorParentArray[c] *= bgColorParentArray[3];
			bgColorArray[c] += bgColorParentArray[c];
			bgColorArray[c] = Math.round (bgColorArray[c]);
		}
		bgColor = 'rgb(' + bgColorArray.join (", ") +')';
	}
	return bgColor;
}
