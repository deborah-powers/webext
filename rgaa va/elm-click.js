HTMLInputElement.prototype.addInfos = function(){
	if ( this.type === 'hidden') return 'rien: invisible';
	else if (! [ 'button', 'reset', 'submit' ].includes (this.type)) return 'rien: mauvais type';
	var intitule = this.compareNames();
	if (intitule.includes ('plusieurs labels') || intitule.includes ('rien: ') || intitule.includes ('ne reprend pas')) this.classList.add ('rgaa-error');
	if (this.labels.length >0){
		this.addEventListener ('mouseover', colorLabel);
		this.addEventListener ('mouseleave', bleachLabel);
	}
	intitule = intitule.replace ('rien: rien', 'pas de nom accessible');
	this.infos = this.infos +'<br/>'+ intitule;
	this.setAttribute ('infos', this.infos.replaceAll ('<br/>', '\n'));
	if (this.infos.includes ('erreur:') || this.infos.includes ('pas de nom accessible')) this.classList.add ('rgaa-error');
}
links = document.getElementsByTagName ('button');
for (var i=0; i< links.length; i++) links[i].addInfos();
links = document.body.getAllByRole ('button');
for (var i=0; i< links.length; i++) links[i].addInfos();
inks = document.getElementsByTagName ('input');
for (var i=0; i< links.length; i++) links[i].addInfos();
inks = document.getElementsByClassName ('rgaa-event');
for (var i=0; i< links.length; i++) links[i].addInfos();

// document.body.addInfos();