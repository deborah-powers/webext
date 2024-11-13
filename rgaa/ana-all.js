Element.prototype.label ="";
Element.prototype.infos ="";
Element.prototype.getAttribute = function (attrName){
	if (this.attributes[attrName] === undefined) return 'absent';
	else if (this.attributes[attrName].value ==="" || " \t".includes (this.attributes[attrName].value)) return 'vide';
	else return this.attributes[attrName].value;
}
Element.prototype.verifyAttributeTitle = function(){ this.infos = this.infos + '<br/>title = '+ this.getAttribute ('title'); }
Element.prototype.verifyAttributeRole = function(){ this.infos = this.infos + '<br/>role = '+ this.getAttribute ('role'); }
Element.prototype.verifyAttributeAriaLabel = function(){
	this.infos = this.infos + '<br/>aria-label = '+ this.getAttribute ('aria-label');
	this.infos = this.infos + '<br/>aria-labelledby = '+ this.getAttribute ('aria-labelledby');
}
Element.prototype.verifyAttribute = function (attrName){ this.infos = '<br/>' + attrName +' = '+ this.getAttribute (attrName); }
Element.prototype.isinLink = function (roleValue){
	if (this.tagName === 'BODY') return null;
	else if (this.tagName === 'A' || (this.attributes['role'] !== undefined && this.attributes['role'].value === 'link')) return 'link';
	else if (this.tagName === 'BUTTON' || (this.tagName === 'INPUT' || 'button submit reset'.includes (this.type))) return 'button';
	else return this.parentElement.isinLink();
}
Element.prototype.addLabel = function(){
	if (this.infos.includes ('OBLIGATOIRE')) this.label = 'erreur';
	else this.label = 'ok';
}
Element.prototype._addInfos = function(){
	this.verifyAttributeTitle();
	this.verifyAttributeRole();
	this.verifyAttributeAriaLabel();
}
Element.prototype._addInfos_vb = function(){
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
Element.prototype.addInfos = function(){ this._addInfos(); }
Element.prototype.addBorder = function(){
	this.style.border = 'solid 4px deeppink';
	const container = this.isinLink();
	if (container === 'link') this.style.borderStyle = 'dashed';
	else if (container === 'button') this.style.borderStyle = 'dotted';
}
Element.prototype.addAll = function(){
	this.addBorder();
	this.addInfos();
	this.addLabel();
	this.addEventListener ('mouseover', function (event){
		var modale = document.getElementById ('modale');
		modale.children[0].innerHTML = event.target.tagName;
		if (event.target.id !== undefined && event.target.id !=="") modale.children[0].innerHTML = modale.children[0].innerHTML +' #'+ event.target.id;
		else if (event.target.className !== undefined && event.target.className !=="")
			modale.children[0].innerHTML = modale.children[0].innerHTML +' .'+ event.target.className.replaceAll (" ",".");
		modale.children[0].innerHTML = modale.children[0].innerHTML +" "+ event.target.label;
		modale.children[2].innerHTML = event.target.infos;
		modale.style.display = 'grid';
	});
}
Element.prototype.verifyRole = function (roleValue){
	if (this.attributes['role'] !== undefined && this.attributes['role'].value === roleValue) this.addBorder();
	else{ for (var c=0; c< this.children.length; c++) this.children[c].verifyRole (roleValue); }
}
/* ------ pour le svg ------ */

String.prototype.count = function (phrase){
	if (! this.includes (phrase)) return 0;
	var pos =0, nb=0;
	var text = this;
	while (text.includes (phrase)){
		pos =1+ text.indexOf (phrase);
		text = text.substring (pos);
		nb +=1;
	}
	return nb;
}
