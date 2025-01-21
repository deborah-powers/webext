const tagDataTab =[ 'caption', 'th', 'thead', 'tfoot' ];
const attDataTab =[ 'title', 'aria-label', 'aria-labelledby', 'scope', 'rowspan', 'colspan' ];
HTMLTableElement.prototype.containTagDataTab = function(){
	var tagList ="";
	for (var t=0; t< tagDataTab.length; t++){
		if (this.getElementsByTagName (tagDataTab[t]).length >0) tagList = tagList +", "+ tagDataTab[t];
	}
	if (tagList[0] ===',') tagList = tagList.substring (2);
	return tagList;
}
HTMLElement.prototype.containAttDataTab = function(){
	var attList ="";
	for (var c=0; c< this.children.length; c++) attList = attList +'\n'+ this.children[c].containAttDataTab();
	return attList;
}
HTMLTableElement.prototype.containAttDataTab = function(){
	var attList ="";
	for (var t=0; t<3; t++){
		if (this.getAttribute (attDataTab[t]) !== null) attList = attList +", "+ attDataTab[t];
	}
	if (attList[0] ===',') attList = attList.substring (2);
	for (var c=0; c< this.children.length; c++) attList = attList +'\n'+ this.children[c].containAttDataTab();
	while (attList.includes ('\n\n')) attList = attList.replaceAll ('\n\n', '\n');
	if (attList ==='\n') return "";
	else return attList;
}
HTMLTableCellElement.prototype.containAttDataTab = function(){
	var attList ="";
	for (var t=3; t< attDataTab.length; t++){
		if (this.getAttribute (attDataTab[t]) !== null) attList = attList +", "+ attDataTab[t];
	}
	if (attList[0] ===',') attList = attList.substring (2);
	return attList;
}
HTMLTableElement.prototype.verifyTitle = function(){
	var captionTag = this.getElementsByTagName ('caption')[0];
	if (captionTag !== undefined) this.infos = this.infos + 'caption: '+ captionTag.innerText +'<br/>';
	Element.prototype.verifyTitle.call (this);
}
HTMLTableElement.prototype.addInfos = function(){
	this.verifyRole();
	this.verifyTitle();
	if ('none presentation'.includes (this.getAttribute ('role'))){
		var tagData = this.containAttDataTab();
		if (tagData !=="")
			this.infos = this.infos + "<br/>ERREUR, attributs réservés aux tableaux de données (" + tagData +")";
		tagData = this.containTagDataTab();
		if (tagData !=="")
			this.infos = this.infos + "<br/>ERREUR, balises réservés aux tableaux de données (" + tagData +")";
}}
HTMLTableElement.prototype.addAll = function(){
	this.addInfos();
	this.addLabel();
	this.addModal();
	var children = this.getElementsByTagName ('td');
	for (var c=0; c< children.length; c++){
		children[c].infos = this.infos;
		children[c].label = '('+ this.tagName +') '+ this.label;
	}
	children = this.getElementsByTagName ('th');
	for (var c=0; c< children.length; c++){
		children[c].infos = this.infos;
		children[c].label = '('+ this.tagName +') '+ this.label;
	}
	children = this.getElementsByTagName ('caption');
	if (children.length >0){
		children[0].infos = this.infos;
		children[0].label = '('+ this.tagName +') '+ this.label;
	}
}
/*
HTMLElement.prototype.findParent = function(){
	if (this.tagName !== 'TABLE' && this.tagName !== 'BODY') this.parentElement.findParent();
	else return this;
}
HTMLTableElement.prototype.findParent = function(){ return this; }
HTMLTableCaptionElement.prototype.findParent = function(){ return this.parentElement.findParent(); }
HTMLTableRowElement.prototype.findParent = function(){ return this.parentElement.findParent(); }
HTMLTableCellElement.prototype.findParent = function(){ return this.parentElement.parentElement.findParent(); }
*/
const tables = document.getElementsByTagName ('table');
for (var t=0; t< tables.length; t++) tables[t].addAll();

