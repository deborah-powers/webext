// les couleurs systèmes. dans les paramètres de mon navigateur, fixer des couleurs incongrues
var colorText = 'rgb(0, 0, 0)';
var colorBg = 'rgba(0, 0, 0, 0)';
var colorLink = 'rgb(0, 0, 0)';
var colorLinkVisitated = 'rgb(0, 0, 0)';
// uniquement pour firefox
if (navigator.userAgent.substring (0,8) === 'Mozilla/'){
	const systemStyle = window.getDefaultComputedStyle (document.body);
	colorText = systemStyle.color;
	colorBg = systemStyle.backgroundColor;
	if (document.body.innerHTML.includes ('</a>')){
		const link = document.getElementsByTagName ('a')[0];
		const systemStyleLink = window.getDefaultComputedStyle (link);
		colorLink = systemStyleLink.color;
}}
Element.prototype.transparentAncestor = function(){
	var transparentAncestor = false;
	if (this.parentElement.className.includes ('rgaa-nobg')) transparentAncestor = true;
	else if (this.tagName !== 'BODY') {
		const style = window.getComputedStyle (this.parentElement);
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)')) transparentAncestor = true;
	}
	return transparentAncestor;
}
Element.prototype.hasTextChild = function(){
	if (this.innerText ==="") return false;
	var textChild = false;
	for (var c=0; c< this.childNodes.length; c++) if (this.childNodes[c].tagName === undefined){
		const emptyChar = '\t\n ';
		var textTmp = this.childNodes[c].textContent.replaceAll (emptyChar[0],"");
		for (var e=1; e< emptyChar.length; e++) textTmp = textTmp.replaceAll (emptyChar[e], "");
		textChild = textTmp !=="";
	}
	return textChild;
}
HTMLElement.prototype.colorTransparent = function(){
	if (this.innerText !==""){
		if (this.hasTextChild()){
			const style = window.getComputedStyle (this);
/*			if (style.color === colorText && style.backgroundColor === colorBg){
				this.classList.add ('rgaa-notx');
				this.classList.add ('rgaa-nobg');
			}*/
			if (style.color === colorText && style.backgroundColor !== colorBg) this.classList.add ('rgaa-notx');
			else if (style.color !== colorText && style.backgroundColor === colorBg) this.classList.add ('rgaa-nobg');
		}
		for (var c=0; c< this.children.length; c++) this.children[c].colorTransparent();
}}
HTMLScriptElement.prototype.colorTransparent = function(){ return; }
SVGSVGElement.prototype.colorTransparent = function(){ return; }

HTMLElement.prototype.bgImageDoublee = function(){
	const style = window.getComputedStyle (this);
	if (style.backgroundImage !== 'none'){
	//	this.classList.add ('rgaa-bgimg');
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)'))
			this.classList.add ('rgaa-nobgcolor');
	}
	else{ for (var c=0; c< this.children.length; c++) this.children[c].bgImageDoublee(); }
}
HTMLScriptElement.prototype.bgImageDoublee = function(){ return; }
SVGSVGElement.prototype.bgImageDoublee = function(){ return; }

document.body.bgImageDoublee();
document.body.colorTransparent();
/*
128,0,64
0,255,255
*/