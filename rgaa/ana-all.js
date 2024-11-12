HTMLElement.prototype.label ="";
HTMLElement.prototype.getAttribute = function (attrName){
	if (this.attributes[attrName] === undefined) return 'absent';
	else if (this.attributes[attrName].value ==="" || " \t".includes (this.attributes[attrName].value)) return 'vide';
	else return this.attributes[attrName].value;
}
HTMLElement.prototype.verifyAttr = function (attrName){
	return attrName +' = '+ this.getAttribute (attrName);
}
HTMLElement.prototype.isinLink = function (roleValue){
	if (this.tagName === 'BODY') return null;
	else if (this.tagName === 'A' || (this.attributes['role'] !== undefined && this.attributes['role'].value === 'link')) return 'link';
	else if (this.tagName === 'BUTTON' || (this.tagName === 'INPUT' || 'button submit reset'.includes (this.type))) return 'button';
	else return this.parentElement.isinLink();
}
HTMLElement.prototype._addLabel = function(){
	if (this.label !=="") this.label = this.label +'<br/>';
	this.label = this.label + this.verifyAttr ('title');
	this.label = this.label +'<br/>'+ this.verifyAttr ('role');
	this.label = this.label +'<br/>'+ this.verifyAttr ('aria-label');
	this.label = this.label +'<br/>'+ this.verifyAttr ('aria-labelledby');
	this.addEventListener ('mouseover', function (event){
		var modale = document.getElementById ('modale');
		modale.children[2].innerHTML = event.target.label;
		modale.style.display = 'block';
	});
}
HTMLElement.prototype._addLabel_va = function(){
	var label = document.createElement ('span');
	/*
	label.style.color = '#420';
	label.style.fontSize = '20px';
	label.style.fontWeight = 'normal';
	label.style.display = 'block';
	label.style.textAlign = 'left';
	*/
	label.className = 'label';
	label.innerHTML = this.verifyAttr ('title');
	label.innerHTML = label.innerHTML +'<br/>'+ this.verifyAttr ('role');
	label.innerHTML = label.innerHTML +'<br/>'+ this.verifyAttr ('aria-label');
	label.innerHTML = label.innerHTML +'<br/>'+ this.verifyAttr ('aria-labelledby');
	this.parentElement.insertBefore (label, this);
	this.addEventListener ('mouseover', function (event){
		if (event.target.previousElementSibling.style.display === 'block') event.target.previousElementSibling.style.display = 'none';
		else event.target.previousElementSibling.style.display = 'block';
	});
	return label;
}
HTMLElement.prototype._addLabel_vb = function(){
	var alt = this.getAttribute ('alt');
	label.innerHTML = 'alt = '+ alt;
	if ('vide absent'.includes (alt)){
		alt = this.getAttribute ('aria-labelledby');
		if ('vide absent'.includes (alt)){
			alt = this.getAttribute ('aria-label');
			if ('vide absent'.includes (alt)){
				alt = this.getAttribute ('title');
				if ('vide absent'.includes (alt)) label.innerHTML = label.innerHTML +'<br/>pas de titre alternatif'
				else label.innerHTML = label.innerHTML +'<br/>title = '+ alt;
			}
			else label.innerHTML = label.innerHTML +'<br/>aria-label = '+ alt;
		}
		else label.innerHTML = label.innerHTML +'<br/>aria-labelledby = '+ alt;
	}
}
HTMLElement.prototype.addLabel = function(){ this._addLabel(); }
HTMLElement.prototype.addBorder = function(){
	this.style.border = 'solid 4px deeppink';
	const container = this.isinLink();
	if (container === 'link') this.style.borderStyle = 'dashed';
	else if (container === 'button') this.style.borderStyle = 'dotted';
//	var label = this.addLabel();
}
HTMLElement.prototype.verifyRole = function (roleValue){
	if (this.attributes['role'] !== undefined && this.attributes['role'].value === roleValue) this.addBorder();
	else{
		for (var c=0; c< this.children.length; c++) this.children[c].verifyRole (roleValue);
	}
}
