function demarcheLegaE1CasOui(){
	document.getElementById ('estRenouvelePremiereFois_input_0_passeportEnLigne').clickOn();
	setTimeout (function(){
		document.getElementById ('erreurAdministration_input_0_erreurAdministration').clickOn();
		setTimeout (function(){
			// non coché par défaut. oui est intéressant aussi
			document.getElementById ('validiteVisas_input_1_validiteVisas').clickOn();
	}, 500); }, 500);
}
function demarcheLegaE1CasNon(){
	document.getElementById ('estRenouvelePremiereFois_input_1_passeportEnLigne').clickOn();
}
function demarcheLegaE1(){
	/*/ non coché par défaut. oui est intéressant aussi
	if (document.body.innerText.includes ("Est-ce qu'un ou plusieurs visas en cours de validité vous obligent à conserver votre passeport actuel ?"))
		document.getElementById ('validiteVisas_input_1_validiteVisas').clickOn();
	*/
		document.body.addBlurListener ('Pays de résidence', 'australi', function (event){
			fillInputByLabel ('Oui');
			setTimeout (function(){
				document.body.addBlurListener ('Date de délivrance', '2024-05-14', function (event){
					document.body.addBlurListener ("Date d'expiration", '2034-05-14', function (event){
							demarcheLegaE1CasNon();
		}); }); }, 500); });
}
function demarcheLegaE3(){
	fillInputByLabel ('Non');
	setTimeout (function(){
		var input = document.getElementById ('provenanceNomUsage_input_0_nomDusage');
		if (input.clientWidth ===0) input = document.getElementById ('provenanceNouveauNomUsage_input_0_nomDusage');
		input.clickOn();
		input = document.getElementById ('motNomUsage_input_2_nomDusage');
		if (input.clientWidth ===0) input = document.getElementById ('motNouveauNomUsage_input_2_nomDusage');
		input.clickOn();
	/*	fillInputByLabel ('Nom de votre père ou votre mère');
		fillInputByLabel ('Aucun préfixe');
		*/
		document.getElementById ('nomUsagePourCourrier_input_0_courrier').clickOn();
		goNextLegacyPage();
	}, 500);
}
function demarcheLegaE6(){
	const fichiers = getFileUploader();
	fichiers[0].openFileUploader();
	setTimeout (function(){
		fichiers[1].openFileUploader();
		setTimeout (function(){
			fichiers[2].openFileUploader();
			setTimeout (function(){
				fichiers[3].openFileUploader();
	}, 500); }, 1000); }, 1500);
}
function demarcheLegaE8(){
	const boxes = getRadioButtonsAndCheckboxes();
	for (var chbox of boxes) chbox.clickOn();
	getRecap ('rnpp');
//	document.body.clickButtonByText ('Envoyer ma');
}
function demarcheE1(){
}
function demarcheE2(){
	document.getElementById ('').clickOn();
	fillInputByLabel ('');
	setTimeout (function(){}, 500);
	document.body.addBlurListener ('', '', function (event){});
}
function demarcheE3(){
}
function demarcheE5(){
}
// pages de npsl
if (document.body.innerText.includes ('Étape 1 sur 6')) demarcheE1();
// pages de legacy
else if (document.body.innerText.includes ('Étape 1 sur 8')) demarcheLegaE1();
else if (document.body.innerText.includes ('Étape 2 sur 8')) goNextLegacyPage();
else if (document.body.innerText.includes ('Étape 3 sur 8')) demarcheLegaE3();
else if (document.body.innerText.includes ('Étape 4 sur 8')) goNextLegacyPage();	// pré-rempli
else if (document.body.innerText.includes ('Étape 5 sur 8')) goNextLegacyPage();
else if (document.body.innerText.includes ('Étape 6 sur 8')) demarcheLegaE6();
else if (document.body.innerText.includes ('Étape 7 sur 8')) goNextLegacyPage();
else if (document.body.innerText.includes ('Étape 8 sur 8')) demarcheLegaE8();