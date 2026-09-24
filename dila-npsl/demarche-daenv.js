function demarcheE1(){
	const radioButton = document.body.findInputByLabel ("Démarrer le dépôt d'un dossier de demande d'autorisation environnementale.");
	radioButton.clickOn();
	setTimeout (function(){
		const radioButtons = getRadioButtonsAndCheckboxes();
		radioButtons[2].clickOn();
		radioButtons[5].clickOn();
		radioButtons[6].clickOn();
		radioButtons[7].clickOn();
		radioButtons[4].clickOn();	// 3 pour noter le numéro d'aiot
		setTimeout (function(){
		//	fillInputByLabel ("Numéro d'AIOT", '0040987214');
			const radioButtons = getRadioButtonsAndCheckboxes();
			radioButtons[5].clickOn();
			setTimeout (function(){
				const radioButtons = getRadioButtonsAndCheckboxes();
				radioButtons[7].clickOn();
				setTimeout (function(){
					const radioButtons = getRadioButtonsAndCheckboxes();
					radioButtons[10].clickOn();
					goNextPage();
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
		radioButtons[1].clickOn();	// 1 pour non, 0 pour oui
		radioButtons[2].clickOn();
		radioButtons[5].clickOn();
		setTimeout (function(){
			fillInputByLabel ("Nom de l'autorisation ou de la déclaration", 'numéro 04008');
			fillInputByLabel ('Date de dépôt', '15/09/2026');
			fillInputByLabel ("Organisme en charge de l'instruction", 'coeur de doudou');
			uploaderOpened = openFileUploaderRequired();
		}, 500);
}}
function demarcheE4(){
	const radioButtons = getRadioButtonsAndCheckboxes();
	if (radioButtons.length ===1) fillInputByLabel ('Adresse', '72 rue Balzac');
	else if (radioButtons.length >5){
		var uploaderOpened = openFileUploaderRequired();
		if (! uploaderOpened){
			radioButtons[0].clickOn();
			setTimeout (function(){
				var radioButtons = getRadioButtonsAndCheckboxes();
				radioButtons[3].clickOn();
				setTimeout (function(){
					uploaderOpened = openFileUploaderRequired();
					radioButtons = getRadioButtonsAndCheckboxes();
					radioButtons[5].clickOn();
					setTimeout (function(){
						uploaderOpened = openFileUploaderRequired();
						goNextPage();
				}, 500); }, 500); }, 500);
}}}
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
function demarcheE6(){
	document.body.addBlurListenerRubrique ('Prélèvement dans un système aquifère, à l', function (event){
	clickButtonByText ('Sélectionner');
	setTimeout (function(){
		fillInputByLabel ("Quantité totale susceptible d'être présente", '500000');
		fillInputByLabel ('Quantité ajoutée ou retirée', '250000');
		// second bloc
		var tag = document.body.findByInnerText ('Rubrique E ICPE n° 1');
		tag = tag.findContainer ('fieldset');
		tag.addBlurListenerRubrique ('Préparation de produits alimentaires', function (event){
			clickButtonByText ('Sélectionner');
			setTimeout (function(){
				fillInputByLabel ("Quantité totale susceptible d'être présente", '50');
				fillInputByLabel ('Quantité ajoutée ou retirée', '25');
		}, 500); });
	//	clickButtonByText ('Valider');
	}, 500); });
}
function demarcheE7(){
	if (! document.body.innerText.includes ("Ajouter l'étude d'incidence")){
		fillInputByLabel ("Étude d'incidence");
		setTimeout (function(){
			fillInputByField ("Disposez-vous de dispense d'évaluation environnementale", 'Non');
			fillInputByField ('Des modifications ont-elles été apportées aux caractéristiques et mesures du projet', 'Non');
		}, 500);
	}else{
		var uploaderOpened = openFileUploaderRequired();
		if (! uploaderOpened) goNextPage();
}}
function demarcheE8(){
	var uploaderOpened = openFileUploaderRequired();
	if (! uploaderOpened){
		const radioButtons = getRadioButtonsAndCheckboxes();
		radioButtons[1].clickOn();
		radioButtons[3].clickOn();
		radioButtons[5].clickOn();
		radioButtons[7].clickOn();
		radioButtons[9].clickOn();
		radioButtons[11].clickOn();
		radioButtons[13].clickOn();
		radioButtons[15].clickOn();
		radioButtons[17].clickOn();
		radioButtons[19].clickOn();
		radioButtons[20].clickOn();
}}
function demarcheE9(){
	var uploaderOpened = openFileUploaderRequired();
	if (! uploaderOpened){
}}
if (document.body.innerText.includes ('Étape 1 sur 10')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 10')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur 10')) demarcheE3();
else if (document.body.innerText.includes ('Étape 4 sur 10')) demarcheE4();
else if (document.body.innerText.includes ('Étape 5 sur 10')) demarcheE5();
else if (document.body.innerText.includes ('Étape 6 sur 10')) demarcheE6();
else if (document.body.innerText.includes ('Étape 7 sur 10')) demarcheE7();
else if (document.body.innerText.includes ('Étape 8 sur 10')) demarcheE8();
else if (document.body.innerText.includes ('Étape 9 sur 10')) demarcheE9();
else if (document.body.innerText.includes ('Étape 10 sur 10')) getRecap ('daenv');
// else if (document.body.containsText ('a été envoyée')) terminerDemarche();
