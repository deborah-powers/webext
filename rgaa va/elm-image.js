// dépend de ana-common.js
Element.prototype.verifyRoleImg = function(){
	Element.prototype.verifyRole.call (this);
	var role = this.getAttributeValue ('role');
	if (! 'presentation img'.includes (role)){
		this.infos = this.infos +' OBLIGATOIRE: img ou presentation';
		this.classList.add ('rgaa-error');
}}
SVGSVGElement.prototype.verifyRole = function(){ this.verifyRoleImg(); }
HTMLCanvasElement.prototype.verifyRole = function(){ this.verifyRoleImg(); }
HTMLObjectElement.prototype.verifyRole = function(){ this.verifyRoleImg(); }

Element.prototype.addInfos = function(){
	// utilise le sélecteur css :before
	this.verifyTitle();
	this.verifyRole();
	this.setAttribute ('infos', this.infos);
	if (this.infos.includes ('erreur:')) this.classList.add ('rgaa-error');
}
HTMLElement.prototype.addInfosAlt = function(){
	Element.prototype.addInfos.call (this);
	if (this.alt ===""){
		if (this.attributes.getNamedItem ('alt') === null){
			this.infos = this.infos + '\nalt est absent. erreur, il est OBLIGATOIRE, même vide';
			this.classList.add ('rgaa-error');
		}
		else this.infos = this.infos + '\nalt est vide';
}}
HTMLImageElement.prototype.addInfos = function(){ this.addInfosAlt(); }
HTMLAreaElement.prototype.addInfos = function(){ this.addInfosAlt(); }
HTMLInputElement.prototype.addInfos = function(){ if (this.type === 'image'){ this.addInfosAlt(); }}

HTMLElement.prototype.bgImageDoublee = function(){
	const style = window.getComputedStyle (this);
	if (style.backgroundImage !== 'none'){
		this.classList.add ('rgaa-bgimg');
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)')) this.classList.add ('rgaa-bgnocolor');
	}
	else{ for (var c=0; c< this.children.length; c++) this.children[c].bgImageDoublee(); }
}
Element.prototype.bgImageDoublee = function(){ return; }
HTMLScriptElement.prototype.bgImageDoublee = function(){ return; }
SVGSVGElement.prototype.bgImageDoublee = function(){ return; }

document.body.bgImageDoublee();
var images = document.getElementsByTagName ('img');
for (var i=0; i< images.length; i++) images[i].addInfos();
images = document.getElementsByTagName ('input');
for (var i=0; i< images.length; i++) images[i].addInfos();
images = document.getElementsByTagName ('area');
for (var i=0; i< images.length; i++) images[i].addInfos();
images = document.getElementsByTagName ('svg');
for (var i=0; i< images.length; i++) images[i].addInfos();
images = document.getElementsByTagName ('text');
for (var i=0; i< images.length; i++) images[i].style.fill = 'yellow';
images = document.getElementsByTagName ('canvas');
for (var i=0; i< images.length; i++) images[i].addInfos();
images = document.getElementsByTagName ('object');
for (var i=0; i< images.length; i++) images[i].addInfos();
