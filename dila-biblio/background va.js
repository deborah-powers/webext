// simuler la frappe d'un message dans un input
var inputMessage ="";
var imId =0;
HTMLInputElement.prototype.mimicTypingRec = function (message){
	if (imId < inputMessage.lenght){
		this.value = this.value + inputMessage[imId];
		imId +=1;
		setTimeout (mimicTyping, 500);
}}
HTMLInputElement.prototype.mimicTyping_vb = function (message){
	inputMessage = message;
	imId =0;
	for (var letter of message) this.value = this.value + letter;
}
HTMLInputElement.prototype.mimicTyping_va = function (message){ for (var letter of message) this.value = this.value + letter; }
HTMLInputElement.prototype.mimicTyping = function (message){
	this.value = message;
	this.dispatchEvent (new KeyboardEvent ('keydown', { key: 'e', keyCode: 69, code: 'KeyE', which: 69 }));
}

var buttonNext = document.getElementById ('btn-next');
function chooseActionOverPage(){
	buttonNext = document.getElementById ('btn-next');
	console.log ('arrivée sur la page', buttonNext);
	if (document.body.innerText.includes ('Étape 1 sur 11') || document.body.innerText.includes ('Étape 2 sur 11') || document.body.innerText.includes ('Étape 4 sur 11')){
		buttonNext.click();
		setTimeout (chooseActionOverPage, 1000);
	}
	else if (document.body.innerText.includes ('Étape 3 sur 11')){
		document.getElementById ('idSaisie22').value = 'hello';
		document.getElementById ('idSaisie23').value = 'deborah@gmail.com';
		document.getElementById ('idSaisie50').value = 'Noisette-416';
/*		buttonNext.click();
		setTimeout (chooseActionOverPage, 1000);
*/
	}
}
setTimeout (chooseActionOverPage, 1000);
// buttonNext.onClick = chooseActionOverPage;
document.body.addEventListener ('change', function (event){ chooseActionOverPage(); });