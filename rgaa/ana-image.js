HTMLImageElement.prototype.addInfos = function(){
	this.infos = 'alt = ';
	if (this.alt ===""){
		if (this.attributes.getNamedItem ('alt') === null) this.infos = this.infos + 'absent. OBLIGATOIRE, même vide';
		else this.infos = this.infos + 'vide';
	}
	else this.infos = this.infos + this.alt;
	this._addInfos();
}
HTMLAreaElement.prototype.addInfos = function(){
	this.infos = 'alt = ';
	if (this.alt ===""){
		if (this.attributes.getNamedItem ('alt') === null) this.infos = this.infos + 'absent. OBLIGATOIRE, même vide';
		else this.infos = this.infos + 'vide';
	}
	else this.infos = this.infos + this.alt;
	this._addInfos();
}
SVGElement.prototype.findParent = function(){
	if (this.tagName === 'svg') return this;
	else return this.ownerSVGElement;
}
SVGSVGElement.prototype.verifyAttributeRole = function(){
	const role = this.getAttribute ('role');
	this.infos = this.infos + '<br/>role = '+ role;
	if (! 'presentation img'.includes (role)) this.infos = this.infos +' OBLIGATOIRE: img ou presentation';
}
SVGSVGElement.prototype.addAll = function(){
	this.addBorder();
	this.addInfos();
	this.addLabel();
	this.addEventListener ('mouseover', function (event){
		var modale = document.getElementById ('modale');
		const target = event.target.findParent();
		modale.children[0].innerHTML = 'SVG';
		if (target.id !== undefined && target.id !=="") modale.children[0].innerHTML = modale.children[0].innerHTML +' #'+ target.id;
		modale.children[0].innerHTML = modale.children[0].innerHTML +" "+ target.label;
		modale.children[2].innerHTML = target.infos;
		modale.style.display = 'grid';
	});
}
HTMLCanvasElement.prototype.verifyAttributeRole = function(){
	const role = this.getAttribute ('role');
	this.infos = this.infos + '<br/>role = '+ role;
	if (! 'presentation img'.includes (role)) this.infos = this.infos +' OBLIGATOIRE: img ou presentation';
}
HTMLObjectElement.prototype.verifyAttributeRole = function(){
	const role = this.getAttribute ('role');
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
	this._addInfos();
}
HTMLInputElement.addAll = function(){
	if (this.type === 'image'){
		this.addBorder();
		this.addInfos();
		this.addLabel();
		this.addModal();
}}
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
