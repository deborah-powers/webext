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
HTMLElement.prototype.findInputByLabel = function (labelText){
	if (! document.body.innerText.includes (labelText)) return null;
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
		if (inputs[i].labels !== null && inputs[i].labels.length >0 && inputs[i].labels[0].innerText.includes (labelText)){
			i=i-1;
			unknow = false;
	} i+=1; }
	if (! unknow) return inputs[i];
	else if (this.innerText.count (labelText) ===1){
		// dernier recours
		var element = this.findByInnerText (labelText);
		element = element.parentElement;
		while (! element.innerHTML.includes ('<input ') && element.tagName !== 'BODY') element = element.parentElement;
		element = element.getElementsByTagName ('input')[0];
		return element;
	}
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
	if (inputsHomonym.length ===0 && this.innerText.count (labelText) >1){
		var labels = this.findListByInnerText (labelText);
		for (var l=0; l< labels.length; l++){
			labels[l] = labels[l].parentElement;
			while (! labels[l].innerHTML.includes ('<input ') && labels[l].tagName !== 'BODY') labels[l] = labels[l].parentElement;
			inputsHomonym.push (labels[l].getElementsByTagName ('input')[0]);
	}}
	return inputsHomonym;
}
HTMLInputElement.prototype.clickOn = function(){
	var event = new MouseEvent ('click', { bubbles: true, cancelable: true, view: window });
	this.dispatchEvent (event);
	if (this.type === 'radio' || this.type === 'checkbox') this.checked = 'true';
}
HTMLInputElement.prototype.fillInput = function (message){
	if (this.type === 'date') this.value = message;	// message = 2002-06-17
	else if (this.type === 'search' || this.type === 'number') this.value = message;
	else if (this.type === 'text'){
		if (this.role === 'combobox' && false){
			log ('combobox', this.labels[0].innerText, this.getAttribute ('aria-controls'));
			this.clickOn();
			const input = this;
			setTimeout (function(){
				const dataList = document.getElementById (input.getAttribute ('aria-controls'));
				log (dataList);
			}, 1000);
		//	this.value = message;
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
HTMLButtonElement.prototype.clickOn = function(){
	var event = new MouseEvent ('click', { bubbles: true, cancelable: true, view: window });
	this.dispatchEvent (event);
	event = new MouseEvent ('mousedown', { bubbles: true, cancelable: true, view: window });
	this.dispatchEvent (event);
	event = new MouseEvent ('mouseup', { bubbles: true, cancelable: true, view: window });
	this.dispatchEvent (event);
}
HTMLElement.prototype.clickButtonByText = function (labelText){
	if (! this.innerText.includes (labelText)) return;
	var button = this.findByInnerText (labelText);
	button = button.findContainer ('BUTTON');
	if (button.tagName === 'BUTTON') button.click();
}
function clickButtonByText (labelText){ document.body.clickButtonByText (labelText); }
HTMLElement.prototype.fillInputByLabel = function (labelText, inputValue){
	if (! this.innerText.includes (labelText)) return;
	const input = this.findInputByLabel (labelText);
	if (input === null || input === undefined) log ("pas d'input pour", labelText);
	else input.fillInput (inputValue);
}
function fillInputByLabel (labelText, inputValue){ document.body.fillInputByLabel (labelText, inputValue); }
HTMLElement.prototype.addBlurListener = function (labelText, inputValue, functionAtBlur){
	if (! this.innerText.includes (labelText)) return;
	const input = this.findInputByLabel (labelText);
	input.fillInput (inputValue);
	input.addEventListener ('blur', functionAtBlur);
}
HTMLElement.prototype.addClickListener = function (labelText, functionAtClick){
	if (! this.innerText.includes (labelText)) return;
	var button = this.findByInnerText (labelText);
	button = button.findContainer ('BUTTON');
	if (button.tagName === 'BUTTON') button.addEventListener ('click', functionAtClick);
}
HTMLElement.prototype.fillInputByField = function (fieldLegend, labelText, inputValue){
	var block = document.body.findByInnerText (fieldLegend);
	block = block.findContainer ('fieldset');
	block.fillInputByLabel (labelText, inputValue);
}
function fillInputWhenItAppears (labelText, inputValue){
	function resolveFunc (resolve){
		var observer = new MutationObserver (function (mutations){
			var n=0;
			const nbNodes = mutations[0].addedNodes.length;
			while (n< nbNodes && ! mutations[0].addedNodes[n].innerText.includes (labelText)) n+=1;
			if (n< nbNodes){
				observer.disconnect();
				const input = document.body.findInputByLabel (labelText);
				input.fillInput (inputValue);
		}});
		observer.observe (document.body, { childList: true, subtree: true });
		const element = document.body.findByInnerText (innerText);
		return resolve (element);
	}
	return new Promise (resolveFunc);
}
function fillInputWhenContainerAppears (labelText, containerTitle, containerTag, message){
	function resolveFunc (resolve){
		var observer = new MutationObserver (function (mutations){
			var n=0;
			const nbNodes = mutations[0].addedNodes.length;
			while (n< nbNodes && ! mutations[0].addedNodes[n].innerText.includes (labelText)) n+=1;
			if (n< nbNodes){
				observer.disconnect();
				var container = document.body.findByInnerText (containerTitle);
				container = container.findContainer (containerTag);
				container.fillInputByLabel (labelText, message);
		}});
		observer.observe (document.body, { childList: true, subtree: true });
		const element = document.body.findByInnerText (innerText);
		return resolve (element);
	}
	return new Promise (resolveFunc);
}
