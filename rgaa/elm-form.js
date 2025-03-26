console.log ('a');
function removeHighlight(){
	var highlighted = document.getElementsByClassName ('rgaa-highlight');
	for (var h=0; h< highlighted.length; h++) highlighted.classList.remove ('rgaa-highlight');
	highlighted = document.getElementsByClassName ('rgaa-error');
	for (var h=0; h< highlighted.length; h++) highlighted.classList.remove ('rgaa-error');
}
console.log ('b');
HTMLInputElement.prototype.verifyTitle = function(){
	var titleExists = false;
	if (this.id.isEmpty()) titleExists = HTMLElement.prototype.verifyTitle.call (this);
	else{
		var label = getByFor (this.id);
		if (label){
			this.infos = this.infos + 'label: '+ label.innerText +'<br/>';
			titleExists = true;
		}
		else titleExists = HTMLElement.prototype.verifyTitle.call (this);
	}
	if (! titleExists) this.classList.add ('rgaa-error');
}
console.log ('c');
const inputs = document.getElementsByTagName ('input');
console.log (inputs[0]);
for (var l=0; l< inputs.length; l++) inputs[l].addAll();