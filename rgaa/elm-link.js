/* dépend de encart.js et de ana-common.js
j'ai des réserves concernant ma méthode de calcul du nom accessible.
je garde ma méthode faute de mieux savoir.
prendre en compte la valeur des pseudo-classes :before et :after
*/
HTMLAnchorElement.prototype.addAll = function(){
	this.addInfos();
	this.addModal();
}
HTMLAnchorElement.prototype.addInfos = function(){
	// identifier le nom accessible
	[ intitule, origine ] = this.getIntitule();
	this.infos = 'nom accessible: '+ intitule +'<br/>origine: '+ origine;
	if ('vide' === intitule) this.label = 'ko';
	else if (intitule.includes (this.innerText.strip())) this.label = 'ok';
	else{
		this.label = 'ko';
		this.infos = this.infos +'<br/>le nom accessible ne reprends pas le texte visible';
	}
	this.label = this.addLabelModal() +" "+ this.label;
}
HTMLElement.prototype.getIntitule = function(){
	[ intitule, origine ] = Element.prototype.getIntitule.call (this);
	if ('aria-' === origine.substring (0,5) || this.innerHTML.isEmpty()) return [ intitule, origine ];
	else{
		var intituleBis ="";
		var origineBis ="";
		if (! this.innerText.isEmpty()){
			intituleBis = this.innerText.strip();
			origineBis = 'texte lisible';
		}
		var intituleImage = this.getIntituleImage ('img');
		if (""!== intituleImage){
			origineBis = origineBis +', images';
			intituleBis = intituleBis + intituleImage;
		}
		intituleImage = this.getIntituleImage ('area');
		if (""!== intituleImage){
			origineBis = origineBis +', areas';
			intituleBis = intituleBis + intituleImage;
		}
		intituleImage = this.getIntituleImage ('svg');
		if (""!== intituleImage){
			origineBis = origineBis +', svg';
			intituleBis = intituleBis + intituleImage;
		}
		intituleBis = intituleBis.replaceAll ('vide, ',"");
		origineBis = origineBis.replaceAll ('rien, ',"");
		if (',' === intituleBis[0]){
			intituleBis = intituleBis.substring (2);
			origineBis = origineBis.substring (2);
		}
		if (""=== intituleBis) return [ intitule, origine ];
		else return [ intituleBis, origineBis ];
}}
HTMLElement.prototype.getIntituleImage = function (imgTag){
	if (this.innerHTML.includes ('<'+ imgTag)){
		const images = this.getElementsByTagName (imgTag);
		var intitule ="";
		var intituleTest ="";
		for (var i=0; i< images.length; i++){
			intituleTest = images[i].getIntitule();
			if ('vide' !== intituleTest) intitule = intitule +', '+ intituleTest;
		}
		return intitule;
	}
	else return "";
}
HTMLImageElement.prototype.getIntitule = function(){
	const intituleInfos = Element.prototype.getIntitule.call (this);
	if ('aria-' === intituleInfos[1].substring (0,5) || this.alt.isEmpty()) return intituleInfos[0];
	else return this.alt
}
HTMLAreaElement.prototype.getIntitule = function(){
	const intituleInfos = Element.prototype.getIntitule.call (this);
	if ('aria-' === intituleInfos[1].substring (0,5) || this.alt.isEmpty()) return intituleInfos[0];
	else return this.alt;
}
SVGSVGElement.prototype.getIntitule = function(){
	const intituleInfos = Element.prototype.getIntitule.call (this);
	if ('aria-' === intituleInfos[1].substring (0,5)) return intituleInfos[0];
	var tagIntitule = this.getElementsByTagName ('title')[0];
	if (exists (tagIntitule) && ! tagIntitule.innerText.isEmpty()) return tagIntitule.innerText;
	else{
		var intitule = this.getAttribute ('xlink:title');
		if (exists (intitule)) return intitule
	//	le texte est déjà identifié dans parent.innerText.
		else if (! this.textContent.isEmpty()) return 'vide';
		else return intituleInfos[0];
}}
Element.prototype.getIntitule = function(){
	var intitule = this.getAttribute ('aria-labelledby');
	var origine = 'aria-labelledby';
	if (! exists (intitule)){
		intitule = this.getAttribute ('aria-label');
		if (exists (intitule)) origine = 'aria-label';
		else{
			intitule = this.getAttribute ('title');
			if (exists (intitule)) origine = 'attr title';
			else{
				intitule = 'vide';
				origine = 'rien';
	}}}
	return [ intitule, origine ];
}
var links = document.getElementsByTagName ('a');
for (var i=0; i< links.length; i++) links[i].addAll();
