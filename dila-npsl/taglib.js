const labelDict ={
	'Nationalité': 'Francaise', 'Situation matrimoniale': 'Célibataire', 'Pays': 'FRANCE',
	"Numéro d'AIOT": '0040987214', 'Numéro de SIRET': '41816609600069', 'SIRET bis': '13000918600011',
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
function goNextPage(){
	const buttonNext = document.getElementById ('btn-next');
	buttonNext.click();
}
function validate(){
	const buttonValider = document.body.findByInnerText ('Valider');
	buttonValider.addEventListener ('click', function (event){});
}
function wait (dixiemeDeSeconde){
	// convertir en milliseconde
	dixiemeDeSeconde *=100;
	const dateFin = Date.now() + dixiemeDeSeconde;
	while (Date.now() < dateFin) continue;
}
function getRadioButtonsAndCheckboxes(){
	const inputs = document.getElementsByTagName ('input');
	var toCheck =[];
	for (var ip of inputs){
		if (ip.type === 'radio' || ip.type === 'checkbox') toCheck.push (ip);
	}
	return toCheck;
}
function getFileUploader(){
	const inputs = document.getElementsByTagName ('input');
	var uploaders =[];
	for (var ip of inputs){
		if (ip.type === 'file') uploaders.push (ip);
	}
	return uploaders;
}
HTMLInputElement.prototype.openFileUploader = function(){
	if (this.type === 'file'){
		log ('téléversez un fichier pour', this.labels[0].parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].innerText);
		this.click();
}}
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
	var inputs = this.getElementsByTagName ('input');
	var i=0;
	var unknow = true;
	while (i< inputs.length && unknow){
		if (inputs[i].labels !== null && inputs[i].labels.length >0 && inputs[i].labels[0].innerText.includes (labelText)){
			i-=1;
			unknow = false;
	} i+=1; }
	if (! unknow) return inputs[i];
	inputs = this.getElementsByTagName ('select');
	i=0;
	unknow = true;
	while (i< inputs.length && unknow){
		if (inputs[i].labels[0].innerText.includes (labelText)){
			i=i-1;
			unknow = false;
	} i+=1; }
	if (! unknow) return inputs[i];
	else return null;
}
HTMLElement.prototype.findHomonymInputs = function (labelText){
	var inputs = document.getElementsByTagName ('input');
	var inputsHomonym =[];
	for (var i=0; i< inputs.length; i++){
		if (inputs[i].labels !== null && inputs[i].labels.length >0 && inputs[i].labels[0].innerText.includes (labelText))
			inputsHomonym.push (inputs[i]);
	}
	inputs = document.getElementsByTagName ('select');
	for (var i=0; i< inputs.length; i++){
		if (inputs[i].labels !== null && inputs[i].labels.length >0 && inputs[i].labels[0].innerText.includes (labelText))
			inputsHomonym.push (inputs[i]);
	}
	return inputsHomonym;
}
HTMLInputElement.prototype.clickOn = function(){
	var event = new MouseEvent ('click', { bubbles: true, cancelable: true, view: window });
	this.dispatchEvent (event);
	if (this.type === 'radio' || this.type === 'checkbox') this.checked = 'true';
}
HTMLInputElement.prototype.fillInput = function (message){
	if (this.type === 'date') this.value = message;	// message = 2002-06-17
	else if (this.type === 'search') this.value = message;
	else if (this.type === 'text'){
		if (this.role === 'combobox' && false){
			log ('combobox', this.labels[0].innerText, this.getAttribute ('aria-controls'));
			this.clickOn();
			const input = this;
			setTimeout (function(){
				const dataList = document.getElementById (input.getAttribute ('aria-controls'));
				log (dataList);
			}, 1000);
			this.value = message;
		}
		this.value = message;
	}
	this.clickOn();
}
HTMLSelectElement.prototype.clickOn = function(){
	var event = new MouseEvent ('click', { bubbles: true, cancelable: true, view: window });
	this.dispatchEvent (event);
}
HTMLSelectElement.prototype.fillInput = function (message){
	const options = this.getElementsByTagName ('option');
	var o=0;
	while (o< options.length){
		if (options[o].innerText.includes (message)){
			options[o].selected = true;
			this.selectedIndex = options[o].index;
			this.value = options[o].value;
			o= options.length;
		} o+=1; }
	this.dispatchEvent (new Event ('change'));
}
HTMLSelectElement.prototype.fillFromDict = function (label){
	if (labelDict.hasOwnProperty (label)) this.fillInput (labelDict[label].substring (0, labelDict[label].length -1));
	else for (var [key, value] of Object.entries (labelDict)){
		if (label.includes (key)) this.fillInput (labelDict[label].substring (0, labelDict[label].length -1));
}}
HTMLInputElement.prototype.fillFromDict = function(){
	if (this.value) return;
	const label = this.labels[0].children[0].innerText;
	if (labelDict.hasOwnProperty (label)){
		if (this.type === 'date') this.value = labelDict[label];
		else if (this.type === 'text') this.value = labelDict[label].substring (0, labelDict[label].length -1);
	}
	else{ for (var [key, value] of Object.entries (labelDict)) if (label.includes (key)){
		if (this.type === 'date') this.value = value;
		else if (this.type === 'text') this.value = value.substring (0, value.length -1);
	}
	this.clickOn();
}}
function clickButtonByText (labelText){
	var button = document.body.findByInnerText (labelText);
	button.click();
}
HTMLElement.prototype.fillInputByLabel = function (labelText, message){
	if (! this.innerText.includes (labelText)) return;
	const input = this.findNextInput (labelText);
	if (input === null || input === undefined) log ("pas d'input pour", labelText);
	else input.fillInput (message);
}
function fillInputByLabel (labelText, message){
	var input = document.body.findNextInput (labelText);
	if (input === null || input === undefined) log ("pas d'input pour", labelText);
	else input.fillInput (message);
}
HTMLElement.prototype.findContainer = function (containerTag){
	containerTag = containerTag.toUpperCase();
	if (this.tagName === containerTag) return this;
	else return this.parentElement.findContainer (containerTag);
}
HTMLElement.prototype.findBody = function(){ return this.findContainer ('body'); }
/*
document.body.addEventListener ('change', function (event){ setTimeout (function(){
	if (document.body.includes ('Commune de mariage')) log ('mariage');
}, 500); });
*/