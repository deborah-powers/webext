const blankChars = '\n \t';
const myClasses =[ 'rgaa-highlight', 'rgaa-error', 'rgaa-nobg', 'rgaa-notx', 'rgaa-bgimg', 'rgaa-nobgcolor', 'rgaa-double', 'rgaa-complex', 'rgaa-event' ];

Element.prototype.getByRole = function (myRole){
	if (myRole === this.role) return this;
	else if (this.children.length ===0) return null;
	var item = null;
	var c=0;
	while (item === null && c< this.children.length){
		item = this.children[c].getByRole (myRole);
		c+=1;
	}
	return item;
}
Element.prototype.getAllByRole = function (myRole){
	var items =[];
	if (myRole === this.role) items.push (this);
	var itemsChild =[];
	for (var c=0; c< this.children.length; c++){
		itemsChild = this.children[c].getAllByRole (myRole);
		for (var d=0; d< itemsChild.length; d++) items.push (itemsChild[d]);
	}
	return items;
}
Element.prototype.label ="";
Element.prototype.infos ="";
String.prototype.exists = function(){
	var newString = this.replaceAll (blankChars[0], "");
	for (var c=1; c< blankChars.length; c++) newString = newString.replaceAll (blankChars[c], "");
	if (newString ==="") return false;
	else return true;
}
function exists (item){
	if (item === null || item === undefined) return false;
	else if (item.constructor === String) return item.exists();
	else if ((item.constructor === Array || item.constructor === HTMLCollection) && item.length ===0) return false;
	else return true;
}
String.prototype.isEmpty = function(){
	if (! this.exists()) return true;
	else if ([ 'absent', 'vide' ].includes (this)) return true;
	else return false;
}
String.prototype.strip = function(){
	var d=0, e= this.length -1;
	while (d< this.length && blankChars.includes (this[d])) d+=1;
	while (e>0 && blankChars.includes (this[e])) e-=1;
	if (e<d) return "";
	var newString = this.substring (d, e+1);
	while (newString.includes ("  ")) newString = newString.replaceAll ("  ", " ");
	while (newString.includes ('\n\n')) newString = newString.replaceAll ('\n\n', '\n');
	return newString;
}
Element.prototype.getAttributeValue = function (attrName){
	if (this.attributes[attrName] === undefined) return 'absent';
	else if (this.attributes[attrName].value ==="" || " \t".includes (this.attributes[attrName].value)) return 'vide';
	else return this.attributes[attrName].value;
}
Element.prototype.verifyTitle = function(){
	if (this.infos.isEmpty) this.infos = this.compareNames();
	else this.infos = this.infos + '\n' + this.compareNames();
}
Element.prototype.verifyRole = function(){
	if (this.infos.isEmpty) this.infos = 'role: '+ getAttributeValue ('role');
	else this.infos = this.infos + '\nrole: '+ this.getAttributeValue ('role');
}
Element.prototype.verifyAttribute = function (attrName){
	if (this.infos.isEmpty) this.infos = attrName +': '+ getAttributeValue (attrName);
	else this.infos = this.infos + '\n'+ attrName +': '+ this.getAttributeValue (attrName);
}
Element.prototype.isinLink = function (roleValue){
	if (this.tagName === 'BODY') return null;
	else if (this.tagName === 'A' || (this.attributes['role'] !== undefined && this.attributes['role'].value === 'link')) return 'link';
	else if (this.tagName === 'BUTTON' || (this.tagName === 'INPUT' || 'button submit reset'.includes (this.type))) return 'button';
	else return this.parentElement.isinLink();
}
Element.prototype.replaceMyClasses = function(){
	if (this.className === undefined || this.className ==="") return "";
	else{
		var newClass = this.className.strip();
		if (newClass ==="") return "";
		for (var c=0; c< myClasses.length; c++) newClass = newClass.replaceAll (myClasses[c], "");
		newClass = newClass.strip();
		newClass = newClass.replaceAll (" ",".");
		return newClass;
}}
Element.prototype.addLabelModal = function(){
	var name = this.tagName;
	if (exists (this.id)) name = name +" #"+ this.id;
	if (exists (this.className)){
		var className = this.className;
		for (var c=0; c< myClasses.length; c++) className = className.replaceAll (myClasses[c], "");
		while (className.includes ("  ")) className = className.replaceAll ("  "," ");
		className = className.strip();
		if (exists (className)) name = name +" ."+ className.replaceAll (" ",'.');
	}
	const role = this.role;
	if (exists (role)) name = name +" role: "+ role;
	return name;
}
Element.prototype.addLabel = function(){
	if (this.infos.includes ('OBLIGATOIRE') || this.infos.includes ('ERREUR') || this.className.includes ('rgaa-error')) this.label = 'erreur';
	else this.label = 'ok';
	this.label = this.addLabelModal() +" "+ this.label;
}
Element.prototype.addInfos_vc = function(){
	// utilise la modale js
	this.verifyRole();
	this.verifyTitle();
	if (this.infos.includes ('erreur:')){
		this.classList.add ('rgaa-error');
		this.label = 'erreur';
	}
	else this.label = 'ok';
	// Element.prototype.addInfos.call (this); appeler dans une descendante
}
Element.prototype.addInfos = function(){
	// utilise le sélecteur css :before
	this.verifyTitle();
	this.setAttribute ('infos', this.infos);
//	this.setAttribute ('infos', this.infos.replaceAll ('<br/>', '\n'));
	if (this.infos.includes ('erreur:')) this.classList.add ('rgaa-error');
}
HTMLScriptElement.prototype.addInfos = function(){ return; }
Element.prototype.addBorder = function(){
	// fonctionne avec ana-common.css
	this.classList.add ('rgaa-highlight');
	if (this.innerHTML ==="" && this.tagName !== 'IMG') this.infos = this.infos + '\ncontenu vide OBLIGATOIRE';
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
Element.prototype.getByAttribute = function (attrName){
	var elements =[];
	if (this.AttributePresent (attrName)) elements.push (this);
	return elements;
}
HTMLElement.prototype.getByAttribute = function (attrName){
	var elements = Element.prototype.getByAttribute.call (this, attrName);
	for (var c=0; c< this.children.length; c++){
		elementsChild = this.children[c].getByAttribute (attrName);
		for (var e=0; e< elementsChild.length; e++) elements.push (elementsChild[e]);
	}
	return elements;
}
Element.prototype.getByAttributeValue = function (attrName, attrValue){
	var elements =[];
	if (this.getAttribute (attrName) === attrValue) elements.push (this);
	return elements;
}
HTMLElement.prototype.getByAttributeValue = function (attrName, attrValue){
	var elements = Element.prototype.getByAttributeValue.call (this, attrName, attrValue);
	for (var c=0; c< this.children.length; c++){
		elementsChild = this.children[c].getByAttributeValue (attrName, attrValue);
		for (var e=0; e< elementsChild.length; e++) elements.push (elementsChild[e]);
	}
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