var enfantsMineurs =[
	['Bernard', '1986', 'Garçon'],
	['Clothilde', '2012', 'Fille'], ['Germain', '2013', 'Garçon'], ['Eudes', '2014', 'Garçon'],
	['Cunégonde', '2015', 'Fille'], ['Evariste', '2016', 'Garçon'], ['Brunoïde', '2017', 'Fille'], ['Mahault', '2018', 'Fille']
];
function demarcheE1(){
	const pqqaInput = document.body.findInputByLabel ("Pour quelqu'un d'autre");
	pqqaInput.addEventListener ('blur', function (event){ fillInputByLabel ('Adresse', '11 avenue Aristide Briand, 91290'); });
}
function validerNvNom (numStr, nvNom){
	document.body.addBlurListener ('Choix '+ numStr, nvNom, function (event){
		const field = event.target.findContainer ('FIELDSET');
		field.clickButtonByText ('Valider');
});}
function demarcheE2moi(){
	adresseEnFranceArpajon();
	validerNvNom ('1', 'Plastic');
}
function fblurNouveauNomEnfants (event){
	fillInputByLabel ('Commune de naissance', 'Arpajon');
/*	const choixNom = document.getElementById ('idSaisie36');
	choixNom.value = 'Plastic';
*/
}
function demarcheE2enfant (idenf){
	fillInputByLabel ('Nom', 'Guéridon');
	fillInputByLabel ('Prénom 1', enfantsMineurs[idenf][0]);
	fillInputByLabel ('Date de naissance', '06/06/' +enfantsMineurs[idenf][1]);
	document.body.addBlurListener ('Pays de naissance', 'FRANCE', function (event){
		fillInputByLabel ('Commune de naissance', 'Arpajon');
	/*	const choixNom = document.getElementById ('idSaisie36');
		choixNom.value = 'Plastic';
	*/
	});
	if (document.body.innerText.includes ('Plastic')) fillInputByLabel ('Plastic');
	else validerNvNom ('1', 'Plastic');
}
function demarcheE2emi(){
	if (document.body.innerText.includes ('premier')) demarcheE2enfant (1);
	else if (document.body.innerText.includes ('deuxième')) demarcheE2enfant (2);
	else if (document.body.innerText.includes ('troisième')) demarcheE2enfant (3);
	else if (document.body.innerText.includes ('quatrième')) demarcheE2enfant (4);
	else if (document.body.innerText.includes ('cinquième')) demarcheE2enfant (5);
	else if (document.body.innerText.includes ('sixième')) demarcheE2enfant (6);
	else if (document.body.innerText.includes ('septième')) demarcheE2enfant (7);
//	fillInputByLabel ('Non');
}
function demarcheE2emp(){ demarcheE2enfant (0); }
function demarcheE2pr(){
	demarcheE2enfant (0);
/*	fillInputByLabel ('Nom', 'Dupont');
	fillInputByLabel ('Prénom 1', 'Céline');
	fillInputByLabel ('Date de naissance', '06/06/1986');
	document.body.addBlurListener ('Pays de naissance', 'FRANCE', fblurNouveauNomEnfants);
	if (document.body.innerText.includes ('Plastic')) fillInputByLabel ('Plastic');
	else validerNvNom ('1', 'Plastic');
	*/
	adresseEnFranceArpajon();
}
function demarcheE3(){
	fillInputByLabel ('Vous certifiez avoir');
	fillInputByLabel ('Vous avez pris connaissance');
	clickButtonByText ('Envoyer votre demande');
}
function demarcheL1aemp(){
	log (document.getElementsByClassName ('current')[0].innerText);
	fillInputByLabel ('Je certifie avoir 18 ans ou plus');
	fillInputByLabel ('le père et/ou la mère');
	fillInputByLabel ('mon nom et celui de mes enfants');
	goNextLegacyPage();
}
function adresseEnFranceLegacy(){
	fillInputByLabel ('Numéro et libellé de voie', '11 avenue Aristide Briand');
	fillInputByLabel ('Lieu-dit ou commune délégué ou', 'Les châteaux');
	fillInputByLabel ('Code postal / Localité (Exemple', '91290 ARPAJON');
	goNextLegacyPage();
}
function adresseEnHongrieLegacy(){
	const inputAdresse = document.getElementById ('inputAdresseEtrangerePays_adressePays_demandeur');
	inputAdresse.value = 'HONGRIE';
	inputAdresse.addEventListener ('blur', function (event){
		// Numéro et libellé de voie
		var input = document.getElementById ('inputAdresseEtrangereVoieEtr_adresseEtrangere_demandeur');
		input.value = '11 rue paskal';
		// Boite postale / lieu-dit
		input = document.getElementById ('inputAdresseEtrangereLieuEtr_adresseEtrangere_demandeur');
		input.value = 'Les châteaux'
		// Code postal (exemple
		input = document.getElementById ('inputAdresseEtrangereCodePostal_adresseEtrangere_demandeur');
		input.value = '99112'
		// Localité
		input = document.getElementById ('inputAdresseEtrangereLocalite_adresseEtrangere_demandeur');
		input.value = 'Budapest'
		goNextLegacyPage();
});}
function naissanceEnHongrieLegacy(){
	// Pays de naissance
	const inputAdresse = document.getElementById ('inputAdresseEtrangerePays_adresseEtrNaissance');
	inputAdresse.value = 'HONGRIE';
	inputAdresse.addEventListener ('blur', function (event){
		// Code postaL
		var input = document.getElementById ('inputAdresseEtrangereCodePostal_adresseEtrNaissance');
		input.value = '99112';
		// Localité de naissance
		input = document.getElementById ('inputAdresseEtrangereLocalite_adresseEtrNaissance');
		input.value = 'Budapest';
});}
function demarcheL2moi(){
	fillInputByLabel ('Monsieur');
	// pas marié
	fillInputByLabel ('Nouveau nom souhaité', 'Plastic');
	if (document.body.innerText.includes ('Informations personnelles du demandeur')){
		fillInputByLabel ('Madame');
		fillInputByLabel ('Prénom(s)', 'Céline');
		fillInputByLabel ('Nom de naissance', 'Dupont');
		fillInputByLabel ('Jour (JJ)', '06');
		fillInputByLabel ('Mois (MM)', '06');
		fillInputByLabel ('Année (AAAA)', '1986');
		fillInputByLabel ('Pays de naissance', 'FRANCE');
		if (document.body.innerText.includes ('Code postal / Localité de naissance'))
			fillInputByLabel ('Code postal / Localité de naissance', '91290 ARPAJON');
		else{
			fillInputByLabel ('Code postal (exemple', '91290');
			fillInputByLabel ('Localité de naissance', 'Arpajon');
		}
		const paysInput = document.getElementById ('inputAdresseEtrangerePays_adressePays_demandeur');
		paysInput.fillInput ('FRANCE');
		fillInputByLabel ('Numéro et libellé de voie', '11 avenue Aristide Briand');
		fillInputByLabel ('Lieu-dit ou commune délégué', 'Les châteaux');
	//	document.getElementById ('inputAdresseFrLocaliteCP_adresseFrancaise_demandeur').fillInput ('91290 ARPAJON');
		fillInputByLabel ('Code postal / Localité (Exemple', '91290 ARPAJON');
		goNextLegacyPage();
	}
	else adresseEnFranceLegacy();
}
function demarcheL2RedAdresse(){
	fillInputByLabel ('11 avenue Aristide Briand');
	goNextLegacyPage();
}
// blocs des enfants legacy
HTMLElement.prototype.ajouterEnfantLegacy = function (idenf){
	this.fillInputByLabel (enfantsMineurs[idenf][2]);
	this.fillInputByLabel ('Prénom(s)', enfantsMineurs[idenf][0]);
	this.fillInputByLabel ('Nom de naissance', 'Guéridon');
	this.fillInputByLabel ('Date de naissance', '06/06/' + enfantsMineurs[idenf][1]);
	this.fillInputByLabel ('Code postal / Localité de naissance', '91290 ARPAJON');
	this.addBlurListener ('Je souhaite un autre nom pour mon enfant', null, function (event){
		event.target.findContainer ('FIELDSET').getElementsByTagName ('input')[2].fillInput ('Plastic');
}); }
ajouterEnfantLegacy = function (blocName, idenf){
	var enfant = document.body.findByInnerText (blocName);
	enfant = enfant.findContainer ('FIELDSET');
	enfant.ajouterEnfantLegacy (idenf);
}
function demarcheL2enf(){
	if (document.body.innerText.includes ('Enfant 7')) ajouterEnfantLegacy ('Enfant 7', 7);
	else if (document.body.innerText.includes ('Enfant 6')) ajouterEnfantLegacy ('Enfant 6', 6);
	else if (document.body.innerText.includes ('Enfant 5')) ajouterEnfantLegacy ('Enfant 5', 5);
	else if (document.body.innerText.includes ('Enfant 4')) ajouterEnfantLegacy ('Enfant 4', 4);
	else if (document.body.innerText.includes ('Enfant 3')) ajouterEnfantLegacy ('Enfant 3', 3);
	else if (document.body.innerText.includes ('Enfant 2')) ajouterEnfantLegacy ('Enfant 2', 2);
	else if (document.body.innerText.includes ('Enfant 1')) ajouterEnfantLegacy ('Enfant 1', 1);
	if (document.body.findInputByLabel ('Oui').checked){
		var enfant = document.body.findByInnerText ('Majeur protégé');
		enfant = enfant.findContainer ('FIELDSET');
		enfant = enfant.findInputByLabel ('Prénom(s)')
		if (! enfant.value) ajouterEnfantLegacy ('Majeur protégé', 0);
	}
	else if (false){
		// premier enfant mineur
		clickButtonByText ('Ajouter un enfant');
		ajouterEnfantLegacy ('Enfant 1', 1);
		// enfant majeur protégé
		fillInputByLabel ('Oui');
		ajouterEnfantLegacy ('Majeur protégé', 0);
}}
// fin du blocs des enfants legacy
function demarcheL3(){
	if (document.body.innerText.includes ('Mon adresse de gestion')){
		fillInputByLabel ('Autre');
		fillInputByLabel ('Dénomination', 'Bertrand sa');
		fillInputByLabel ('Référence du dossier', '80008234');
}}
function demarcheL4(){
	if (document.body.innerText.includes ('ai pris connaissance du fait que ma demande de publication'))
		fillInputByLabel ('ai pris connaissance du fait que ma demande de publication');
	else clickButtonByText ('Evoyer');
//	goNextLegacyPage();
}
// pages de npsl
if (document.body.innerText.includes ('Étape 1 sur 3')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 3') && document.body.innerText.includes ('Quelle est votre identité actuelle ?')) demarcheE2moi();
else if (document.body.innerText.includes ('Étape 2 sur 3') && document.body.innerText.includes ('enfant mineur')) demarcheE2emi();
else if (document.body.innerText.includes ('Étape 2 sur 3') && document.body.innerText.includes ('enfant majeur protégé')) demarcheE2emp();
else if (document.body.innerText.includes ('Étape 2 sur 3') && document.body.innerText.includes ('La personne que vous représentez')) demarcheE2pr();
else if (document.body.innerText.includes ('Étape 3 sur 3')) demarcheE3();
// pages de legacy
else if (document.body.innerText.includes ("Demande de publication d'annonce préalable de changement de nom")){
	const etapeNb = document.getElementsByClassName ('current')[0].innerText[15];
	if (etapeNb === '1') demarcheL1aemp();
	else if (etapeNb === '2'){
		const personne = document.getElementsByTagName ('h2')[0].innerText;
		if (personne === 'Mes informations personnelles') demarcheL2moi();
		else if (personne.includes ("Redressement de l'adresse")) demarcheL2RedAdresse();
		else if (personne.includes ('Enfant(s) mineur(s) et/ou un majeur protégé')) demarcheL2enf();
	}
	else if (etapeNb === '3') demarcheL3();
	else if (etapeNb === '4') demarcheL4();
}
else log ('page inconnue');