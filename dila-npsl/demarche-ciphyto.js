function demarcheE1(){
	fillInputByLabel ('Non');
	setTimeout (function(){
		fillInputByLabel ('MVPP');
		setTimeout (function(){
			fillInputByLabel ('ou un titre');
			goNextPage();
	}, 500); }, 500);
}
function demarcheE2(){
	fillInputByLabel ('Code postal et commune', 'ROCHEFOURCHAT');
	fillInputByLabel ('Adresse e-mail', 'moi@gmail.com');
}
if (document.body.innerText.includes ('Étape 1 sur 4')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 4')) demarcheE2();
else if (document.body.innerText.includes ('Étape 4 sur 4')) getRecap ('ciphyto');
