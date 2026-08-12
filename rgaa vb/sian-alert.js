var alertes = document.getElementsByClassName ('fr-alert');
var inputs = document.getElementsByTagName ('input');

HTMLElement.prototype.isAlert = function(){
	if (this.className.includes ('fr-alert')) return true;
	else if (this.tagName === 'BODY' || this.tagName === 'MAIN' || this.className.includes ('main')) return false;
	return this.parentElement.isAlert();
}
HTMLElement.prototype.findAlertId = function(){
	if (this.id !== null && this.id !== undefined && this.id !=="") return this.id;
	var i=0;
	if (this.children[0].className.includes ('sr-only')) i=1;
	while (i< this.children.length && [null, undefined, ""].includes (this.children[i].id)) i+=1;
	if (i< this.children.length) return this.children[i].id;
	else return null;
}
HTMLInputElement.prototype.findInputStartingAlert = function (alertId){
	const description = this.getAttribute ('aria-describedby');
	if (description === null || description === undefined || description ==="") return false;
	else if (description.includes (alertId)) return true;
	else return false;
}
HTMLElement.prototype.findInputStartingAlert = function(){
	const alertId = this.findAlertId();
//	if (alertId === null) this.classList.add ('rgaa-error');
	if (alertId === null) return;
	else{
		var i=0;
		while (i< inputs.length &&! inputs[i].findInputStartingAlert (alertId)) i+=1;
		if (i< inputs.length){
			console.log (i, alertId);
//			inputs[i].classList.add ('rgaa-highlight');
			this.classList.add ('rgaa-highlight');
}}}
for (var alert of alertes) alert.findInputStartingAlert();
