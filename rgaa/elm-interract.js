const rolesAlert =[ 'alert', 'status', 'log', 'progressbar', 'timer', 'marquee' ];

Element.prototype.addInfos = function(){
	const role = this.getAttribute ('role');
	if (rolesAlert.includes (role)){
		this.verifyRole();
		this.verifyTitle();
	}
	else{
		var event = this.getAttribute ('event');
		if (exists (event)) this.infos = 'évênement: '+ event;
		for (var a=0; a< this.attributes.length; a++){
			event = this.attributes[a].name.substring (0,2);
			if ('on' === event) this.infos = this.infos + '<br/>action: '+ this.attributes[a].name;
		}
		if (exists (this.infos)){
			this.verifyRole();
			this.verifyTitle();
}}}
HTMLElement.prototype.addAll = function(){
	Element.prototype.addAll.call (this);
	if (! exists (this.infos)){ for (var c=0; c< this.children.length; c++) this.children[c].addAll(); }
}
HTMLFormElement.prototype.addAll = function(){
	Element.prototype.addAll.call (this);
	for (var c=0; c< this.children.length; c++) this.children[c].addAll();
}
HTMLButtonElement.prototype.addInfos = function(){
	this.infos = this.compareNames();
	if (this.infos.includes ('erreur:')){
		this.classList.add ('rgaa-error');
		this.label = 'erreur';
	}
	else this.label = 'ok';
}
var links = document.getElementsByTagName ('a');
for (var i=0; i< links.length; i++) links[i].addAll();

for (var r=0; r< rolesAlert.length; r++){
	links = document.body.getByRole (rolesAlert[r]);
	for (var i=0; i< links.length; i++) links[i].addAll();
}
document.body.addAll();