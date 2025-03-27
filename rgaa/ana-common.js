const blankChars = '\n \t';
const myClasses =[ 'rgaa-highlight', 'rgaa-error', 'rgaa-nobg', 'rgaa-notx', 'rgaa-bgimg', 'rgaa-nobgcolor', 'rgaa-double', 'rgaa-complex', 'rgaa-event' ];

Element.prototype.getByRole = function (myRole){
	const role = this.getAttribute ('role');
	if (myRole === role) return this;
	else if (this.children.length ===0) return null;
	var item = null;
	var c=0;
	while (item === null && c< this.children.length){
		item = this.children[c].getByRole (myRole);
		c+=1;
	}
	return item;
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
Element.prototype.getIntitule = function(){
	var intitule ="";
	var method = this.getAttribute ('aria-labelledby');
	if (method){
		method = 'aria-labelledby ('+ method +')';
		var intituleTag = document.getElementById (method);
		if (intituleTag) intitule = intituleTag.innerText;
	}
	if ("" === intitule){
		intitule = this.getAttribute ('aria-label');
		if (intitule) method = 'aria-label';
		else{
			intitule = this.getAttribute ('title');
			if (intitule) method = 'title';
			else if (! method){
				method = 'rien';
				intitule = 'rien';
			}
			else if (method.includes ('aria-labelledby')) intitule = 'pas de tag label';
	}}
	return method +': '+ intitule;
}
HTMLElement.prototype.getIntitule = function(){
	if (! this.innerText.isEmpty()) return 'texte: '+ title.innerText;
	else return Element.prototype.getIntitule.call (this);
}
HTMLInputElement.prototype.getLabel = function(){
	if (this.id.isEmpty()) return null;
	else{
		const labels = document.getElementsByTagName ('label');
		var isLabel = false;
		var l=0;
		var forAttr ="";
		while (! isLabel && l< labels.length){
			forAttr = labels[l].getAttribute ('for');
			if (this.id === forAttr) isLabel = true;
			l++;
		}
		if (isLabel) return labels[l-1];
		else return null;
}}
HTMLInputElement.prototype.getIntitule = function(){
	if (this.id.isEmpty()) return HTMLElement.prototype.getIntitule.call (this);
	else{
		var label = this.getLabel();
		if (label) return 'label: '+ label.innerText;
		else return HTMLElement.prototype.getIntitule.call (this);
}}
Element.prototype.verifyTitle = function(){ this.infos = this.infos + '<br/>' + this.getIntitule(); }
Element.prototype.verifyRole = function(){ this.infos = this.infos + '<br/>role = '+ this.getAttributeValue ('role') +'<br/>'; }
Element.prototype.verifyAttribute = function (attrName){ this.infos = '<br/>' + attrName +' = '+ this.getAttributeValue (attrName); }
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
	const role = this.getAttribute ('role');
	if (exists (role)) name = name +" role: "+ role;
	return name;
}
Element.prototype.addLabel = function(){
	if (this.infos.includes ('OBLIGATOIRE') || this.infos.includes ('ERREUR') || this.className.includes ('rgaa-error')) this.label = 'erreur';
	else this.label = 'ok';
	this.label = this.addLabelModal() +" "+ this.label;
}
Element.prototype.addInfos_vb = function(){
	var alt = this.getAttributeValue ('alt');
	label.innerHTML = 'alt = '+ alt;
	if ([ 'absent', 'vide' ].includes (alt)){
		alt = this.getAttributeValue ('aria-labelledby');
		if ([ 'absent', 'vide' ].includes (alt)){
			alt = this.getAttributeValue ('aria-label');
			if ([ 'absent', 'vide' ].includes (alt)){
				alt = this.getAttributeValue ('title');
				if ([ 'absent', 'vide' ].includes (alt)) label.innerHTML = label.innerHTML +'<br/>pas de titre alternatif'
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