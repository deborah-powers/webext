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
	attList = attList.strip();
	if (attList.isEmpty()) return "";
	else return attList;
}
HTMLTableCellElement.prototype.containAttDataTab = function(){
	var attList ="";
	for (var t=3; t< attDataTab.length; t++){
		if (this.getAttribute (attDataTab[t]) !== null) attList = attList +", "+ attDataTab[t];
	}
	if (attList[0] ===',') attList = attList.substring (2);
	attList = attList.strip();
	return attList;
}
HTMLElement.prototype.verifyRole = function(){
	const tabRole = this.getAttributeValue ('role');
	if (! tabRole.isEmpty()) this.infos = this.infos + 'rôle = '+ this.getAttributeValue ('role') +'<br/>';
}
HTMLTableElement.prototype.verifyTitle = function(){
	var captionTag = this.getElementsByTagName ('caption')[0];
	if (captionTag !== undefined) this.infos = this.infos + 'caption: '+ captionTag.innerText +'<br/>';
	Element.prototype.verifyTitle.call (this);
}
HTMLTableRowElement.prototype.countHeaders = function(){ return this.getElementsByTagName ('th').length; }
HTMLTableElement.prototype.isDoubleEntree = function(){
	const rows = this.getElementsByTagName ('tr');
	if (rows.length >0){
		const colHeaders = rows[0].countHeaders();
		var rowHeaders =0;
		if (rows.length >1) rowHeaders = rows[1].countHeaders();
		if ((colHeaders >0 && rowHeaders >0) || rowHeaders >1){
			this.classList.add ('rgaa-dbe');
			if (! this.innerHTML.includes (" scope=")) this.classList.add ('rgaa-error');
}}}
HTMLTableElement.prototype.addInfos = function(){
	this.verifyRole();
	this.verifyTitle();
	if (['none', 'presentation'].includes (this.getAttribute ('role'))){
		var tagData = this.containAttDataTab();
		if (tagData !==""){
			this.infos = this.infos + "<br/>ERREUR, attributs réservés aux tableaux de données (" + tagData +")";
			this.classList.add ('rgaa-error');
		}
		tagData = this.containTagDataTab();
		if (tagData !==""){
			this.infos = this.infos + "<br/>ERREUR, balises réservés aux tableaux de données (" + tagData +")";
			if (! this.className.includes ('rgaa-error')) this.classList.add ('rgaa-error');
	}}
	else this.isDoubleEntree();
}
HTMLTableElement.prototype.addLabelModal = function(){
	var labelModal = 'tab';
	if (this.id !== undefined && this.id !=="") labelModal = labelModal +' #'+ this.id;
	if (this.className !== undefined && this.className !==""){
		var newClass = this.replaceMyClasses();
		if (newClass){
			newClass = newClass.replaceAll (" ",".");
			labelModal = labelModal +' .'+ newClass;
	}}
	return labelModal;
}
HTMLTableElement.prototype.addAll = function(){
	this.addInfos();
	this.addLabel();
	this.addModal();
	var children = this.getElementsByTagName ('td');
	for (var c=0; c< children.length; c++){
		children[c].infos = this.infos;
		children[c].label = "(td) "+ this.label;
	}
	children = this.getElementsByTagName ('th');
	for (var c=0; c< children.length; c++){
		children[c].infos = this.infos;
		children[c].label = "(th) "+ this.label;
	}
	children = this.getElementsByTagName ('caption');
	if (children.length >0){
		children[0].infos = this.infos;
		children[0].label = "(caption) "+ this.label;
}}
var tables = document.getElementsByTagName ('table');
for (var t=0; t< tables.length; t++) tables[t].addAll();
tables = document.body.getByAttributeValue ('role', 'table');
for (var t=0; t< tables.length; t++) tables[t].addAll();
