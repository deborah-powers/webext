// simuler la frappe d'un message dans un input
var inputMessage ="";
var imId =0;
HTMLInputElement.prototype.mimicTyping = function (message){
	this.focus();
	this.value = message;
	this.click();
}
HTMLInputElement.prototype.mimicTyping_va = function (message){
	this.value = message;
	this.dispatchEvent (new KeyboardEvent ('keydown', { key: 'e', keyCode: 69, code: 'KeyE', which: 69 }));
}
HTMLElement.prototype.findByInnerText = function (message){
	if (this.innerText.includes (message)){
		var res = null;
		var c=0;
		while (c< this.children.length && res === null){
			res = this.children[c].findByInnerText (message);
			c+=1;
		}
		if (res === null) return this;
		else return res;
	}
	else return null;
}
HTMLElement.prototype.findNextInput = function (label){
	var textTag = this.findByInnerText (label);
	if (textTag === null) return null;
	while (! textTag.innerHTML.includes ('<input ')) textTag = textTag.parentElement;
	textTag = textTag.getElementsByTagName ('input')[0];
	return textTag;
}
function chooseActionOverPage(){
	const buttonNext = document.getElementById ('btn-next');
	if (document.body.innerText.includes ('Étape 1') && document.body.innerText.includes ('Avertissement')){
		buttonNext.click();
		setTimeout (chooseActionOverPage, 3000);
	}
	else if (document.body.innerText.includes ('Mes informations personnelles')){
		// identifier la nationnalité
		var nationnalite = document.body.findNextInput ('Nationalité');
		console.log ('a', nationnalite, nationnalite.constructor.name);
	}
}HTMLLabelElement
setTimeout (chooseActionOverPage, 3000);
