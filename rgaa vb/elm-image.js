/* dépend de ana-common.js et de ana-name.js
tous les éléments n'ont pas la propriété before
*/
Element.prototype.verifyRoleImg = function(){
	if (! exists (this.role)){
		infos = infos + '\nrôle manquant: img ou presentation';
		this.infos = this.infos + '\nrôle manquant: img ou presentation';
	}
	else if (! [ 'image', 'img', 'presentation' ].includes (this.role)){
		infos = infos + '\nrôle interdit: '+ this.role +'. les rôles autorisés sont: img, presentation';
		this.infos = this.infos + '\nrôle interdit: '+ this.role;
}}
HTMLImageElement.prototype.addInfos = function(){
	HTMLElement.prototype.addInfos.call (this);
	if (! exists (this.src)){
		infos = infos + '\npas de source';
		this.infos = this.infos + '\npas de source';
	}
	if (this.getAttribute ('alt') === null){
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
	HTMLElement.prototype.addInfos.call (this);
	if (! exists (this.href)) infos = infos + '\npas de lien';
	if (this.alt === null || this.alt === undefined) infos = infos + '\npas de alt. il doit toujours être présent, même vide';
	else if (this.alt.isEmpty()) infos = infos + '\nalt vide';
	if (exists (this.role)){
		if (this.role === 'link') infos = infos + '\nrôle redondant: link';
		else infos = infos + '\ntous les rôles sont interdit, y compris: '+ this.role;
}}
HTMLInputElement.prototype.addInfos = function(){
	if (this.type === 'image'){
		HTMLElement.prototype.addInfos.call (this);
		if (! exists (this.src)) infos = infos + '\npas de source';
		if (! exists (this.alt)) infos = infos + '\npas de alt';
	//	this.verifyRoleImg();
		this.setAttribute ('infos', this.infos);
}}
SVGSVGElement.prototype.addInfos = function(){
	Element.prototype.addInfos.call (this);
//	this.verifyRoleImg();
	this.setAttribute ('infos', this.infos);
}
Element.prototype.addInfosOnHover = function(){
	if ([ 'image', 'img', 'presentation' ].includes (this.role)) return true;
	else return false;
}
HTMLImageElement.prototype.addInfosOnHover = function(){ return true; }
HTMLAreaElement.prototype.addInfosOnHover = function(){ return true; }
HTMLInputElement.prototype.addInfosOnHover = function(){
	if (this.type === 'image') return true;
	else return false;
}
SVGSVGElement.prototype.addInfosOnHover = function(){ return true; }

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
images.setNbItemMax ('img');
for (var i=0; i< nbItemMax; i++) images[i].addInfos();
images = document.getElementsByTagName ('input');
images.setNbItemMax ('input img');
for (var i=0; i< nbItemMax; i++) images[i].addInfos();
images = document.getElementsByTagName ('area');
images.setNbItemMax ('area');
for (var i=0; i< nbItemMax; i++) images[i].addInfos();
images = document.getElementsByTagName ('svg');
images.setNbItemMax ('svg');
for (var i=0; i< nbItemMax; i++) images[i].addInfos();
images = document.getElementsByTagName ('canvas');
images.setNbItemMax ('canvas');
for (var i=0; i< nbItemMax; i++) images[i].addInfos();
images = document.getElementsByTagName ('object');
images.setNbItemMax ('object');
for (var i=0; i< nbItemMax; i++) images[i].addInfos();
document.body.bgImageDoublee();
downloadAnalyse ('image');
