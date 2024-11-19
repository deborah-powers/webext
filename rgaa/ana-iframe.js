/* les figures, qui sont traitées avec les images, sont dans cette page
les images légendées aussi, afin d'éviter les interférences avec les images basiques
*/
HTMLIFrameElement.prototype.verifyAttributeTitle = function(){
	const title = this.getAttribute ('title');
	this.infos = this.infos + '<br/>title = '+ title;
	if ('absent vide'.includes (title)) this.infos = this.infos +' OBLIGATOIRE';
}
HTMLElement.prototype.addAllFigure = function(){
	this.addBorder();
	this.addInfos();
	const title = this.getAttribute ('title');
	const label = this.getAttribute ('aria-label');
	if (title.isEmpty() && label.isEmpty()) this.infos = this.infos + '<br/>OBLIGATOIRE: attribut title ou aria-label';
	else if (! label.isEmpty()){
		const caption = this.getElementsByTagName ('figcaption')[0];
		if (! caption.innerHTML.includes (label)) this.infos = this.infos + '<br/>OBLIGATOIRE: la caption reprend le label';
	}
	else if (! title.isEmpty()){
		const caption = this.getElementsByTagName ('figcaption')[0];
		if (! caption.innerHTML.includes (title)) this.infos = this.infos + '<br/>OBLIGATOIRE: la caption reprend le titre';
	}
	if (! this.infos.includes ('role = figure') && ! this.infos.includes ('role = group')){
		var d=7+ this.infos.indexOf ('role = ');
		d= this.infos.indexOf ('<br/>',d);
		this.infos = this.infos.substring (0,d) + ' OBLIGATOIRE: img ou presentation' + this.infos.substring (d);
	}
	this.addLabel();
	this.addModal();
	for (var c=0; c< this.children.length; c++){
		this.children[c].infos = this.infos;
		this.children[c].label = '('+ this.tagName +') '+ this.label;
}}
var frames = document.getElementsByTagName ('iframe');
for (var i=0; i< frames.length; i++) frames[i].addAll();
frames = document.getElementsByTagName ('figure');
for (var i=0; i< frames.length; i++) frames[i].addAllFigure();
