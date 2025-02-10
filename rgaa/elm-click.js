Element.prototype.addAll = function(){
	var event = this.getAttribute ('event');
	if (exists (event)) this.infos = 'évênement: '+ event;
	for (var a=0; a< this.attributes.length; a++){
		event = this.attributes[a].name.substring (0,2);
		if ('on' === event) this.infos = this.infos + '<br/>action: '+ this.attributes[a].name;
	}
	if (exists (this.infos)){
		this.label = this.addLabelModal();
		this.addModal();
}}
HTMLElement.prototype.addAll = function(){
	Element.prototype.addAll.call (this);
	if (! exists (this.infos)){ for (var c=0; c< this.children.length; c++) this.children[c].addAll(); }
}
HTMLFormElement.prototype.addAll = function(){
	Element.prototype.addAll.call (this);
	for (var c=0; c< this.children.length; c++) this.children[c].addAll();
}
document.body.addAll();