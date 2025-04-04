/* dépend de ana-common
calculer les noms visibles et accessibles
*/
String.prototype.cleanName = function(){
	var intitule = this.toLowerCase();
	intitule = intitule.replaceAll ('\n'," ");
	intitule = intitule.replaceAll ('\t'," ");
	intitule = intitule.strip();
	while (intitule.includes ("  ")) intitule = intitule.replaceAll ("  "," ");
	return intitule;
}
Element.prototype.visibleName = function(){ return ""; }
HTMLElement.prototype.visibleName = function(){
	if (this.innerText) return this.innerText.cleanName();
	else return 'rien: rien';
}
HTMLFieldSetElement.prototype.visibleName = function(){
	if (this.innerHTML.includes ('</legend>')){
		const legend = this.getElementByTagName ('legend')[0];
		return legend.visibleName();
	}
	else return this.innerText.cleanName();
}
HTMLInputElement.prototype.visibleName = function(){
	if (this.type === 'hidden') return 'rien: invisible';
	else if (this.labels.length ===1) return this.labels[0].visibleName();
	else if ([ 'button', 'submit', 'reset' ].includes (this.type) && exists (this.value)) return this.value.toLowerCase();
	else return 'rien: rien';
}
SVGSVGElement.prototype.visibleName = function(){
	var intitule ="";
	if (exists (this.textContent)){
		intitule = this.textContent.toLowerCase();
		intitule = intitule.replaceAll ('\n'," ");
		intitule = intitule.replaceAll ('\t'," ");
		intitule = intitule.strip();
	}
	return intitule;
}
Element.prototype.accessibleName = function(){
	if (this.getAttribute ('hidden')) return 'rien: invisible';
	var intitule ="";
	var method = this.getAttribute ('aria-labelledby');
	if (method){
		method = 'aria-labelledby ('+ method +')';
		var intituleTag = document.getElementById (method);
		if (intituleTag){
			intitule = intituleTag.accessibleName();
			var d=2+ intitule.indexOf (': ');
			intitule = intitule.substring (d);
	}}
	if ("" === intitule){
		intitule = this.getAttribute ('aria-label');
		if (intitule) method = 'aria-label';
		else if (this.children.length >0 && false){
			// boucle sautée pour le momment
			var intituleChild ="";
			var intituleChildren ="";
			for (var c=0; c< this.children; c++){
				intituleChild = this.children[c].accessibleName();
				if (! intituleChild.includes ('rien: ') && ! intituleChild.includes ('pas de tag label')){
					var d=2+ intituleChild.indexOf (': ');
					intituleChild = intituleChild.substring (d);
					if (intituleChild.includes ('<br/>')){
						d= intituleChild.indexOf ('<br/>');
						intituleChild = intituleChild.substring (0,d);
					}
					intituleChildren =", "+ intituleChild;
			}}
			if (intituleChildren){
				method = 'enfants';
				intitule = intituleChildren;
		}}
		else{
			intitule = this.getAttribute ('title');
			if (intitule) method = 'title';
			else if (! method){
				method = 'rien';
				intitule = 'rien';
			}
			else if (method.includes ('aria-labelledby')) intitule = 'pas de tag label';
	}}
	return method +': '+ intitule;
}
HTMLElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (! this.innerText.isEmpty()) return 'texte: '+ this.innerText.cleanName();
	return intitule;
}
HTMLFieldSetElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (this.innerHTML.includes ('</legend>')){
		const legend = this.getElementByTagName ('legend')[0];
		return legend.accessibleName();
	}
	else return intitule;
}
HTMLInputElement.prototype.accessibleName = function(){
	if (this.type === 'hidden') return 'rien: invisible';
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	var complementErreur ="";
	if (this.labels.length >1) complementErreur = '<br/>plusieurs labels';
	else if (this.labels.length ===1) intitule = 'label: '+ this.labels[0].innerText;
	else if (this.type === 'image' && this.alt) intitule = 'image: '+ this.alt;
	else if ([ 'button', 'submit', 'reset' ].includes (this.type) && exists (this.value)) intitule = 'value: '+ this.value;
	intitule = intitule + complementErreur;
	return intitule;
}
HTMLImageElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (exists (this.getAttribute (alt))) return 'alt: '+ this.getAttribute (alt);
	else return intitule;
}
HTMLAreaElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	const title = this.getAttribute (alt);
	if (exists (title)) return 'alt: '+ title;
	else return intitule;
}
SVGSVGElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	const title = this.getElementByTagNameNs ('title')[0];
	if (exists (title)) intitule = 'title tag: '+ title;
	else if (exists (this.textContent)){
		intitule = this.textContent.toLowerCase();
		intitule = intitule.replaceAll ('\n'," ");
		intitule = intitule.replaceAll ('\t'," ");
		intitule = intitule.strip();
	}
	return intitule;
}
Element.prototype.compareNames = function(){
	var accessibleName = this.accessibleName();
	accessibleName = accessibleName.toLowerCase();
	const visibleName = this.visibleName();
	if ("" !== visibleName && ! accessibleName.includes (visibleName)) accessibleName = accessibleName + '<br/>le nom accessible ne reprend pas le nom visible';
	return accessibleName;
}
