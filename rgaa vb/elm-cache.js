Element.prototype.isHidden = function(){
	if (this.className.includes ('sr-only') || this.className.includes ('sronly')) return true;
	else if (exists (this.getAttribute ('hidden')) || exists (this.getAttribute ('aria-hidden'))) return true;
	const style = window.getComputedStyle (this);
	if (style.display === 'none' || style.visibility === 'hidden' || style.fontSize === '0px'){
		this.classList.add ('rgaa-hidden');
		return true;
	}
	else return false;
}
HTMLElement.prototype.isHidden = function(){
	const hidden = Element.prototype.isHidden.call (this);
	if (! hidden) for (var child of this.children){ child.isHidden(); }
}
HTMLScriptElement.prototype.isHidden = function(){ return; }
HTMLDialogElement.prototype.isHidden = function(){ return; }
HTMLDialogElement.prototype.isHidden_va = function(){ for (var child of this.children) child.isHidden(); }
SVGElement.prototype.isHidden = function(){
	const style = window.getComputedStyle (this);
	if (style.display === 'none' || style.visibility === 'hidden' || style.fontSize === '0px') this.classList.add ('rgaa-hidden');
}
document.body.isHidden();