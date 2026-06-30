function goNextPage_vb(){
	var buttonNext = document.getElementById ('btn-next');	// npsl
	console.log (buttonNext);
	if (! buttonNext) buttonNext = document.getElementById ('suivant');	// legacy
	buttonNext.click();
}
function goNextPage(){
	const buttonNext = document.getElementById ('btn-next');
	buttonNext.click();
}
function goNextLegacyPage(){
	const buttonNext = document.getElementById ('suivant');
	buttonNext.click();
}
function validate(){
	const buttonValider = document.body.findByInnerText ('Valider');
	buttonValider.addEventListener ('click', function (event){});
}
function adresseEnFranceRochefourchat(){
	fillInputByLabel ('En France');
	setTimeout (function(){
		fillInputByLabel ('Écrire mon adresse');
		setTimeout (function(){
			fillInputByLabel ('nom de la voie', '11 avenue Aristide Briand');
			fillInputByLabel ('Code postal et commune', 'ROCHEFOURCHAT');
			fillInputByLabel ('Lieu-dit', 'les châteaux');
		//	fillInputByLabel ('Téléphone', '0678910112');
	}, 500); }, 500);
}
function adresseEnFranceArpajon(){
	fillInputByLabel ('En France');
	setTimeout (function(){
		fillInputByLabel ('Adresse', '11 avenue Aristide Briand, 91290');
	//	fillInputByLabel ('Téléphone', '0678910112');
	}, 500);
}
function adresseEnHongrie(){
	fillInputByLabel ("A l'étranger");
	setTimeout (function(){
		fillInputByLabel ('nom de la voie', '11 rue paskal');
		fillInputByLabel ('Code postal', '99112');
		fillInputByLabel ('Ville ou localité', 'Budapest');
		const inputs = document.body.findHomonymInputs ('Pays');
		inputs[1].fillInput ('HONGRIE');
	//	fillInputByLabel ('Pays', 'HONGRIE');
	}, 500);
}
function naissanceEnHongrie(){
	document.body.addBlurListener ('Pays de naissance', 'HONGRIE', function(){ fillInputByLabel ('Commune de naissance', 'Budapest'); });
/*	fillInputByLabel ('Pays de naissance', 'HONGRIE');
	setTimeout (function(){ fillInputByLabel ('Commune de naissance', 'Budapest'); }, 500);
	*/
}
function pageParents (nomPere, prenomPere, nomMere, prenomMere){
	if (document.body.innerText.includes ('parent 1 ?')){
		var personne = document.body.findByInnerText ('parent 1 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Père');
		personne.fillInputByLabel ('Nom', nomPere.capitalize());
		personne.fillInputByLabel ('Prénom', prenomPere.capitalize());
		personne = document.body.findByInnerText ('parent 2 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Mère');
		personne.fillInputByLabel ('Nom', nomMere.capitalize());
		personne.fillInputByLabel ('Prénom', prenomMere.capitalize());
}}