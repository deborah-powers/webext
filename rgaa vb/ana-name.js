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
	else return "";
}
HTMLFieldSetElement.prototype.visibleName = function(){
	if (this.innerHTML.includes ('</legend>')){
		const legend = this.getElementsByTagName ('legend')[0];
		if (exists (legend)) return legend.visibleName();
		else return "";
	}
	else return this.innerText.cleanName();
}
HTMLTableElement.prototype.visibleName = function(){
	if (this.innerHTML.includes ('</caption>')){
		const legend = this.getElementsByTagName ('caption')[0];
		if (exists (legend)) return legend.visibleName();
		else return "";
	}
	else return "";
}
HTMLInputElement.prototype.visibleName = function(){
	if (this.type === 'hidden') return 'rien: invisible';
	else if (this.labels.length ===1) return this.labels[0].visibleName();
	else if ([ 'button', 'submit', 'reset' ].includes (this.type) && exists (this.value)) return this.value.toLowerCase();
	else return "";
}
HTMLImageElement.prototype.visibleName = function(){ return ""; }
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
Element.prototype.description = function(){
	if (this.getAttribute ('hidden')) return 'rien: invisible';
	var intitule ="";
	var method = this.getAttribute ('aria-describedby');
	if (method){
		method = 'aria-describedby ('+ method +')';
		for (var l=0; l< this.ariaDescribedByElements.length; l++){
			var intituleTag = this.ariaDescribedByElements[l].accessibleName();
			var d=2+ intituleTag.indexOf (': ');
			intitule = intitule +', '+ intituleTag.substring (d);
}}}
Element.prototype.accessibleName = function(){
	if (this.getAttribute ('hidden')) return 'rien: invisible';
	var intitule ="";
	var method = this.getAttribute ('aria-labelledby');
	if (method){
		method = 'aria-labelledby ('+ method +')';
		for (var l=0; l< this.ariaLabelledByElements.length; l++){
			var intituleTag = this.ariaLabelledByElements[l].accessibleName();
			var d=2+ intituleTag.indexOf (': ');
			intitule = intitule +', '+ intituleTag.substring (d);
	}}
	if ("" === intitule){
		intitule = this.getAttribute ('aria-label');
		if (intitule) method = 'aria-label';
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
	else if (this.children.length >0 && false){
		// l'attribut alt de l'image ne sert pas de nom pour sont conteneur
		var intituleChild ="";
		var intituleChildren ="";
		for (var child of this.children){
			intituleChild = child.accessibleName();
			if (! intituleChild.includes ('rien: ') && ! intituleChild.includes ('pas de tag label')){
				var d=2+ intituleChild.indexOf (': ');
				intituleChild = intituleChild.substring (d);
				if (intituleChild.includes ('\n') && false){
					d= intituleChild.indexOf ('\n');
					intituleChild = intituleChild.substring (0,d);
				}
				intituleChildren =", "+ intituleChild;
		}}
		if (intituleChildren) intitule = 'enfants: '+ intituleChildren.substring (2);
	}
	else if (! this.innerText.isEmpty()) intitule = 'texte: '+ this.innerText.cleanName();
	return intitule;
}
HTMLFieldSetElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (this.innerHTML.includes ('</legend>')){
		const legend = this.getElementsByTagName ('legend')[0];
		return 'légende '+ legend.accessibleName();
	}
	else return intitule;
}
HTMLTableElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (this.innerHTML.includes ('</caption>')){
		const legend = this.getElementsByTagName ('caption')[0];
		return 'caption '+ legend.accessibleName();
	}
	else if ('title' === intitule.substring (0,5)) return intitule;
	else return "rien: rien";
}
HTMLInputElement.prototype.accessibleName = function(){
	if (this.type === 'hidden') return 'rien: invisible';
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	var complementErreur ="";
	if (this.labels.length >1) complementErreur = '\nplusieurs labels';
	else if (this.labels.length ===1) intitule = 'label: '+ this.labels[0].innerText;
	else if (this.type === 'image' && this.alt) intitule = 'image: '+ this.alt;
	else if ([ 'button', 'submit', 'reset' ].includes (this.type) && exists (this.value)) intitule = 'value: '+ this.value;
	intitule = intitule + complementErreur;
	return intitule;
}
HTMLImageElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	else if (exists (this.alt)) return 'alt: '+ this.alt;
	else return intitule;
}
HTMLAreaElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	const title = this.alt;
	if (exists (title)) return 'alt: '+ title;
	else return intitule;
}
SVGSVGElement.prototype.accessibleName = function(){
	var intitule = Element.prototype.accessibleName.call (this);
	if ('aria-' === intitule.substring (0,5)) return intitule;
	const title = this.getElementsByTagName ('title')[0];
	if (exists (title)) intitule = 'title tag: '+ title.innerHTML;
	else if (exists (this.textContent)){
		intitule = this.textContent.toLowerCase();
		intitule = intitule.replaceAll ('\n'," ");
		intitule = intitule.replaceAll ('\t'," ");
		intitule = 'texte: '+ intitule.strip();
	}
	return intitule;
}
Element.prototype.compareNames = function(){
	var accessibleName = this.accessibleName();
	accessibleName = accessibleName.toLowerCase();
	accessibleName = 'nom accessible: ('+ accessibleName.replace (':', ')');
	const description = this.description();
	if (description) accessibleName = accessibleName + '\ndesc: '+ description;
	const visibleName = this.visibleName();
	if ("" !== visibleName && ! accessibleName.includes (visibleName))
		accessibleName = accessibleName + '\nle nom accessible ne reprend pas le nom visible';
	accessibleName = accessibleName.replaceAll ('(rien) rien', 'rien');
	accessibleName = accessibleName.replace ('nom accessible: rien', 'nom accessible: manquant')
	return accessibleName;
}
