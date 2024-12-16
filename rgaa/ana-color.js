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
HTMLElement.prototype.colorTransparent = function(){
	const style = window.getComputedStyle (this);
	if (! this.parentElement.className.includes ('rgaa-nobg') && style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)') && this.innerText !=="")
		this.classList.add ('rgaa-nobg');
	if (! this.parentElement.className.includes ('rgaa-notx') && style.color.includes ('rgba') && style.color.includes (' 0)') && this.innerText !=="")
		this.classList.add ('rgaa-notx');
	for (var c=0; c< this.children.length; c++) this.children[c].colorTransparent();
}
SVGSVGElement.prototype.colorTransparent = function(){
	const style = window.getComputedStyle (this);
	if (! this.parentElement.className.includes ('rgaa-nobg') && style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)'))
		this.classList.add ('rgaa-nobg');
	if (! this.parentElement.className.includes ('rgaa-notx') && style.color.includes ('rgba') && style.color.includes (' 0)'))
		this.classList.add ('rgaa-notx');
}
document.body.colorTransparent();