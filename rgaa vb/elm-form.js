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
	return inputInfos;
}
HTMLSelectElement.prototype.computeInfos = function(){
	var inputInfos = this.type +'\n';
	// required
	var attribut = this.getAttribute ('required');
	if (attribut) inputInfos = inputInfos +' required';
	attribut = this.getAttribute ('aria-required');
	if (attribut) inputInfos = inputInfos +' aria-required';
	return inputInfos;
}
HTMLElement.prototype.addInfosRec = function(){
	this.infos = this.parentElement.infos;
	for (var child of this.children) child.addInfosRec();
	this.setAttribute ('infos', this.infos);
}
HTMLLabelElement.prototype.addInfos = function(){
	var label = this.getAttribute ('for');
	if (! label) this.infos = 'label sans input associé';
	else{
		const input = document.getElementById (label);
		this.infos = input.computeInfos();
		input.addEventListener ('mouseover', function (event){ event.target.labels[0].classList.add ('rgaa-highlight'); });
		input.addEventListener ('mouseout', function (event){ event.target.labels[0].classList.remove ('rgaa-highlight'); });
	}
	this.setAttribute ('infos', this.infos);
//	for (var child of this.children) child.addInfosRec();
}
var labels = document.getElementsByTagName ('label');
for (var label of labels) label.addInfos();

/*
HTMLFormElement
HTMLFieldSetElement
HTMLLabelElement
HTMLLegendElement
HTMLButtonElement
*/