const forbiddenTags =[ 'BASEFONT', 'BIG', 'BLINK', 'CENTER', 'FONT', 'MARQUEE', 'S', 'STRIKE', 'TT' ];
const forbiddenAttr =[ 'align', 'alink', 'background', 'bgcolor', 'border', 'cellpadding', 'cellspacing', 'char', 'charoff', 'clear', 'compact', 'color', 'frameborder', 'hspace', 'link', 'marginheight', 'marginwidth', 'text', 'valign', 'vlink', 'vspace' ];

HTMLElement.prototype.addInfosToChildren = function(){
	this.addLabel();
	this.addModal();
	for (var c=0; c< this.children.length; c++){
		this.children[c].infos = this.infos;
		this.children[c].label = '('+ this.tagName +') '+ this.label;
}}
HTMLElement.prototype.ownForbiddenAttribute = function(){
	var forbiddenAttrLocal ="";
	for (var a=0; a< forbiddenAttr.length; a++){
		if (this.attributes.getNamedItem (forbiddenAttr[a])) forbiddenAttrLocal = forbiddenAttrLocal +", "+ forbiddenAttr[a];
	}
	forbiddenAttrLocal = forbiddenAttrLocal.substring (2);
	return forbiddenAttrLocal;
}
HTMLElement.prototype.addAllForbidden = function(){
	const forbiddenAttrLocal = this.ownForbiddenAttribute();
	if (forbiddenAttrLocal) this.infos = 'ERREUR, attributs interdits: '+ forbiddenAttrLocal;

	if (forbiddenTags.includes (this.tagName)){
		if (forbiddenAttrLocal) this.infos = 'ERREUR, tag interdit<br/>' + this.infos;
		else this.infos = 'ERREUR, tag interdit';
		this.addInfosToChildren();
	}
	else if (forbiddenAttrLocal) this.addInfosToChildren();
	for (var c=0; c< this.children.length; c++) this.children[c].addAllForbidden();
}
document.body.addAllForbidden();