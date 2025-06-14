/* dépend de ana-common.js et de ana-name.js
tous les éléments n'ont pas la propriété before
*/
Element.prototype.verifyRoleImg = function(){
	if (exists (this.role) && ! [ 'image', 'img', 'presentation' ].includes (this.role)){
		infos = infos + '\nrôle interdit: '+ this.role +'. les rôles autorisés sont: img, presentation';
		this.infos = this.infos + '\nrôle interdit: '+ this.role;
}}
HTMLImageElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);
	if (! exists (this.src)){
		infos = infos + '\npas de source';
		this.infos = this.infos + '\npas de source';
	}
	if (this.alt === null || this.alt === undefined){
		infos = infos + '\npas de alt. il doit toujours être présent, même vide';
		this.infos = this.infos + '\nalt manquant';
	}
	else if (this.alt.isEmpty()){
		infos = infos + '\nalt vide';
		this.infos = this.infos + '\nalt vide';
	}
	if (exists (this.role)){
		if ([ 'image', 'img', 'presentation' ].includes (this.role)){
			infos = infos + '\nrôle redondant: '+ this.role;
			this.infos = this.infos + '\nrôle redondant: '+ this.role;
		}
		else if (! [ 'button', 'checkbox', 'link', 'math', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'meter', 'option', 'progressbar', 'radio', 'scrollbar', 'separator', 'slider', 'switch', 'tab', 'treeitem' ].includes (this.role)){
			infos = infos + '\nrôle interdit: '+ this.role;
			this.infos = this.infos + '\nrôle interdit: '+ this.role;
		}
	}
	this.setAttribute ('infos', this.infos);
}
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
		this.setAttribute ('infos', this.infos);
}}
SVGSVGElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);
	this.verifyRoleImg();
}
HTMLElement.prototype.bgImageDoublee = function(){
	const style = window.getComputedStyle (this);
	if (style.backgroundImage !== 'none'){
		Element.prototype.addInfos.call (this);
		this.classList.add ('rgaa-bgimg');
		if (style.backgroundColor.includes ('rgba') && style.backgroundColor.includes (' 0)')){
			infos = infos + "\npas de couleur de fond doublant l'image";
			this.infos = this.infos + "\npas de couleur de fond doublant l'image";
			this.classList.add ('rgaa-bgnocolor');
		}
		else this.infos = this.infos + "\nprésence d'une couleur de fond, "+ style.backgroundColor;
		this.setAttribute ('infos', this.infos);
	}
	else{ for (var child of this.children) child.bgImageDoublee(); }
}
Element.prototype.bgImageDoublee = function(){ return; }
HTMLScriptElement.prototype.bgImageDoublee = function(){ return; }
SVGSVGElement.prototype.bgImageDoublee = function(){ return; }

var images = document.getElementsByTagName ('img');
if (images.length >100) console.log ("beaucoup d'images", images.length);
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('input');
if (images.length >100) console.log ("beaucoup d'input image", images.length);
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('area');
if (images.length >100) console.log ("beaucoup d'area", images.length);
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('svg');
if (images.length >100) console.log ("beaucoup de svg", images.length);
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('canvas');
if (images.length >100) console.log ("beaucoup de canvas", images.length);
for (var img of images) img.addInfos();
images = document.getElementsByTagName ('object');
if (images.length >100) console.log ("beaucoup d'object", images.length);
for (var img of images) img.addInfos();
document.body.bgImageDoublee();
downloadAnalyse ('image');
