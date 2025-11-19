HTMLElement.prototype.bgImageDoublee = function(){
	const style = window.getComputedStyle (this);
	if (style.backgroundImage !== 'none'){
		Element.prototype.addInfos.call (this);
		this.classList.add ('rgaa-bgimg');
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)')) this.classList.add ('rgaa-bgnocolor');
	}
	else{ for (var child of this.children) child.bgImageDoublee(); }
}
Element.prototype.bgImageDoublee = function(){ return; }
HTMLScriptElement.prototype.bgImageDoublee = function(){ return; }
SVGSVGElement.prototype.bgImageDoublee = function(){ return; }
document.body.bgImageDoublee();
