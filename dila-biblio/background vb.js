var etape ="";

function chooseActionOverPage(){
	console.log (etape, document.getElementsByClassName ('fr-stepper__state')[0].innerText);
	const buttonNext = document.getElementById ('btn-next');
	etape = document.getElementsByClassName ('fr-stepper__state')[0].innerText;
	if (document.body.innerText.includes ('Étape 1 sur 11') || document.body.innerText.includes ('Étape 2 sur 11') || document.body.innerText.includes ('Étape 4 sur 11')){
		buttonNext.click();
		setTimeout (chooseActionOverPage, 1000);
	}
	/*

window.dispatchEvent (new Event ('KeyboardEvent', { code: 'Enter', key: 'Enter', keyCode: 13, type: 'keyup' }));

	else if (document.body.innerText.includes ('Étape 3 sur 11')){
		document.getElementById ('idSaisie22').value = 'hello';
		document.getElementById ('idSaisie23').value = 'deborah@gmail.com';
		document.getElementById ('idSaisie50').value = 'Noisette-416';
		buttonNext.click();
//		setTimeout (chooseActionOverPage, 1000);
	}*/
}
setTimeout (chooseActionOverPage, 1000);
// buttonNext.onClick = chooseActionOverPage;