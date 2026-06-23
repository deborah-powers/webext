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
		fillInputByLabel ('Choix 1', 'Dulano');
	}, 500);
}
function fblurNouveauNomEnfants (event){
	fillInputByLabel ('Commune de naissance', 'Arpajon');
/*	const choixNom = document.getElementById ('idSaisie36');
	choixNom.value = 'Dulano';
*/
	if (document.body.innerText.includes ('Dulano')) fillInputByLabel ('Dulano');
	else fillInputByLabel ('Choix 1', 'Dulano');
}
function demarcheE1emi(){
	fillInputByLabel ('Nom', 'Guéridon');
	fillInputByLabel ('Prénom 1', 'Clothilde');
	fillInputByLabel ('Date de naissance', '06/06/2012');
	document.body.addBlurListener ('Pays de naissance', 'FRANCE', fblurNouveauNomEnfants);
}
function demarcheE1emp(){
	fillInputByLabel ('Nom', 'Guéridon');
	fillInputByLabel ('Prénom 1', 'Bernard');
	fillInputByLabel ('Date de naissance', '06/06/1986');
	document.body.addBlurListener ('Pays de naissance', 'FRANCE', fblurNouveauNomEnfants);
}
if (document.body.innerText.includes ('Étape 1 sur 2') && document.body.innerText.includes ('Votre demande')) demarcheE1aemp();
else if (document.body.innerText.includes ('Étape 1 sur 2') && document.body.innerText.includes ('Quelle est votre identité actuelle ?'))
	demarcheE1b();
else if (document.body.innerText.includes ('Étape 1 sur 2') && document.body.innerText.includes ('enfant mineur'))
	demarcheE1emi();
else if (document.body.innerText.includes ('Étape 1 sur 2') && document.body.innerText.includes ('Votre enfant majeur protégé'))
	demarcheE1emp();
else if (document.body.innerText.includes ('Étape 3 sur 4')) traiterEnfantMajeurProtegeEtape3();
