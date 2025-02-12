// dépend de encart.js et de ana-common.js
HTMLAnchorElement.prototype.addAll = function(){ Element.prototype.addAll.call (this); }
HTMLAnchorElement.prototype.addInfos = function(){
	// identifier le nom accessible
	const intituleInfos = this.getIntitule();
	this.infos = 'nom accessible: '+ intituleInfos[0] +'<br/>origine: '+ intituleInfos[1];
}
HTMLElement.prototype.getIntitule = function(){
	[ intitule, origine ] = Element.prototype.getIntitule.call (this);
	if ('aria-' === origine.substring (0,5) || this.innerHTML.isEmpty()) return [ intitule, origine ];
	else{
		var intituleBis ="";
		var origineBis ="";
		var intituleInfos =[];
		if (! this.innerText.isEmpty()){
			intituleBis = this.innerText;
			origineBis = 'texte lisible';
		}
		if (this.innerHTML.includes ('<img')){
			origineBis = origineBis +', images';
			const images = this.getElementsByTagName ('img');
			for (var i=0; i< images.length; i++) intituleBis = intituleBis +', '+ images[i].getIntitule();
		}
		if (this.innerHTML.includes ('<area')){
			origineBis = origineBis +', areas';
			const images = this.getElementsByTagName ('area');
			for (var i=0; i< images.length; i++) intituleBis = intituleBis +', '+ images[i].getIntitule();
		}
		if (this.innerHTML.includes ('<svg')){
			origineBis = origineBis +', svg';
			const images = this.getElementsByTagName ('svg');
			for (var i=0; i< images.length; i++) intituleBis = intituleBis +', '+ images[i].getIntitule();
		}
		if (',' === intituleBis[0]){
			intituleBis = intituleBis.substring (2);
			origineBis = origineBis.substring (2);
		}
		console.log (origineBis, '!', origine, '!', intituleBis, '!', intitule);
		if ('vide' === intituleBis) origineBis = 'rien';
		if ([ 'attr title', 'rien' ].includes (origine))
			return [ intituleBis, origineBis ];
		else{
			intitule = intitule +', '+ intituleBis;
			origine = origine +', '+ origineBis;
			return [ intitule, origine ];
}}}
HTMLImageElement.prototype.getIntitule = function(){
	const intituleInfos = Element.prototype.getIntitule.call (this);
	if ('aria-' === intituleInfos[1].substring (0,5)) return intituleInfos[0];
	else if (! this.alt.isEmpty()) return this.alt
	else return intituleInfos[0];
}
HTMLAreaElement.prototype.getIntitule = function(){
	const intituleInfos = Element.prototype.getIntitule.call (this);
	if ('aria-' === intituleInfos[1].substring (0,5)) return intituleInfos[0];
	else if (! this.alt.isEmpty()) return this.alt
	else return intituleInfos[0];
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
		else if (! this.textContent.isEmpty()) return "";
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
