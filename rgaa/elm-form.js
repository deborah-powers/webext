HTMLElement.prototype.computeAccessibleName = function(){
	if (this.getAttribute ('hidden')) return "";
}


function removeHighlight(){
	var highlighted = document.getElementsByClassName ('rgaa-highlight');
	for (var h=0; h< highlighted.length; h++) highlighted.classList.remove ('rgaa-highlight');
	highlighted = document.getElementsByClassName ('rgaa-error');
	for (var h=0; h< highlighted.length; h++) highlighted.classList.remove ('rgaa-error');
}
function getByFor (inputId){
	const labels = document.getElementsByTagName ('label');
	var labelId =-1;
	for (var l=0; l< labels.length; l++){
		if (inputId === labels[l].getAttribute ('for')) labelId =l;
	}
	if (labelId === -1) return null;
	else return labels[labelId];
}
function colorLabel (event){
	var highlighted = document.getElementsByClassName ('rgaa-highlight');
	for (var h=0; h< highlighted.length; h++) highlighted[0].classList.remove ('rgaa-highlight');
	for (var l=0; l< event.target.labels.length; l++) event.target.labels[l].classList.add ('rgaa-highlight');
}
function bleachLabel(){
	var highlighted = document.getElementsByClassName ('rgaa-highlight');
	for (var h=0; h< highlighted.length; h++) highlighted[0].classList.remove ('rgaa-highlight');
}
HTMLInputElement.prototype.verifyTitle = function(){
	var intitule = this.getIntitule();
	if (intitule.includes ('plusieurs labels') || intitule.includes ('rien: ')) this.classList.add ('rgaa-error');
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
for (var l=0; l< fields.length; l++) fields[l].addAll();