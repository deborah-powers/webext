// simuler la frappe d'un message dans un input
var inputMessage ="";
var imId =0;
HTMLInputElement.prototype.mimicTyping = function (message){
	this.focus();
	this.value = message;
	this.click();
}
HTMLInputElement.prototype.mimicTypingRec_vc = function (message){
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
HTMLInputElement.prototype.mimicTyping_vc = function (message){
	this.value = message;
	this.dispatchEvent (new KeyboardEvent ('keydown', { key: 'e', keyCode: 69, code: 'KeyE', which: 69 }));
//	this.dispatchEvent (new KeyboardEvent ('keydown', { charCode: 109, code: 'Semicolon', keyCode: 109, key: 'm', type: 'keypress', which: 109, composed: true, returnValue: true, bubbles: true, isTrusted: true }));
}

HTMLElement.prototype.enter = function(){
	var keyboardEvent = new KeyboardEvent ('keydown', { code: 'Enter', key: 'Enter', charKode: 13, keyCode: 13, view: window });
	this.dispatchEvent (keyboardEvent);
}
function simulateMouseClick (targetNode){
	// https://stackoverflow.com/questions/24025165/simulating-a-mousedown-click-mouseup-sequence-in-tampermonkey
	function triggerMouseEvent (targetNode, eventType){
		var clickEvent = document.createEvent ('MouseEvents');
		clickEvent.initEvent (eventType, true, true);
		targetNode.dispatchEvent (clickEvent);
	}
	['mouseover', 'mousedown', 'mouseup', 'click'].forEach (function (eventType){ triggerMouseEvent (targetNode, eventType); });
}
function writeMessage (input, message){
	setTimeout (function(){
	console.log (message);
	input.value = input.value + message[0];
	input.setAttribute ('value', input.getAttribute ('value') + message[0]);
	simulateMouseClick (this);
	if (message.length >1) writeMessage (input, message.substring (1));
}, 500);
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