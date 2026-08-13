const autoCompletionValues =[ 'name', 'given-name', 'additional-name', 'family-name',
	'honorific-prefix', 'honorific-suffix', 'nickname', 'username',
	'new-password', 'current-password', 'organization', 'organization-title',
	'street-address', 'address-line1', 'address-line2', 'address-line3', 'address-level4', 'address-level3', 'address-level2', 'address-level1',
	'country', 'country-name', 'postal-code',
	'cc-name', 'cc-given-name', 'cc-additional-name', 'cc-family-name', 'cc-number', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-csc', 'cc-type',
	'transaction-currency', 'transaction-amount', 'language',
	'bday', 'bday-day', 'bday-month', 'bday-year', 'sex', 'url', 'photo',
	'tel', 'tel-country-code', 'tel-national', 'tel-area-code', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-extension',
	'email', 'impp', 'off'
];
const inputControles =[ 'number', 'email', 'password', 'tel', 'url', 'color', 'date', 'time', 'datetime-local', 'datetime', 'month', 'week' ];
HTMLLabelElement.prototype.addInfosOnHover = function(){ return true; }

HTMLInputElement.prototype.computeInfos = function(){
	var inputInfos = this.type;
	// valeur controllée
	if (inputControles.includes (this.type)) inputInfos = inputInfos +' valeur contrôlée';
	inputInfos = inputInfos +'\n';
	// required
	var attribut = this.getAttribute ('required');
	if (attribut) inputInfos = inputInfos +' required';
	attribut = this.getAttribute ('aria-required');
	if (attribut) inputInfos = inputInfos +' aria-required';
	// auto-complete
	inputInfos = inputInfos +'\n';
	attribut = this.getAttribute ('autocomplete');
	if (attribut){
		inputInfos = inputInfos +' autocomplete';
		if (! autoCompletionValues.includes (attribut)) inputInfos = inputInfos +' invalide';
		inputInfos = inputInfos +': '+ attribut;
	}
	attribut = this.getAttribute ('aria-autocomplete');
	if (attribut) inputInfos = inputInfos +' aria-autocomplete: '+ attribut;
	inputInfos = inputInfos.replaceAll ('\n ','\n');
	return inputInfos.strip();
}
HTMLSelectElement.prototype.computeInfos = function(){
	var inputInfos ="";
	// required
	var attribut = this.getAttribute ('required');
	if (attribut) inputInfos = 'required';
	attribut = this.getAttribute ('aria-required');
	if (attribut) inputInfos = inputInfos +' aria-required';
	return inputInfos.strip();
}
HTMLTextAreaElement.prototype.computeInfos = function (message){
	var inputInfos ="";
	// required
	var attribut = this.getAttribute ('required');
	if (attribut) inputInfos = 'required';
	attribut = this.getAttribute ('aria-required');
	if (attribut) inputInfos = inputInfos +' aria-required';
	// auto-complete
	inputInfos = inputInfos +'\n';
	attribut = this.getAttribute ('autocomplete');
	if (attribut){
		inputInfos = inputInfos +' autocomplete';
		if (! autoCompletionValues.includes (attribut)) inputInfos = inputInfos +' invalide';
		inputInfos = inputInfos +': '+ attribut;
	}
	attribut = this.getAttribute ('aria-autocomplete');
	if (attribut) inputInfos = inputInfos +' aria-autocomplete: '+ attribut;
	inputInfos = inputInfos.replaceAll ('\n ','\n');
	return inputInfos.strip();
}
HTMLElement.prototype.addInfosRec = function(){
	this.infos = this.parentElement.infos;
	for (var child of this.children) child.addInfosRec();
	this.setAttribute ('infos', this.infos);
}
HTMLLabelElement.prototype.addInfosOnHover = function(){ return true; }
HTMLLabelElement.prototype.addInfos = function(){
	var label = this.getAttribute ('for');
	if (! label) this.infos = 'label sans input associé';
	else{
		const input = document.getElementById (label);
		if (input.tagName === 'INPUT') this.infos = 'input ';
		else if (input.tagName === 'SELECT') this.infos = 'select\n';
		else this.infos = input.tagName.toLowerCase() +'\n';
		this.infos = this.infos + input.computeInfos();
/*		input.addEventListener ('mouseover', function (event){ event.target.labels[0].classList.add ('rgaa-highlight'); });
		input.addEventListener ('mouseout', function (event){ event.target.labels[0].classList.remove ('rgaa-highlight'); });
*/
	}
	infos = infos + this.infos;
	this.setAttribute ('infos', this.infos);
//	for (var child of this.children) child.addInfosRec();
}
HTMLButtonElement.prototype.addInfosOnHover = function(){
	const formulaire = this.getAttribute ('form');
	if (formulaire === undefined || formulaire === null) return false;
	else return true;
}
HTMLButtonElement.prototype.addInfos = function(){
	const formulaire = this.getAttribute ('form');
	if (formulaire === undefined || formulaire === null) return;
	this.infos = 'formulaire '+ formulaire +'\n';
	if (this.type === undefined || this.type === null) this.infos = this.infos + 'type manquant. devrait être submit';
	if (this.type === 'submit') this.infos = this.infos + 'type OK';
	else this.infos = this.infos + 'type innadapté '+ this.type +'. devrait être submit';
	infos = infos + this.infos;
	this.setAttribute ('infos', this.infos);
}
infos = infos +'\n\n== Les inputs et selects\n\n';
var interractives = document.getElementsByTagName ('label');
interractives.setNbItemMax ('inputs et select');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();

infos = infos +'\n\n== Les boutons associés aux formulaires\n\n';
interractives = document.getElementsByTagName ('button');
interractives.setNbItemMax ('boutons associés aux formulaires');
for (var i=0; i< nbItemMax; i++) interractives[i].addInfos();

downloadAnalyse ('formulaires');

/*
HTMLFormElement
HTMLFieldSetElement
HTMLLabelElement
HTMLLegendElement
HTMLButtonElement
*/