function demarcheE1(){
	fillInputByLabel ('Non');
	goNextPage();
}
function demarcheE2parents(){
	fillInputByLabel ('Prénom usuel', 'Angela');
	fillInputByField ('Avez-vous une autre nationalité ?', 'Non');
	// les parents
	var personne = document.body.findByInnerText ('Qui est votre parent 1 ?').parentElement;
	personne = personne.findContainer ('fieldset');
	personne.fillInputByLabel ('Monsieur');
	personne.fillInputByLabel ('Nom', 'Guéridon');
	personne.fillInputByLabel ('Prénom', 'Robert');
	personne.fillInputByLabel ('Pays de naissance', 'allemagne');
	personne.fillInputByLabel ('Nationalité', 'française');
	personne = document.body.findByInnerText ('Qui est votre parent 2 ?').parentElement;
	personne = personne.findContainer ('fieldset');
	personne.fillInputByLabel ('Madame');
	personne.fillInputByLabel ('Nom', 'Bernard');
	personne.fillInputByLabel ('Prénom', 'Andrésine');
	personne.fillInputByLabel ('Pays de naissance', 'france');
	personne.fillInputByLabel ('Nationalité', 'allemande');
}
function demarcheE2foyer(){
	fillInputByLabel ('Célibataire');
	fillInputByField ('Voulez-vous ajouter un ou des enfants', 'Non');
	fillInputByField ('Souhaitez-vous rattacher votre inscription', 'Non');
	goNextPage();
}
function demarcheE2proffession(){
	fillInputByLabel ("Votre niveau d'études", 'Plus de 2 années');
	fillInputByLabel ('Non');
	fillInputByLabel ('Votre situation', 'Demandeur');
	goNextPage();
}
function demarcheE3adresse(){
	fillInputByLabel ('Pays', 'bahamas');
	fillInputByLabel ('Numéro et nom de la voie', '20 via Punto');
	fillInputByLabel ('Ville ou localité', 'bahambanana');
	fillInputByLabel ('Votre poste consulaire', 'états-unis');
	fillInputByLabel ('Adresse électronique', 'moi@gmail.com');
	fillInputByLabel ('Numéro de téléphone mobile', '678910112');
}
function demarcheE3contact(){
	fillInputByLabel ('Non');
	goNextPage();
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
if (document.body.containsText ('Étape 1 sur 6')) demarcheE1();
else if (document.body.containsText ('Étape 2 sur 6')){
	if (document.body.containsText ('Prénom usuel')) demarcheE2parents();
	else if (document.body.containsText ('Quelle est votre situation familiale ?')) demarcheE2foyer();
	else if (document.body.containsText ("Quelle est votre niveau d'études ?")) demarcheE2proffession();
//	else if (document.body.containsText ('')) demarcheE2C();
}
else if (document.body.containsText ('Étape 3 sur 6')){
	if (document.body.containsText ("Quelle est votre adresse à l'étranger ?")) demarcheE3adresse();
	else if (document.body.containsText ("Avez-vous des personnes à prévenir en cas d'urgence ?")) demarcheE3contact();
}
else if (document.body.containsText ('Étape 4 sur 6')) demarcheE4();
else if (document.body.innerText.includes ('Vérification et envoi')){
	getRecap ('irf');
}
