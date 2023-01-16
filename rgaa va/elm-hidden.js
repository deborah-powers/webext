Element.prototype.isHidden = function(){
	const style = window.getComputedStyle (this);
	if (style.display === 'none' || style.visibility === 'hidden' || style.fontSize === '0px') this.classList.add ('rgaa-hidden');
}
HTMLScriptElement.isHidden = function(){ return; }
HTMLElement.prototype.isHidden = function(){
	Element.prototype.isHidden.call (this);
	for (var c=0; c< this.children.length; c++) this.children[c].isHidden();
}
document.body.isHidden();
