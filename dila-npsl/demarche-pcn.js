function traiterEtape1(){
	setTimeout (function(){}, 500);
}
function traiterEnfantMajeurProtegeEtape12(){
	// étape 1
	const radioButtons = getRadioButtonsAndCheckboxes();
	radioButtons[2].clickOn();
	setTimeout (function(){
		const radioButtons = getRadioButtonsAndCheckboxes();
		radioButtons[6].clickOn();
		radioButtons[8].clickOn();
		goNextPage();
		setTimeout (function(){
			// étape 2
			const radioButtons = getRadioButtonsAndCheckboxes();
			radioButtons[2].clickOn();
			setTimeout (function(){ fillInputByLabel ('Adresse', '72 rue Balzac 94400 Vitry-sur-Sein');	}, 500);
	}, 500); }, 500);
}
function traiterEnfantMajeurProtegeEtape3(){
	fillInputByLabel ('Nom', 'Orian');
	fillInputByLabel ('Prénom 1', 'David');
	fillInputByLabel ('Date de naissance', '15/08/1990');
	fillInputByLabel ('Pays de naissance', 'FRANCE');
	setTimeout (function(){ fillInputByLabel ('Commune de naissance', 'Vitr'); }, 500);
	const choixNom = document.getElementById ('idSaisie36');
	choixNom.value = 'Dulano';
//	fillInputByLabel ('Choix 1', 'Durano');
}
if (document.body.innerText.includes ('Étape 1 sur 3')) traiterEnfantMajeurProtegeEtape12();
else if (document.body.innerText.includes ('Étape 3 sur 4')) traiterEnfantMajeurProtegeEtape3();

const conteneur = document.getElementById ('mainConteneurDePage');
console.log (conteneur.children);