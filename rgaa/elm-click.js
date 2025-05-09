Element.prototype.addInfos = function(){
	var event = this.getAttribute ('event');
	if (exists (event)) this.infos = 'évênement: '+ event;
	for (var a=0; a< this.attributes.length; a++){
		event = this.attributes[a].name.substring (0,2);
		if ('on' === event) this.infos = this.infos + '<br/>action: '+ this.attributes[a].name;
	}
	if (this.tagName === 'BODY') this.infos ="";
	if (exists (this.infos)){
		this.verifyRole();
		this.verifyTitle();
}}
HTMLElement.prototype.addAll = function(){
	Element.prototype.addAll.call (this);
	if (! exists (this.infos)){ for (var c=0; c< this.children.length; c++) this.children[c].addAll(); }
}
HTMLFormElement.prototype.addAll = function(){
	Element.prototype.addAll.call (this);
	for (var c=0; c< this.children.length; c++) this.children[c].addAll();
}
HTMLButtonElement.prototype.addInfos = function(){
	this.verifyTitle();
	if (this.infos.includes ('erreur:')){
		this.classList.add ('rgaa-error');
		this.label = 'erreur';
	}
	else this.label = 'ok';
}
HTMLInputElement.prototype.addInfos = function(){
	if ([ 'button', 'reset', 'submit' ].includes (this.type))
	if ( this.type === 'hidden') return 'rien: invisible';
	var intitule = this.compareNames();
	if (intitule.includes ('plusieurs labels') || intitule.includes ('rien: ') || intitule.includes ('ne reprend pas')) this.classList.add ('rgaa-error');
	if (this.labels.length >0){
		this.addEventListener ('mouseover', colorLabel);
		this.addEventListener ('mouseleave', bleachLabel);
	}
	intitule = intitule.replace ('rien: rien', 'pas de nom accessible');
	this.infos = this.infos +'<br/>'+ intitule;
}
var links = document.getElementsByTagName ('a');
for (var i=0; i< links.length; i++) links[i].addAll();
links = document.body.getAllByRole ('link');
for (var i=0; i< links.length; i++) links[i].addAll();
links = document.getElementsByTagName ('button');
for (var i=0; i< links.length; i++) links[i].addAll();
links = document.body.getAllByRole ('button');
for (var i=0; i< links.length; i++) links[i].addAll();
var links = document.getElementsByTagName ('input');
for (var i=0; i< links.length; i++) links[i].addAll();

input[type='button'], input[type='reset'], input[type='submit']

// document.body.addAll();