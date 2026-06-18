function demarcheE1aemp(){
	fillInputByLabel ('Pour vos enfants mineurs ou majeur protégé');
	setTimeout (function(){
		fillInputByLabel ('Non');
		fillInputByLabel ('Enfant majeur protégé');
		goNextPage();
	}, 500);
}
function demarcheE1b(){
	fillInputByLabel ('En France');
	setTimeout (function(){
		fillInputByLabel ('Adresse', '11 rue Aristide Briand 91290 Arpajon');
	}, 500);
}
function demarcheE1emp(){
	fillInputByLabel ('Nom', 'Guéridon');
	fillInputByLabel ('Prénom 1', 'Bernard');
	fillInputByLabel ('Date de naissance', '06/06/1986');
	fillInputByLabel ('Pays de naissance', 'FRANCE');
	fillInputByLabel ('Commune de naissance', 'Arpajon');
	const choixNom = document.getElementById ('idSaisie36');
	log (choixNom.labels[0]);
	choixNom.value = 'Dulano';
//	fillInputByLabel ('Choix 1', 'Durano');
}
if (document.body.innerText.includes ('Étape 1 sur 2') && document.body.innerText.includes ('Votre demande')) demarcheE1aemp();
else if (document.body.innerText.includes ('Étape 1 sur 2') && document.body.innerText.includes ('Quelle est votre identité actuelle ?'))
	demarcheE1b();
else if (document.body.innerText.includes ('Étape 1 sur 2') && document.body.innerText.includes ('Votre enfant majeur protégé'))
	demarcheE1emp();
else if (document.body.innerText.includes ('Étape 3 sur 4')) traiterEnfantMajeurProtegeEtape3();
