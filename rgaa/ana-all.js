HTMLElement.prototype.verifyAttr = function (attrName){
	var message = attrName +' = ';
	if (this.attributes[attrName] === undefined) message = message + 'nul';
	else if (this.attributes[attrName].value ==="" || " \t".includes (this.attributes[attrName].value)) message = message + 'vide';
	else message = message + this.attributes[attrName].value;
	return message;
}
HTMLElement.prototype.verifyRole = function (roleValue){
	if (this.attributes['role'] !== undefined && this.attributes['role'].value === roleValue){
		this.style.border = 'solid 4px deeppink';
	}
	else{
		for (var c=0; c< this.children.length; c++) this.children[c].verifyRole;
	}
}
HTMLElement.prototype.isinLink = function (roleValue){
	if (this.tagName === 'BODY') return null;
	else if (this.tagName === 'A' || (this.attributes['role'] !== undefined && this.attributes['role'].value === 'link')) return 'link';
	else if (this.tagName === 'BUTTON' || (this.tagName === 'INPUT' || 'button submit reset'.includes (this.type))) return 'button';
	else return this.parentElement.isinLink();
}
HTMLElement.prototype._addLabel = function(){
	// identifier l'objet
	this.style.border = 'solid 4px deeppink';
	const container = this.isinLink();
	if (container === 'link') this.style.borderStyle = 'dashed';
	else if (container === 'button') this.style.borderStyle = 'dotted';
	// ajouter le message
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
	/*
	this.addEventListener ('mouseover', function (event){
		console.log (event.target.previousElementSibling);
		event.target.previousElementSibling.style.display = 'block';
		event.preventDefault();
	}, false);
	this.addEventListener ('mouseleave', function (event){
		console.log (event.target.previousElementSibling);
		event.target.previousElementSibling.style.display = 'none';
		event.preventDefault();
	}, false);
	*/
	return label;
}
HTMLElement.prototype.addLabel = function(){ return this._addLabel(); }