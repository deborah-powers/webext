
function demarcheE0(){
	fillInputByLabel ('Ma belle association');
	goNextPage();
/*	fillInputByLabel ("Nom de l'espace", 'test sian');
	setFocusByLabel ("Nom de l'espace");
	*/
}
function demarcheE1(){
	fillInputByLabel ('Madame');
	fillInputByLabel ('Nom', 'Polaire');
	fillInputByLabel ('Prénom 1', 'Pauline');
	fillInputByLabel ('Oui');
	setTimeout (function(){
		fillInputByLabel ('Votre fonction', 'Trésorier');
		fillInputByLabel ('Votre profession', 'comptable');
		setFocusByLabel ('Nom');
	}, 500);
}
function demarcheE2Description(){
	fillInputByLabel ('Intitulé court', 'MON ASSO CHERIE');
	fillInputByLabel ('Objet', "c'est mon asso à moi que j'aime");
	setFocusByLabel ('Intitulé court');
}
function demarcheE2Coordonnee(){
	fillInputByField ("Quelle est l'adresse du siège social", 'Adresse', '5 Place Gambetta 33000');
	fillInputByLabel ('Oui');
	fillInputByLabel ('Monsieur');
	fillInputByLabel ('Nom', 'Camembert');
	fillInputByLabel ('Prénom 1', 'Gilbert');
	fillInputByLabel ('Nationalité', 'français');
	fillInputByLabel ('Sa fonction', 'Président');
	fillInputByLabel ('Profession', 'fromager');
	fillInputByLabel ('En France');
	fillInputByField ("Qui est le gestionnaire de l'association", 'Adresse', '5 Place Gambetta 33000');
	fillInputByLabel ('Adresse électronique', 'moi@gmoi.con');
	fillInputByLabel ("Date de l'assemblée constitutive", '2025-09-21');
	fillInputByField ('Votre association a-t-elle un site Internet ?', 'Non');
//	setFocusByLabel ('Nom');
}
function demarcheE3Fonctionnement(){
	fillInputByLabel ('Non');
	goNextPage();
}
function demarcheE3Administration(){
	fillInputByLabel ('Moins de 50 dirigeants');
	clickButtonByText ('Ajouter un dirigeant');
}
function demarcheE4(){
	var fileUploaded = true;
	if (fileUploaded) fileUploaded = openFileUploaderRequired();
}
function demarcheE13(){
	var uploaderOpened = openFileUploaderRequired();
	if (uploaderOpened) uploaderOpened = openFileUploaderRequired();
	else{}
	setTimeout (function(){
		fillInputByLabel ('');
	}, 500);
	document.getElementById ('').clickOn();
	clickButtonByText ('');
	fillInputByLabel ('');
	fillInputByField ('', '');
	setFocusByLabel ('');
	setTimeout (function(){}, 500);
	document.body.addBlurListener ('', '', function (event){});
	fichiers[0].onchange = function(){}
	goNextPage();
}
if (document.body.containsText ('Étape 0 sur 5')) demarcheE0();
else if (document.body.containsText ('Étape 1 sur 5')) demarcheE1();
else if (document.body.containsText ('Étape 2 sur 5') && document.body.containsText ("Description de l'association")) demarcheE2Description();
else if (document.body.containsText ('Étape 2 sur 5') && document.body.containsText ("Coordonnées de l'association")) demarcheE2Coordonnee();
else if (document.body.containsText ('Étape 3 sur 5') && document.body.containsText ("Fonctionnement de l'association")) demarcheE3Fonctionnement();
else if (document.body.containsText ('Étape 3 sur 5') && document.body.containsText ("Administration de l'association")) demarcheE3Administration();
else if (document.body.containsText ('Étape 4 sur 5')) demarcheE4();
else if (document.body.containsText ('Étape 5 sur 5')) getRecap ('cr');
