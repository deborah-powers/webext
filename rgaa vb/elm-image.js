// dépend de ana-common.js et de ana-name.js

Element.prototype.verifyRoleImg = function(){
	infos = infos +'\t';
	if (exists (this.role)) infos = infos + this.role;
	else infos = infos +'.';
	infos = infos + this.compareNames();
	if (this.role === null || this.role === undefined || ! 'presentation img'.includes (this.role))
		infos = infos +'\n\t! le rôle doit valoir img ou présentation';
}
HTMLElement.prototype.addInfosImg = function(){
	infos = infos +'\n'+ this.tagName +'\t';
	if (exists (this.src)) infos = infos + this.src;
	else infos = infos +'.';
	infos = infos + '\t';
	if (exists (this.alt)) infos = infos + this.alt;
	else infos = infos +'.';
	if (exists (this.src)) infos = infos + '\n\t! pas de lien';
}
HTMLImageElement.prototype.addInfos = function(){
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
	infos = infos + '\n'+ this.tagName;
	this.verifyRoleImg();
}
HTMLElement.prototype.bgImageDoublee = function(){
	const style = window.getComputedStyle (this);
	if (style.backgroundImage !== 'none'){
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)'))
			infos = infos + "\n\t! pas de couleur de fond doublant l'image";
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
