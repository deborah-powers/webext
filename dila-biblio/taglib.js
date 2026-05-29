const labelDict ={
	'Nationalité': 'Francaise', 'Situation matrimoniale': 'Célibataire', 'Pays': 'FRANCE',
	"Numéro d'AIOT": '0040987214', 'Numéro de SIRET': '41816609600069',
	'Nom de la personne en charge du dossier': 'Corado',
	'Prénom de la personne en charge du dossier': 'Céline',
	'Code postal / Localité': '35000',
	'Numéro et libellé de voie': '5 rue Jules Rieffel',
	'Téléphone': '0623456789',
	'Adresse e-mail': 'moi@gmail.com', 'Adresse électronique': 'toi@gmail.com',
	'ate de naissance': '2002-06-17',
	'om de votre projet': 'test rgaa sian',
	'Date de dépôt': '2025-06-15',
	"Organisme en charge de l'instruction": 'tma sian'
};
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
HTMLElement.prototype.findNextInput = function (labelText){
	const label = this.findLabelByInnerText (labelText);
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
HTMLSelectElement.prototype.fillFromDict = function (label){
	if (labelDict.hasOwnProperty (label)) this.fillInput (labelDict[label].substring (0, labelDict[label].length -1));
	else for (var [key, value] of Object.entries (labelDict)){
		if (label.includes (key)) this.fillInput (labelDict[label].substring (0, labelDict[label].length -1));
}}
HTMLInputElement.prototype.fillFromDict = function(){
	const label = this.labels[0].children[0].innerText;
	if (labelDict.hasOwnProperty (label)){
		if (this.type === 'date') this.value = labelDict[label];
		else if (this.type === 'text') this.value = labelDict[label].substring (0, labelDict[label].length -1);
	}
	else{ for (var [key, value] of Object.entries (labelDict)) if (label.includes (key)){
		if (this.type === 'date') this.value = labelDict[key];
		else if (this.type === 'text') this.value = labelDict[key].substring (0, labelDict[key].length -1);
}}}
function fillInputByLabel (labelText, message){
	var input = document.body.findNextInput (labelText);
	if (input === null || input === undefined) log ("pas d'input pour", labelText);
	else input.fillInput (message);
}
