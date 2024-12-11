HTMLOListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-empty');
	else if (this.children.length ===0) this.classList.add ('rgaa-empty');
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
HTMLUListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-empty');
	else if (this.children.length ===0) this.classList.add ('rgaa-empty');
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
HTMLLIElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-empty');
	else if (this.children.length ===0 && this.innerText ==="") this.classList.add ('rgaa-empty');
}
HTMLElement.prototype.isEmpty = function(){
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
SVGSVGElement.prototype.isEmpty = function(){ return; }
document.body.isEmpty();
