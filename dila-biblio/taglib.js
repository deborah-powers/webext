function getRadioButtons(){
	const inputs = document.getElementsByTagName ('input');
	var radioButtons ={};
	for (var input of inputs) if (input.type === 'radio'){
		var knownName = false;
	//	for (var [key, value] of Object.entries (radioButtons)) if (key === input.name) knownName = true;

		if (radioButtons.hasOwnProperty (input.name)) radioButtons [input.name].push (input);
		else radioButtons [input.name] =[ input ];
	}
	return radioButtons;
}
HTMLElement.prototype.findByInnerText = function (message){
	if (this.innerText.includes (message)){
		var tagRes = null;
		var c=0;
		while (c< this.children.length && tagRes === null){
			tagRes = this.children[c].findByInnerText (message);
			c+=1;
		}
		if (tagRes === null) return this;
		else return tagRes;
	}
	else return null;
}
// trouver les inputs
HTMLElement.prototype.findLabelByInnerText = function (message){
	if (! this.innerText.includes (message)) return null;
	else if (this.tagName === 'LABEL') return this;
	else{
		var label = null;
		var c=0;
		const labels = this.getElementsByTagName ('label');
		while (c< labels.length && label === null){
			if (labels[c].innerText.includes (message)) label = labels[c];
			c+=1;
		}
		c=0;
		while (c< this.children.length && label === null){
			label = this.children[c].findLabelByInnerText (message);
			c+=1;
		}
		if (label === null) return this;
		else return label;
}}
HTMLElement.prototype.findNextInput = function (message){
	const label = this.findLabelByInnerText (message);
	if (label === null) return null;
	else{
		const inputId = label.getAttribute ('for');
		var input = null;
		if (inputId === undefined || inputId === null){
			input = label.parentElement.parentElement.getElementsByTagName ('input')[0];
			if (input === null || input === undefined) input = label.parentElement.parentElement.getElementsByTagName ('select')[0];
			if (input === null || input === undefined) input = label.parentElement.parentElement.getElementsByTagName ('textarea')[0];
		}
		else input = document.getElementById (inputId);
		return input;
}}
HTMLInputElement.prototype.fillInput = function (message){
	const typeInput = this.getAttribute ('type');
	log (message, typeInput);
	if (typeInput === 'date') log ('date');
	this.setAttribute ('value', message);
	this.value = message;
	var changeEvent = new Event ('change', { bubbles: true });
	this.dispatchEvent (changeEvent);
}
HTMLSelectElement.prototype.fillInput = function (message){
//	this.focus();
	const options = this.getElementsByTagName ('option');
	var o=0;
	while (o< options.length){
		if (options[o].innerText.includes (message)){
			options[o].selected = true;
			this.selectedIndex = options[o].index;
			this.value = options[o].value;
			o= options.length;
		}
		o+=1;
}}
function fillInputByLabel (labelText, message){
	var input = document.body.findNextInput (labelText);
	if (input === null || input === undefined) log ("pas d'input pour", labelText);
	else input.fillInput (message);
}
