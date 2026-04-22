function connectA(){
	const main = document.getElementsByTagName ('main')[0];
	const buttonFranceConnect = main.getElementsByTagName ('a')[2];
	buttonFranceConnect.click();
}
function connectB(){
	var form = null;
	if (window.location.href.includes ('/consent')) form = document.getElementsByTagName ('form')[0];	// page de re-connexion
	else form = document.getElementsByTagName ('form')[2];	// page de connexion
	const buttonFranceConnect = form.getElementsByTagName ('button')[0];
	buttonFranceConnect.click();
	setTimeout (function (event){ log (buttonFranceConnect); }, 3000);
}
function connectC(){
	// les données sont déjà pré-entrées
	const main = document.getElementsByTagName ('form')[0];
	const buttonFranceConnect = main.getElementsByTagName ('button')[0];
	buttonFranceConnect.click();
	setTimeout (chooseActionOverPage, 3000);
}
function connectD(){
	// les fonctions sont imbriqués afin que connectD y est acces

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
	if (typeInput === 'date') console.log ('date');
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
	if (document.body.innerText.includes ('Mes informations personnelles')){
		log ('dada');
		fillInputByLabel ('Nationalité', 'Fra');
		fillInputByLabel ('Situation matrimoniale', 'Célibatai');
		fillInputByLabel ('Profession', 'ADJUDA');
		fillInputByLabel ('Indicatif', '+33 (FRA');
		fillInputByLabel ('Numéro de téléphone principal', '63298167');
	//	fillInputByLabel ('Adresse électronique', 'moi@gmail.com');
		fillInputByLabel ('Pays', 'FRAN');
		fillInputByLabel ('Numéro et libellé de voie', '1 rue du lapi');
		fillInputByLabel ('Code postal / Localité', 'ALLEV');
	}
	else if (document.body.innerText.includes ('Description des faits')) fillInputByLabel ('Date de ', '2026-04-13');
	else if (document.body.innerText.includes ('Préjudice financier')) fillInputByLabel ('Date', '2026-04-13');
}
chrome.action.onClicked.addListener (function (tab){
	if (tab.url.includes ('/service-public/protocol/openid-connect/')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			function: connectA
	});}
	else if (tab.url.includes ('franceconnect.fr/api/v2/interaction/')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			function: connectB
	});}
	else if (tab.url.includes ('fournisseur-d-identite.fr/interaction/')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			function: connectC
	});}
	else if (tab.url.includes ('/mademarche/demarcheGenerique/?codeDemarche=arnaqueInternet')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: true },
			function: connectD
	});}
});
