// dépend de ana-common.js et de ana-name.js

Element.prototype.verifyRoleImg = function(){
	if (exists (this.role) && ! [ 'image', 'img', 'presentation' ].includes (this.role))
		infos = infos + '\nrôle interdit: '+ this.role +'. les rôles autorisés sont: img, presentation';
}
HTMLImageElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);
	if (! exists (this.src)) infos = infos + '\npas de source';
	if (this.alt === null || this.alt === undefined) infos = infos + '\npas de alt. il doit toujours être présent, même vide';
	else if (this.alt.isEmpty()) infos = infos + '\nalt vide';
	if (exists (this.role)){
		if ([ 'image', 'img', 'presentation' ].includes ()) infos = infos + '\nrôle redondant: '+ this.role;
		else if (! [ 'button', 'checkbox', 'link', 'math', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'meter', 'option', 'progressbar', 'radio', 'scrollbar', 'separator', 'slider', 'switch', 'tab', 'treeitem' ].includes (this.role))
			infos = infos + '\nrôle interdit: '+ this.role;
}}
HTMLAreaElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);
	if (! exists (this.href)) infos = infos + '\npas de lien';
	if (this.alt === null || this.alt === undefined) infos = infos + '\npas de alt. il doit toujours être présent, même vide';
	else if (this.alt.isEmpty()) infos = infos + '\nalt vide';
	if (exists (this.role)){
		if (this.role === 'link') infos = infos + '\nrôle redondant: link';
		else infos = infos + '\ntous les rôles sont interdit, y compris: '+ this.role;
}}
HTMLInputElement.prototype.addInfos = function(){
	if (this.type === 'image'){
		Element.prototype.addInfos.call (this);
		if (! exists (this.src)) infos = infos + '\npas de source';
		if (! exists (this.alt)) infos = infos + '\npas de alt';
		this.verifyRoleImg();
}}
SVGSVGElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);
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
images = document.getElementsByTagName ('canvas');
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('object');
for (var img of images) img.addInfos();
document.body.bgImageDoublee();
prepAnalyse ('image');
