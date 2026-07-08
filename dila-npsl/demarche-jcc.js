function demarcheE1(){
	fillInputByLabel ('Je déménage');
	fillInputByLabel ('En France');
	fillInputByLabel ('Non');
	fillInputByLabel ("Date de début d'utilisation de votre nouvelle adresse", '2026-05-15');
}
function demarcheE2(){
	fillInputByLabel ('Monsieur');
	fillInputByLabel ('Numéro de téléphone', '0678910112');
}
function demarcheE3(){
	var adresses = document.body.findHomonymInputs ('Adresse');
	adresses[0].fillInput ('2 Rue de la Corniche 22000');
	adresses[1].fillInput ('11 Avenue Aristide Briand 35000');
}
function demarcheE5(){
	getRecap ('jcc');
	document.body.clickButtonByText ('Envoyer votre demande');
}
// pages de npsl
if (document.body.innerText.includes ('Étape 1 sur 5')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 5')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur 5')) demarcheE3();
else if (document.body.innerText.includes ('Étape 5 sur 5')) getRecap ('jcc');