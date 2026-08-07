const alertes = document.getElementsByClassName ('fr-alert');
const inputs = document.getElementsByTagName ('input');

HTMLElement.prototype.isAlert = function(){
	if (this.className.includes ('fr-alert')) return true;
	else if (this.tagName === 'BODY' || this.tagName === 'MAIN' || this.className.includes ('main')) return false;
	return this.parentElement.isAlert();
}
HTMLElement.prototype.findAlertId = function(){
	if (this.id !== null && this.id !== undefined) return this.id;
	var id=0;
	if (this.children[0].className.includes ('sr-only')) id=1;
	return this.children[id].id;
}
HTMLInputElement.prototype.findInputStartingAlert = function (alertId){
	const description = this.getAttribute ('aria-describedby');
	if (description === null || description === undefined) return false;
	else if (description.includes (alertId)) return true;
}
HTMLElement.prototype.findInputStartingAlert = function(){
	const alertId = this.findAlertId();
	var i=0;
	while (i< inputs.length &&! inputs[i].findInputStartingAlert (alertId)) i+=1;
	if (i< inputs.length) inputs[i].classList.add ('rgaa-highlight');
}
for (var alert of alertes) alert.findInputStartingAlert();
