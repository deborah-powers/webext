HTMLElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (this.innerHTML.includes ('caption')){
		const caption = this.getAllByRole ('caption');
		if (! exists (caption)) return intitule;
		else return 'caption: '+ caption.innerText;
	}
	else return intitule;
}
HTMLElement.prototype.visibleName = function(){
	if (this.innerHTML.includes ('caption')){
		const caption = this.getAllByRole ('caption');
		if (! exists (caption)) return 'rien: rien';
		else return 'caption: '+ caption.innerText;
	}
	else return 'rien: rien';
}
var tables = document.getElementsByTagName ('table');
tables.setNbItemMax ('table');
for (var i=0; i< nbItemMax; i++){
	tables[i].addInfos();
	tables[i].setAttribute ('infos', tables[i].infos);
}
tables = document.getAllByRole ('table');
tables.setNbItemMax ('role table');
for (var i=0; i< nbItemMax; i++){
	tables[i].addInfos();
	tables[i].setAttribute ('infos', tables[i].infos);
}
downloadAnalyse ('tableau');