var cellComplexHeaders =[];

HTMLElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (this.innerHTML.includes ('caption')){
		const caption = this.getAllByRole ('caption')[0];
		if (! exists (caption)) return intitule;
		else return 'caption: '+ caption.accessibleName();
	}
	else return intitule;
}
HTMLElement.prototype.visibleName = function(){
	if (this.innerHTML.includes ('caption')){
		const caption = this.getAllByRole ('caption')[0];
		if (! exists (caption)) return "";
		else return caption.innerText;
	}
	else return "";
}
HTMLTableCaptionElement.prototype.accessibleName = function(){
	const intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (exists (this.innerText)) return 'texte: '+ this.innerText;
	else return intitule;
}
HTMLTableCaptionElement.prototype.visibleName = function(){
	if (this.innerText) return this.innerText.cleanName();
	else return "";
}
// trouver les tableaux complêxes
HTMLTableCellElement.prototype.spanned = function(){
	var cellSpan = this.getAttribute ('colspan');
	if (exists (cellSpan)) return true;
	cellSpan = this.getAttribute ('rowspan');
	if (exists (cellSpan)) return true;
	return false;
}
HTMLTableRowElement.prototype.countHeaders = function(){ return this.getElementsByTagName ('th').length; }
HTMLTableElement.prototype.isComplex = function(){
	const rows = this.getElementsByTagName ('tr');
	// repérer des cellules fusionnées, preuve d'un tableau complêxe
	var cellDouble = false;
	var r=0;
	var c=0;
	while (r< rows.length){
		c=0;
		while (c< rows[r].length){
			if (rows[r][c].spanned()){
				cellDouble = true;
				r= rows.length;
				c= rows[r].length
			} c+=1;
		} r+=1;
	}
	if (cellDouble) return true;
	// repérer les tableaux simples
	var headerNb = this.getElementsByTagName ('th').length;
	const colNb = rows
	var headerRowNb =[];
	for (var r=0; r< rows.length; r++) headerRowNb.push (rows[r].countHeaders());
	// tableau simple, une ligne de header par ligne ou colonne
	if (headerNb === headerRowNb.length) return false;
	else if (headerNb === headerRowNb[0]) return false;
	// au moins deux lignes de tîtres
	else if (headerRowNb.length < rows.length) return true;
	// compter les colonnes de tîtres
	c=0;
	r=0;
	while (r< headerRowNb.length){
		if (headerRowNb[r] >1) c+=1;
		if (c>1) r= headerRowNb.length;
		r+=1;
	}
	// au moins deux lignes ayant plus d'un en-tête de tître
	if (c>1) return true;
	else return false;
}
HTMLTableCellElement.prototype.findCellHeaders = function(){
	// repérer les headers
	const idlistStr = this.getAttribute ('headers');
	if (! exists (idlistStr)){
		this.classList.add ('rgaa-error');
		return false;
	}
	const idlist = idlistStr.split (" ");
	for (var i=0; i< idlist.length; i++){
		var header = document.getElementById (idlist[i]);
		if (! cellComplexHeaders.includes (header)) cellComplexHeaders.push (header);
	}
	this.addEventListener ('mouseover', colorHeaders);
	return true;
}
function colorHeaders (event){
	for (var h=0; h< cellComplexHeaders.length; h++) cellComplexHeaders[h].classList.remove ('rgaa-highlight');
	const headers = event.target.getAttribute ('headers').split (" ");
	for (var h=0; h< headers.length; h++){
		var header = document.getElementById (headers[h]);
		header.classList.add ('rgaa-highlight');
}}
HTMLTableElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);
	const complex = this.isComplex();
	if (complex){
		this.classList.add ('rgaa-highlight');
		this.infos = this.infos + '\ntableau complêxe';
		const cells = this.getElementsByTagName ('td');
		var cellWheaders = true;
		var cellWheadersTmp = true;
		for (var cell of cells){
			cellWheadersTmp = cell.findCellHeaders();
			if (cellWheaders && ! cellWheadersTmp) cellWheaders = false;
		}
		infos = infos +'\ntableau complêxe';
		if (! cellWheaders){
			this.infos = this.infos + '\ncellules sans headers';
			infos = infos +'\ncellules sans headers';
		}
		this.setAttribute ('infos', this.infos);
}}
var tables = document.getElementsByTagName ('table');
tables.setNbItemMax ('table');
for (var i=0; i< nbItemMax; i++) tables[i].addInfos();
tables = document.body.getAllByRole ('table');
tables.setNbItemMax ('role table');
for (var i=0; i< nbItemMax; i++){
	tables[i].addInfos();
	tables[i].setAttribute ('infos', tables[i].infos);
}
downloadAnalyse ('tableau');
