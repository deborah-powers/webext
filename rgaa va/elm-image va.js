// dépend de encart.js et de ana-common.js
HTMLImageElement.prototype.addInfos = function(){
	this.infos = this.compareNames();
	if (this.alt ===""){
		if (this.attributes.getNamedItem ('alt') === null) this.infos = this.infos + '<br/>alt est absent. il est OBLIGATOIRE, même vide';
		else this.infos = this.infos + '<br/>alt est vide';
	}
	Element.prototype.addInfos.call (this);
}
HTMLAreaElement.prototype.addInfos = function(){
	this.infos = this.compareNames();
	if (this.alt ===""){
		if (this.attributes.getNamedItem ('alt') === null) this.infos = this.infos + '<br/>alt est absent. il est OBLIGATOIRE, même vide';
		else this.infos = this.infos + '<br/>alt est vide';
	Element.prototype.addInfos.call (this);
}
SVGElement.prototype.findParent = function(){
	if (this.tagName === 'svg') return this;
	else return this.ownerSVGElement;
}
SVGSVGElement.prototype.verifyRole = function(){
	const role = this.getAttributeValue ('role');
	this.infos = this.infos + '<br/>role = '+ role;
	if (! 'presentation img'.includes (role)) this.infos = this.infos +' OBLIGATOIRE: img ou presentation';
}
SVGSVGElement.prototype.addAll = function(){
	this.addInfos();
	this.addLabel();
	this.addEventListener ('mouseover', function (event){
		const target = event.target.findParent();
		encartRgaa.children[0].innerHTML = 'SVG';
		if (target.id !== undefined && target.id !=="") encartRgaa.children[0].innerHTML = encartRgaa.children[0].innerHTML +' #'+ target.id;
		encartRgaa.children[0].innerHTML = encartRgaa.children[0].innerHTML +" "+ target.label;
		encartRgaa.children[4].innerHTML = target.infos;
		encartRgaa.style.display = 'grid';
	});
}
HTMLCanvasElement.prototype.verifyRole = function(){
	const role = this.getAttributeValue ('role');
	this.infos = this.infos + '<br/>role = '+ role;
	if (! 'presentation img'.includes (role)) this.infos = this.infos +' OBLIGATOIRE: img ou presentation';
}
HTMLObjectElement.prototype.verifyRole = function(){
	const role = this.getAttributeValue ('role');
	this.infos = this.infos + '<br/>role = '+ role;
	if (! 'presentation img'.includes (role)) this.infos = this.infos +' OBLIGATOIRE: img ou presentation';
}
HTMLInputElement.prototype.addInfos = function(){
	this.infos = 'alt = ';
	if (this.alt ===""){
		if (this.attributes.getNamedItem ('alt') === null) this.infos = this.infos + 'absent. OBLIGATOIRE, même vide';
		else this.infos = this.infos + 'vide';
	}
	else this.infos = this.infos + this.alt;
	Element.prototype.addInfos.call (this);
}
HTMLInputElement.prototype.addAll = function(){
	if (this.type === 'image'){
		this.addBorder();
		this.addInfos();
		this.addLabel();
		this.addModal();
}}
HTMLElement.prototype.addInfos = function(){
	this.infos = "ERREUR, il manque une couleur de fond pour doubler l'image";
	this.label = this.addLabelModal() +' erreur';
}
HTMLElement.prototype.addInfosParent = function(){
	this.infos = this.parentElement.infos;
	this.label = this.parentElement.label +' - '+ this.addLabelModal();
	for (var c=0; c< this.children.length; c++) this.children[c].addInfosParent();
}
HTMLElement.prototype.bgImageDoublee = function(){
	const style = window.getComputedStyle (this);
	if (style.backgroundImage !== 'none'){
	//	this.classList.add ('rgaa-bgimg');
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)')){
			this.addInfos();
			this.addModal();
			this.classList.add ('rgaa-nobgcolor');
			for (var c=0; c< this.children.length; c++) this.children[c].addInfosParent();
	}}
	else{ for (var c=0; c< this.children.length; c++) this.children[c].bgImageDoublee(); }
}
HTMLScriptElement.prototype.bgImageDoublee = function(){ return; }
SVGSVGElement.prototype.bgImageDoublee = function(){ return; }

document.body.bgImageDoublee();
document.body.verifyRole ('img');
document.body.verifyRole ('presentation');
var images = document.getElementsByTagName ('img');
for (var i=0; i< images.length; i++) images[i].addAll();
images = document.getElementsByTagName ('input');
for (var i=0; i< images.length; i++) images[i].addAll();
images = document.getElementsByTagName ('area');
for (var i=0; i< images.length; i++) images[i].addAll();
images = document.getElementsByTagName ('svg');
for (var i=0; i< images.length; i++) images[i].addAll();
images = document.getElementsByTagName ('text');
for (var i=0; i< images.length; i++) images[i].style.fill = 'yellow';
images = document.getElementsByTagName ('canvas');
for (var i=0; i< images.length; i++) images[i].addAll();
images = document.getElementsByTagName ('object');
for (var i=0; i< images.length; i++) images[i].addAll();