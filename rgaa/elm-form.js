function removeHighlight(){
	var highlighted = document.getElementsByClassName ('rgaa-highlight');
	for (var h=0; h< highlighted.length; h++) highlighted.classList.remove ('rgaa-highlight');
	highlighted = document.getElementsByClassName ('rgaa-error');
	for (var h=0; h< highlighted.length; h++) highlighted.classList.remove ('rgaa-error');
}
function bleachLabel(){
	var highlighted = document.getElementsByClassName ('rgaa-highlight');
	for (var h=0; h< highlighted.length; h++) highlighted[0].classList.remove ('rgaa-highlight');
}
function colorLabel (event){
	bleachLabel();
	for (var l=0; l< event.target.labels.length; l++) event.target.labels[l].classList.add ('rgaa-highlight');
}
HTMLInputElement.prototype.verifyTitle = function(){
	var intitule = this.compareNames();
	if (intitule.includes ('plusieurs labels') || intitule.includes ('rien: ') || intitule.includes ('ne reprend pas')) this.classList.add ('rgaa-error');
	if (this.labels.length >0){
		this.addEventListener ('mouseover', colorLabel);
		this.addEventListener ('mouseleave', bleachLabel);
	}
	intitule = intitule.replace ('rien: rien', 'pas de nom accessible');
	this.infos = this.infos +'<br/>'+ intitule;
}
HTMLInputElement.prototype.verifyTitle = function(){
	var intitule = this.compareNames();
	if (intitule.includes ('plusieurs labels') || intitule.includes ('rien: ') || intitule.includes ('ne reprend pas')) this.classList.add ('rgaa-error');
	if (this.labels.length >0){
		this.addEventListener ('mouseover', colorLabel);
		this.addEventListener ('mouseleave', bleachLabel);
	}
	intitule = intitule.replace ('rien: rien', 'pas de nom accessible');
	this.infos = this.infos +'<br/>'+ intitule;
}
var fields = document.getElementsByTagName ('input');
for (var l=0; l< fields.length; l++) fields[l].addAll();
fields = document.getElementsByTagName ('textarea');
console.log (fields);
console.log (fields[0].constructor.name);
for (var l=0; l< fields.length; l++) fields[l].addAll();