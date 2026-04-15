// simuler la frappe d'un message dans un input
var inputMessage ="";
var imId =0;
HTMLInputElement.prototype.mimicTyping = function (message){
	this.value = message;
	this.dispatchEvent (new KeyboardEvent ('keydown',{ key: 'e', keyCode: 69, code: 'KeyE', which: 69 }));
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
		console.log (message, input);
		return input;
}}
HTMLInputElement.prototype.fillInput = function (message){
	const inputType = this.getAttribute ('type');
	// pour les text
	this.setAttribute ('value', message);
	this.value = message;
	var changeEvent = new Event ('change', { bubbles: true });
	this.dispatchEvent (changeEvent);
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
		}
		o+=1;
}}
function fillInputByLabel (labelText, message){
	var input = document.body.findNextInput (labelText);
	if (input === null || input === undefined) console.log ("pas d'input pour", labelText);
	else input.fillInput (message);
//	console.log ('fillInputByLabel', labelText, input.value, input.getAttribute ('value'));
}
function chooseActionOverPage(){
	const titrePage = document.getElementById ('titrePage');
	titrePage.removeAttribute ('role');
	titrePage.removeAttribute ('aria-live');


	const buttonNext = document.getElementById ('btn-next');
	if (document.body.innerText.includes ('Étape 1') && document.body.innerText.includes ('Avertissement')){
		buttonNext.click();
		setTimeout (chooseActionOverPage, 1500);
	}
	else if (document.body.innerText.includes ('Mes informations personnelles')){
		fillInputByLabel ('Situation matrimoniale', 'Célibatair');
		fillInputByLabel ('Profession', 'Direct');
		fillInputByLabel ('Indicatif', '+33 (FRANCE');
		fillInputByLabel ('Numéro de téléphone principal', '63298167');
		fillInputByLabel ('Adresse électronique', 'moi@gmail.co');
		fillInputByLabel ('Pays', 'FRANC');
		fillInputByLabel ('Numéro et libellé de voie', '1 rue du lapi');
		fillInputByLabel ('Code postal / Localité', 'ALLEVARD (38580');
	}
	else if (document.body.innerText.includes ('Description des faits')) fillInputByLabel ('Date', '2026-04-13');
	else if (document.body.innerText.includes ('Préjudice financier')){
		fillInputByLabel ('Date', '2026-04-13');
	}
}
setTimeout (chooseActionOverPage, 1500);
