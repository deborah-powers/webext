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
		if (inputId === labels[l].for) labelId =l;
	}
	if (labelId === -1) return null;
	else return labels[labelId];
}

function colorLabel (event){
	console.log ('colorLabel');
	var highlighted = document.getElementsByClassName ('rgaa-highlight');
	for (var h=0; h< highlighted.length; h++) highlighted.classList.remove ('rgaa-highlight');
	console.dir (event.target);
	event.target.labelTag.classList.add ('rgaa-highlight');
}
HTMLInputElement.prototype.verifyTitle = function(){
	var titleExists = false;
	if ([ 'submit', 'reset', 'button' ].includes (this.type) && this.id.isEmpty() &&! exists (this.value))
		titleExists = HTMLElement.prototype.verifyTitle.call (this);
	else if ([ 'submit', 'reset', 'button' ].includes (this.type) && exists (this.value)){
		this.infos = this.infos + 'value: '+ this.value +'<br/>';
		titleExists = true;
	}
	else if (this.id.isEmpty()) titleExists = HTMLElement.prototype.verifyTitle.call (this);
	else{
		var label = getByFor (this.id);
		console.log ('label o', this.id, label);
		if (label){
			console.log ('label a');
			this.infos = this.infos + 'label: '+ label.innerText +'<br/>';
			console.log ('label b');
			this.labelTag = label;
			console.log ('label c');
			this.addEventListener ('mouseover', colorLabel);
			console.log ('label d');
			titleExists = true;
		}
		else titleExists = HTMLElement.prototype.verifyTitle.call (this);
	}
	if (! titleExists){
		this.classList.add ('rgaa-error');
		this.infos = this.infos.replace ('rien: rien', 'pas de nom accessible');
}}
const inputs = document.getElementsByTagName ('input');
for (var l=0; l< inputs.length; l++) inputs[l].addAll();