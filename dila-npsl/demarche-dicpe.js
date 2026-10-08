function demarcheE1(){
	fillInputByLabel ('Une déclaration initiale');	// premier parcours testé
	fillInputByLabel ('Non');	// numéro d'aiot
	fillInputByField ('Connaissez-vous le service en charge de votre dossier', 'Non');
	fillInputByLabel ("Je m'engage à ce que les fichiers déposés");
	fillInputByLabel ("Je m'engage à prendre connaissance");
	fillInputByLabel ('Je prends note');
	fillInputByLabel ('En initiant le dépôt de mon dossier');
	goNextPage();
}
function demarcheInitialeE2(){}
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
if (document.body.containsText ('Étape 1 sur')) demarcheE1();
else if (document.body.containsText ('Étape 2 sur 10')) demarcheInitialeE2();
