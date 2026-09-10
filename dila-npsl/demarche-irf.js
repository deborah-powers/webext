function demarcheE1(){
	fillInputByLabel ('Commune de naissance', 'Séville');
	fillInputByField ('Qui est votre parent 2 ?', 'Madame');
}
function demarcheE2(){
	uncheckInputByLabel ("Je souhaite recevoir les courriers du consulat à une autre adresse");
}
function demarcheE4(){
	fillInputByLabel ('Oui');
	setTimeout (function(){
		fillInputByLabel ('moi@gmail.com');
		setTimeout (function(){
				fillInputByField ('Acceptez-vous de publier votre adresse électronique', 'Oui');
				goNextPage();
	}, 500); }, 500);
}
if (document.body.containsText ('Étape 1 sur 5')){
	if (document.body.containsText ('Bienvenue')) demarcheE1();
	else goNextPage();
}
else if (document.body.containsText ('Étape 2 sur 5')){
	if (document.body.containsText ("Votre adresse à l'étranger")) demarcheE2();
	else if (document.body.containsText ('Personnes à prévenir'))
		fillInputByField ('Comment pouvons-nous contacter cette deuxième', 'Adresse électronique', 'ami@gmail.com');
	else goNextPage();
}
else if (document.body.containsText ('Étape 3 sur 5')) goNextPage();
/*
else if (document.body.containsText ('Étape 4 sur 5')) demarcheE4();
*/
else if (document.body.innerText.includes ('Vérification et envoi')){
	getRecap ('irf');
}
