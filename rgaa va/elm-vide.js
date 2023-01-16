HTMLImageElement.prototype.isEmpty = function(){ if (this.src ==="") this.className.add ('rgaa-highlight'); }
HTMLAreaElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.className.add ('rgaa-highlight'); }
SVGSVGElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.className.add ('rgaa-highlight'); }
HTMLCanvasElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.className.add ('rgaa-highlight'); }
HTMLObjectElement.prototype.isEmpty = function(){ if (this.innerHTML ==="" && this.src ==="") this.className.add ('rgaa-highlight'); }
HTMLInputElement.prototype.isEmpty = function(){ if (this.type === 'image' && this.src ==="") this.className.add ('rgaa-highlight'); }
HTMLOListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-highlight');
	else if (this.children.length ===0) this.classList.add ('rgaa-highlight');
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
HTMLUListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-highlight');
	else if (this.children.length ===0) this.classList.add ('rgaa-highlight');
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
HTMLLIElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-highlight');
	else if (this.children.length ===0 && this.innerText ==="") this.classList.add ('rgaa-highlight');
}
HTMLElement.prototype.isEmpty = function(){
	if (! 'BR HR'.includes (this.tagName)){
		if (this.innerHTML ===""){
			this.classList.add ('rgaa-highlight');
		//	this.innerHTML = this.tagName + ' vide';
		}
		else if (this.innerText ==="" && ! this.innerHTML.includes ('<img') && ! this.innerHTML.includes ('<svg') && ! this.innerHTML.includes ('<canvas')){
			this.classList.add ('rgaa-highlight');
		//	this.innerHTML = this.tagName + ' invisible '+ this.innerHTML;
		}
		else if ([ 'DIV', 'SECTION', 'ARTICLE', 'NAV', 'DL' ].includes (this.tagName) && this.children.length ===0){
			this.classList.add ('rgaa-highlight');
		//	this.innerHTML = this.tagName + ' paragraphe: '+ this.innerHTML;
		}
		for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}}
document.body.isEmpty();
