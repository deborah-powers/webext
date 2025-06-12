// dépend de ana-common.js et de ana-name.js

Element.prototype.verifyRoleImg = function(){
	infos = infos +'\n';
	if (exists (this.role)) infos = infos + this.role;
	else infos = infos +'.';
	infos = infos + this.compareNames();
	if (this.role === null || this.role === undefined || ! 'presentation img'.includes (this.role))
		infos = infos +'\n! le rôle doit valoir img ou présentation';
}
HTMLElement.prototype.addInfosImg = function(){
	Element.prototype.addInfos.call (this);
	if (! exists (this.src)) infos = infos + '\n! pas de source';
	if (! exists (this.alt)) infos = infos + '\n? pas de alt';
}
HTMLImageElement.prototype.addInfosImg = function(){
	HTMLElement.prototype.addInfosImg.call (this);
	if (exists (this.role) && ['image', 'img'].includes (this.role)) infos = infos + '\n? rôle redondant: '+ this.role;
}
HTMLImageElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);


	this.addInfosImg();
	this.verifyRoleImg();
}
HTMLAreaElement.prototype.addInfos = function(){
	this.addInfosImg();
	this.verifyRoleImg();
}
HTMLInputElement.prototype.addInfos = function(){
	if (this.type === 'image'){
		this.addInfosImg();
		this.verifyRoleImg();
}}
Element.prototype.addInfos = function(){
	infos = infos +'\n\t'+ this.tagName +'\t'+ this.getXpath();
	this.verifyRoleImg();
}
HTMLElement.prototype.bgImageDoublee = function(){
	const style = window.getComputedStyle (this);
	if (style.backgroundImage !== 'none'){
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)'))
			infos = infos + "\n! pas de couleur de fond doublant l'image";
	}
	else{ for (var child of this.children) child.bgImageDoublee(); }
}
Element.prototype.bgImageDoublee = function(){ return; }
HTMLScriptElement.prototype.bgImageDoublee = function(){ return; }
SVGSVGElement.prototype.bgImageDoublee = function(){ return; }

var images = document.getElementsByTagName ('img');
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('input');
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('area');
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('svg');
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('text');
for (var img of images) img.style.fill = 'yellow';
images = document.getElementsByTagName ('canvas');
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('object');
for (var img of images) img.addInfos();
document.body.bgImageDoublee();
prepAnalyse ('image');
