/*
console.dir ('window', window);
console.dir ('browser', browser);
console.dir ('navigator', navigator);
*/
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
	for (var c=0; c< this.childNodes.length; c++){ if (this.childNodes[c].tagName === undefined){
		const emptyChar = '\t\n ';
		var textTmp = this.childNodes[c].textContent.replaceAll (emptyChar[0],"");
		for (var c=1; c< emptyChar.length; c++) textTmp = textTmp.replaceAll (emptyChar[c], "");
		if (textTmp !==""){
			console.log (this.tagName, c, textTmp);
			textChild = true;
		}
	}}
	return textChild;
}
HTMLElement.prototype.colorTransparent = function(){
	if (this.innerText !==""){
	if (this.hasTextChild()){
			const style = window.getComputedStyle (this);
			if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)')) this.classList.add ('rgaa-nobg');
			if (style.color.includes ('rgba') && style.color.includes (' 0)')) this.classList.add ('rgaa-notx');
			else if (style.color.includes ('85, 107, 47')) this.classList.add ('rgaa-notx');	// cf ana-color.css. la balise a déjà la classe rgaa-nobg
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
