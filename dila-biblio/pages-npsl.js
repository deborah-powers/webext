function goNextPage(){
	const buttonNext = document.getElementById ('btn-next');
	buttonNext.click();
}
function validate(){
	const buttonValider = document.body.findByInnerText ('Valider');
	buttonValider.click();
}
function traiterDemandeAutorisationEnvironnementale(){
function traiterDemandeAutorisationEnvironnementaleP1(){
	const radioButton = document.body.findNextInput ("Démarrer le dépôt d'un dossier de demande d'autorisation environnementale.");
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
				//	goNextPage();
	}, 700); }, 700); }, 700); }, 700);
}
function traiterDemandeAutorisationEnvironnementaleP2(){
	const radioButtons = getRadioButtonsAndCheckboxes();
	if (radioButtons.length ===4){	// première partie, avant la saisie du siret
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
				//	const prefillSiret = document.body.findByInnerText ('Pré-remplir');
				//	prefillSiret.click();
		}, 700); }, 700); }, 700); }, 700);
	}
	else{	// deuxième partie, après la saisie du siret
		const buttonFill = document.body.findByInnerText ('Pré-remplir');
		buttonFill.click();
		setTimeout (function(){
			fillInputByLabel ('Numéro et libellé de voie', '72 rue Balzac');
			fillInputByLabel ('Téléphone principal', '0678910112');
			fillInputByLabel ('Adresse e-mail', 'moi@gmoi.com');
		}, 700);
}}
function traiterDemandeAutorisationEnvironnementaleP3(){
	fillInputByLabel ('Quel est le nom de votre projet ?', 'test rgaa sian');
	const radioButtons = getRadioButtonsAndCheckboxes();
	radioButtons[1].clickOn();
	radioButtons[3].clickOn();
	radioButtons[5].clickOn();
	const fichiers = getFileUploader();
	fichiers[0].openFileUploader();
	fichiers[1].openFileUploader();
	fichiers[3].openFileUploader();
}
function traiterDemandeAutorisationEnvironnementaleP4(){
	const radioButtons = getRadioButtonsAndCheckboxes();
	if (radioButtons.length ===1) fillInputByLabel ('Adresse', '72 rue Balzac');
	else if (radioButtons.length ===6){
		radioButtons[1].clickOn();
		setTimeout (function(){
			var radioButtons = getRadioButtonsAndCheckboxes();
			radioButtons[3].clickOn();
			setTimeout (function(){
				const fichiers = getFileUploader();
				fichiers[0].openFileUploader();
				fichiers[1].openFileUploader();
				radioButtons = getRadioButtonsAndCheckboxes();
				radioButtons[6].clickOn();
				setTimeout (function(){
					fillInputByLabel ("Situation d'emprise", 'vitry sur seine');
					fillInputByLabel ('Domaine public concerné', 'Fluvial');
					fillInputByLabel ('Consistance du domaine public', 'bien');
					fillInputByLabel ("Superficie de l'entreprise", '600');
		}, 700); }, 700); }, 700);
	//	for (var button of radioButtons) console.log (button.type, button.labels[0].innerText);
	}
}
function traiterDemandeAutorisationEnvironnementaleP5(){
	const radioButtons = getRadioButtonsAndCheckboxes();
	radioButtons[1].clickOn();
	radioButtons[2].clickOn();
}
//	corps de la fonction elle-même
	if (document.body.innerText.includes ('Étape 1 sur 9')) traiterDemandeAutorisationEnvironnementaleP1();
	else if (document.body.innerText.includes ('Étape 2 sur 9')) traiterDemandeAutorisationEnvironnementaleP2();
	else if (document.body.innerText.includes ('Étape 3 sur 9')) traiterDemandeAutorisationEnvironnementaleP3();
	else if (document.body.innerText.includes ('Étape 4 sur 9')) traiterDemandeAutorisationEnvironnementaleP4();
}
chrome.action.onClicked.addListener (function (tab){
	if (! tab.url.includes ('/mademarche/demarcheGenerique/')) return;
	else if (tab.url.includes ('DemandeAutorisationEnvironnementale')){
		chrome.scripting.executeScript ({
			target: {tabId: tab.id, allFrames: false },
			function: traiterDemandeAutorisationEnvironnementale
});}});
