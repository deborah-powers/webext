HTMLOListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-error');
	else if (this.children.length ===0) this.classList.add ('rgaa-error');
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
HTMLUListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-error');
	else if (this.children.length ===0) this.classList.add ('rgaa-error');
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
HTMLDListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-error');
	else if (this.children.length ===0) this.classList.add ('rgaa-error');
	for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}
HTMLLIElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-error');
	else if (this.children.length ===0 && this.innerText ==="") this.classList.add ('rgaa-error');
}
HTMLElement.prototype.isEmpty = function(){
	if ([ 'dd', 'dt' ].includes (this.tagName) || this.getAttribute ('role') === 'listitem'){
		if (this.innerHTML ==="") this.classList.add ('rgaa-error');
		else if (this.children.length ===0 && this.innerText ==="") this.classList.add ('rgaa-error');
	}
	else if (this.getAttribute ('role') === 'list'){
		if (this.innerHTML ==="") this.classList.add ('rgaa-error');
		else if (this.children.length ===0) this.classList.add ('rgaa-error');
		for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
	}
	else{ for (var c=0; c< this.children.length; c++) this.children[c].isEmpty(); }
}
Element.prototype.isEmpty = function(){ return; }
HTMLElement.prototype.linkInList = function(){
}
document.body.isEmpty();
