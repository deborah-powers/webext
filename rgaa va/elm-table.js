const tagDataTab =[ 'caption', 'th', 'thead', 'tfoot' ];
const attDataTab =[ 'title', 'aria-label', 'aria-labelledby', 'scope', 'rowspan', 'colspan' ];
var cellComplexHeaders =[];

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
HTMLTableCellElement.prototype.countColumn = function(){
	var nbCol =1;
	const span = this.getAttribute ('colspan');
	var spanNb =0;
	if (span !== null || span !== undefined){
		spanNb = parseInt (span);
		nbCol += spanNb;
	}
	return nbCol;
}
HTMLTableElement.prototype.countColumn = function(){
	const row = this.getElementsByTagName ('tr')[0];
	var nbCol =0;
	for (var c=0; c< row.children.length; c++) nbCol += rows.children[c].countColumn();
	return nbCol;
}
HTMLTableElement.prototype.isComplex = function(){
	const rows = this.getElementsByTagName ('tr');
	var headerNb = this.getElementsByTagName ('th').length;
	var headerRowNb =[];
	for (var r=0; r< rows.length; r++) headerRowNb.push (rows[r].countHeaders());
	// cas simple, une ligne de header par colonne ou ligne
	if (headerNb === headerRowNb[0]) return;
	else if (headerNb === rows.length){
		var oneHeaderByRow = true;
		for (var r=0; r< rows.length; r++){ if (headerRowNb[r] >1) oneHeaderByRow = false; }
		if (oneHeaderByRow === true) return;
	}
	// cas simple, tableau à double entrée
	else if (headerRowNb[0] >0){
		headerNb -= headerRowNb[0];
		var oneHeaderByRow = true;
		for (var r=1; r< rows.length; r++){ if (headerRowNb[r] >1) oneHeaderByRow = false; }
		if (oneHeaderByRow === true){
			this.classList.add ('rgaa-double');
		//	if (! this.innerHTML.includes (" scope=")) this.classList.add ('rgaa-error');
			return;
	}}
	// cas complèxe
	this.classList.add ('rgaa-complex');
}
function colorHeaders (event){
	for (var h=0; h< cellComplexHeaders.length; h++) cellComplexHeaders[h].classList.remove ('rgaa-highlight');
	const headers = event.target.getAttribute ('headers').split (" ");
	for (var h=0; h< headers.length; h++){
		var header = document.getElementById (headers[h]);
		header.classList.add ('rgaa-highlight');
}}
HTMLTableCellElement.prototype.findCellHeaders = function(){
	// repérer les headers
	const idlist = this.getAttribute ('headers').split (" ");
	for (var i=0; i< idlist.length; i++){
		var header = document.getElementById (idlist[i]);
		if (! cellComplexHeaders.includes (header)) cellComplexHeaders.push (header);
	}
	this.addEventListener ('mouseover', colorHeaders);
}
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
	else this.isComplex();
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
var cellComplex = document.body.getByAttribute ('headers');
for (var t=0; t< cellComplex.length; t++) cellComplex[t].findCellHeaders();
