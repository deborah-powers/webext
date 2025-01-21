Element.prototype.label ="";
Element.prototype.infos ="";
String.prototype.isEmpty = function(){
	if ('absent vide'.includes (this)) return true;
	else return false;
}
Element.prototype.getAttributeValue = function (attrName){
	if (this.attributes[attrName] === undefined) return 'absent';
	else if (this.attributes[attrName].value ==="" || " \t".includes (this.attributes[attrName].value)) return 'vide';
	else return this.attributes[attrName].value;
}
Element.prototype.verifyTitle = function(){
	var title = this.getAttributeValue ('title');
	if (! 'vide absent'.includes (title)) this.infos = this.infos + 'title: '+ title +'<br/>';
	title = this.getAttributeValue ('aria-label');
	if (! 'vide absent'.includes (title)) this.infos = this.infos + 'label: '+ title +'<br/>';
	title = this.getAttributeValue ('aria-labelledby');
	if (! 'vide absent'.includes (title)){
		this.infos = this.infos + 'labelledby: '+ title +'<br/>';
		var titleTag = document.getElementById (title);
		if (titleTag === undefined || titleTag === null) this.infos = this.infos + 'label perdu';
		else this.infos = this.infos + titleTag.innerText;
	}
}
Element.prototype.verifyRole = function(){ this.infos = this.infos + '<br/>role = '+ this.getAttributeValue ('role') +'<br/>'; }
Element.prototype.verifyAttribute = function (attrName){ this.infos = '<br/>' + attrName +' = '+ this.getAttributeValue (attrName); }
Element.prototype.isinLink = function (roleValue){
	if (this.tagName === 'BODY') return null;
	else if (this.tagName === 'A' || (this.attributes['role'] !== undefined && this.attributes['role'].value === 'link')) return 'link';
	else if (this.tagName === 'BUTTON' || (this.tagName === 'INPUT' || 'button submit reset'.includes (this.type))) return 'button';
	else return this.parentElement.isinLink();
}
Element.prototype.addLabelModal = function(){
	var labelModal = this.tagName;
	if (this.id !== undefined && this.id !=="") labelModal = labelModal +' #'+ this.id + this.label;
	if (this.className !== undefined && this.className !==""){
		var newClass = this.replaceMyClasses();
		if (newClass){
			newClass = newClass.replaceAll (" ",".");
			labelModal = labelModal +' .'+ newClass +' '+ this.label;
	}}
	return labelModal;
}
Element.prototype.addLabel = function(){
	if (this.infos.includes ('OBLIGATOIRE') || this.infos.includes ('ERREUR')) this.label = 'erreur';
	else this.label = 'ok';
	this.label = this.addLabelModal() +" "+ this.label;
}
Element.prototype.addInfos_vb = function(){
	var alt = this.getAttributeValue ('alt');
	label.innerHTML = 'alt = '+ alt;
	if ('vide absent'.includes (alt)){
		alt = this.getAttributeValue ('aria-labelledby');
		if ('vide absent'.includes (alt)){
			alt = this.getAttributeValue ('aria-label');
			if ('vide absent'.includes (alt)){
				alt = this.getAttributeValue ('title');
				if ('vide absent'.includes (alt)) label.innerHTML = label.innerHTML +'<br/>pas de titre alternatif'
				else label.innerHTML = label.innerHTML +'<br/>title = '+ alt;
			}
			else label.innerHTML = label.innerHTML +'<br/>aria-label = '+ alt;
		}
		else label.innerHTML = label.innerHTML +'<br/>aria-labelledby = '+ alt;
	}
}
Element.prototype.addInfos = function(){
	this.verifyRole();
	this.verifyTitle();
	// Element.prototype.addInfos.call (this); appeler dans une descendante
}
Element.prototype.addBorder = function(){
	// fonctionne avec ana-common.css
	this.classList.add ('rgaa-highlight');
	if (this.innerHTML ==="" && this.tagName !== 'IMG') this.infos = this.infos + '<br/>contenu vide OBLIGATOIRE';
}
Element.prototype.verifyRoleByValue = function (roleValue){
	if (this.attributes['role'] !== undefined && this.attributes['role'].value === roleValue) this.addBorder();
	else{ for (var c=0; c< this.children.length; c++) this.children[c].verifyRoleByValue (roleValue); }
}
function removeHighlight(){
	var toUnlight = document.getElementsByClassName ('rgaa-error');
	for (var h= toUnlight.length -1; h>=0; h--) toUnlight[h].classList.remove ('rgaa-error');
	toUnlight = document.getElementsByClassName ('rgaa-highlight');
	for (var h= toUnlight.length -1; h>=0; h--) toUnlight[h].classList.remove ('rgaa-highlight');
}
/* ------ récupérer les éléments par l'attribut ------ */

Element.prototype.AttributePresent = function (attrName){
	if (this.attributes[attrName] === undefined) return false;
	else if (this.attributes[attrName].value ==="" || " \t".includes (this.attributes[attrName].value)) return false;
	else return true;
}
HTMLElement.prototype.getByAttribute = function (attrName){
	var elements =[];
	if (this.AttributePresent (attrName)) elements.push (this);
	for (var c=0; c< this.children.length; c++){
		elementsChild = this.children[c].getByAttribute (attrName);
		for (var e=0; e< elementsChild.length; e++) elements.push (elementsChild[e]);
	}
	return elements;
}
SVGElement.prototype.getByAttribute = function (attrName){
	var elements =[];
	if (this.AttributePresent (attrName)) elements.push (this);
	return elements;
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
String.prototype.exists = function(){
	console.log ('exists');
	var text = this.replaceAll (" ","");
	text = text.replaceAll ("\n","");
	text = text.replaceAll ("\t","");
	if (text ==="") return false;
	else return true;
}