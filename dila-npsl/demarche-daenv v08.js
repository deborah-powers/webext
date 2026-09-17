function demarcheE1(){
	const radioButton = document.body.findInputByLabel ("Démarrer le dépôt d'un dossier de demande d'autorisation environnementale.");
	radioButton.clickOn();
	setTimeout (function(){
		const radioButtons = getRadioButtonsAndCheckboxes();
		radioButtons[2].clickOn();
		radioButtons[5].clickOn();
		radioButtons[6].clickOn();
		radioButtons[7].clickOn();
		radioButtons[3].clickOn();
		setTimeout (function(){
			fillInputByLabel ("Numéro d'AIOT", '0040987214');
			const radioButtons = getRadioButtonsAndCheckboxes();
			radioButtons[5].clickOn();
			setTimeout (function(){
				const radioButtons = getRadioButtonsAndCheckboxes();
				radioButtons[7].clickOn();
				setTimeout (function(){
					const radioButtons = getRadioButtonsAndCheckboxes();
					radioButtons[10].clickOn();
				}, 500); }, 500); }, 500); }, 500);
}
function demarcheE2(){
	const radioButtons = getRadioButtonsAndCheckboxes();
	if (radioButtons.length ===4){
		// première partie, avant la saisie du siret
		radioButtons[2].clickOn();
		radioButtons[0].clickOn();
		setTimeout (function(){
			const radioButtons = getRadioButtonsAndCheckboxes();
			radioButtons[3].clickOn();
			setTimeout (function(){
				const radioButtons = getRadioButtonsAndCheckboxes();
				radioButtons[5].clickOn();
				setTimeout (function(){
					const radioButtons = getRadioButtonsAndCheckboxes();
					radioButtons[6].clickOn();
					setTimeout (function(){
						const radioButtons = getRadioButtonsAndCheckboxes();
						radioButtons[9].clickOn();
						radioButtons[10].clickOn();
						radioButtons[13].clickOn();
						fillInputByLabel ('naissance', '2002-03-14');
						fillInputByLabel ('de SIRET', '41816609600069');
					}, 500); }, 500); }, 500); }, 500);
	}else{
		// deuxième partie, après la saisie du siret
		const buttonFill = document.body.findByInnerText ('Pré-remplir');
		buttonFill.click();
		setTimeout (function(){
			fillInputByLabel ('Numéro et libellé de voie', '72 rue Balzac');
			fillInputByLabel ('Téléphone principal', '0678910112');
			fillInputByLabel ('Adresse e-mail', 'moi@gmoi.com');
		}, 500);
}}
function demarcheE3(){
	var uploaderOpened = openFileUploaderRequired();
	if (! uploaderOpened){
		fillInputByLabel ('Quel est le nom de votre projet ?', 'test rgaa sian');
		const radioButtons = getRadioButtonsAndCheckboxes();
		radioButtons[1].clickOn();
		radioButtons[3].clickOn();
		radioButtons[5].clickOn();
	/*	const fichiers = getFileUploader();
		fichiers[0].openFileUploader();
		fichiers[1].openFileUploader();
		fichiers[3].openFileUploader();
	*/
}}
function demarcheE4(){
	const radioButtons = getRadioButtonsAndCheckboxes();
	if (radioButtons.length ===1) fillInputByLabel ('Adresse', '72 rue Balzac');
	else if (radioButtons.length >5){
		log ('boutons radio', radioButtons.length);
		radioButtons[1].clickOn();
		setTimeout (function(){
			var radioButtons = getRadioButtonsAndCheckboxes();
			radioButtons[3].clickOn();
			setTimeout (function(){
				const fichiers = getFileUploader();
				fichiers[0].openFileUploader();
				fichiers[1].openFileUploader();
				radioButtons = getRadioButtonsAndCheckboxes();
				radioButtons[7].clickOn();
//				radioButtons[6].clickOn();
				setTimeout (function(){
					const fichiers = getFileUploader();
					fichiers[1].openFileUploader();
					goNextPage();
/*					fillInputByLabel ("Situation d'emprise", 'vitry sur seine');
					fillInputByLabel ('Domaine public concerné', 'Fluvial');
					fillInputByLabel ('Consistance du domaine public', 'bien');
					fillInputByLabel ("Superficie de l'entreprise", '600');
*/
			}, 500); }, 500); }, 500);
}}
function demarcheE5(){
	const radioButtons = getRadioButtonsAndCheckboxes();
	radioButtons[1].clickOn();
	radioButtons[2].clickOn();
	setTimeout (function(){
		const radioButtons = getRadioButtonsAndCheckboxes();
		radioButtons[7].clickOn();
		radioButtons[27].clickOn();	// pour le momment
		goNextPage();
	}, 500);
}
function demarcheE5_v08(){
	if (! document.body.innerText.includes ('Tableau du choix')){
		const radioButtons = getRadioButtonsAndCheckboxes();
		radioButtons[1].clickOn();
		radioButtons[2].clickOn();
		setTimeout (function(){
			const radioButtons = getRadioButtonsAndCheckboxes();
			radioButtons[7].clickOn();
			radioButtons[27].clickOn();	// pour le momment
			const buttonAjoutRubrique = document.body.findByInnerText ('Ajouter une rubrique');
			buttonAjoutRubrique.click();
			setTimeout (function(){ fillInputByLabel ('Rubrique', 'Prélèvement dans un cour'); }, 500);
		}, 500);
	}else{
		clickButtonByText ('Sélectionner');
		setTimeout (function(){
			fillInputByLabel ('Quantité totale', '400');
			fillInputByLabel ('Quantité ajoutée', '100');
			const buttonValider = document.getElementById ('valider1');
			buttonValider.addEventListener ('click', function (event){
				setTimeout (function(){
					const buttonAjoutRubrique = document.body.findByInnerText ('Ajouter une rubrique');
					buttonAjoutRubrique.click();
					setTimeout (function(){
						fillInputByLabel ('Rubrique', 'Préparation de produits alimentaire');
					}, 500); }, 500); }); }, 500);
}}
function demarcheE6(){
	document.body.addBlurListenerRubrique ('Prélèvement dans un système aquifère, à l', function (event){
			fillInputByLabel ("Quantité totale susceptible d'être présente", '500000');
			fillInputByLabel ('Quantité ajoutée ou retirée', '250000');
			// second bloc
			var tag = document.body.findByInnerText ('Rubrique E ICPE n° 1');
			tag = tag.findContainer ('fieldset');
			tag.addBlurListenerRubrique ('Préparation de produits alimentaires', function (event){});
	//	clickButtonByText ('Valider');
	});


/*
	fillInputByField ('Rubrique A IOTA n° 1', 'Rubrique', 'Prélèvement dans un système aquifère');
	fillInputByField ('Rubrique E ICPE n° 1', 'Rubrique', 'Préparation de produits alimentaires');
	clickButtonByText ('Sélectionner');

	document.body.addBlurListenerRubrique ("Prélèvement dans un système aquifère, à l’exclusion", function (event){
		clickButtonByText ('Sélectionner');
		setTimeout (function(){
			fillInputByLabel ("Quantité totale susceptible d'être présente", '500000');
			fillInputByLabel ('Quantité ajoutée ou retirée', '250000');
			document.body.addBlurListener ('Rubrique', '', function (event){
				clickButtonByText ('Sélectionner');
				setTimeout (function(){
		}, 500); }, 500); }, 500);
	//	clickButtonByText ('Valider');
	});
*/
}
if (document.body.innerText.includes ('Étape 1 sur 10')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 10')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur 10')) demarcheE3();
else if (document.body.innerText.includes ('Étape 4 sur 10')) demarcheE4();
else if (document.body.innerText.includes ('Étape 5 sur 10')) demarcheE5();
else if (document.body.innerText.includes ('Étape 6 sur 10')) demarcheE6();
else if (document.body.innerText.includes ('Étape 10 sur 10')) getRecap ('daenv');
