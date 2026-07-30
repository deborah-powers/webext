function demarcheLegaE1CasOui(){
	document.getElementById ('estRenouvelePremiereFois_input_0_passeportEnLigne').clickOn();
	setTimeout (function(){
		document.getElementById ('erreurAdministration_input_0_erreurAdministration').clickOn();
		setTimeout (function(){
			// non coché par défaut. oui est intéressant aussi
			document.getElementById ('validiteVisas_input_1_validiteVisas').clickOn();
	}, 500); }, 500);
}
function demarcheLegaE1CasNonFinPage(){
	setTimeout (function(){
		const raisonsRenouv = document.getElementsByName ('raisonRenouvellement');
		for (var raison of raisonsRenouv) raison.addEventListener ('click', function (event){
			document.getElementById ('renouvelerGratuitement_input_0_renouvelerGratuitement').clickOn();
			setTimeout (function(){ document.getElementById ('validiteVisas_input_1_validiteVisas').clickOn(); }, 500);
	}); }, 500);
}
function demarcheLegaE1CasNon(){
	if (document.body.innerText.includes ('Que souhaitez-vous modifier sur votre passeport actuel ?')){
		// changement d'état civil
	//	fillInputByLabel ("nom d'usage");
		document.getElementById ('nomUsage_input_nomUsage').clickOn();
	}
	else document.getElementById ('estRenouvelePremiereFois_input_1_passeportEnLigne').clickOn();
	demarcheLegaE1CasNonFinPage();
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
	const chgNomUsage = document.getElementsByName ('deleteOuModifierNomDusage');
	chgNomUsage[0].addEventListener ('click', function (event){
		// conserver le nom d'usage
		var input = document.getElementById ('provenanceNomUsage_input_0_nomDusage');
		input.clickOn();
		input = document.getElementById ('motNomUsage_input_2_nomDusage');
		input.clickOn();
	/*	fillInputByLabel ('Nom de votre père ou votre mère');
		fillInputByLabel ('Aucun préfixe');
		*/
		document.getElementById ('nomUsagePourCourrier_input_0_courrier').clickOn();
		goNextLegacyPage();
	});
	chgNomUsage[2].addEventListener ('click', function (event){
		// modifier le nom d'usage
		var input = document.getElementById ('provenanceNouveauNomUsage_input_1_nomDusage');
		input.clickOn();
		input = document.getElementById ('motNouveauNomUsage_input_0_nomDusage');
		input.clickOn();
		document.getElementById ('nomUsagePourCourrier_input_0_courrier').clickOn();
		document.getElementById ('nomUsage_input_nomUsage').fillInput ('flix-flox');
		goNextLegacyPage();
}); }
function demarcheLegaE6(){
	const fichiers = getFileUploader();
	if (fichiers[0].value ===""){
		fichiers[0].openFileUploader();
		setTimeout (function(){ fichiers[1].openFileUploader(); }, 500);
	}
	else if (fichiers[2].value ===""){
		fichiers[2].openFileUploader();
		if (fichiers.length >3) setTimeout (function(){ fichiers[3].openFileUploader(); }, 500);
		else goNextLegacyPage();
	}
	else if (fichiers.length >4 && fichiers[4].value ===""){
		fichiers[4].openFileUploader();
		if (fichiers.length >5) setTimeout (function(){
			fichiers[5].openFileUploader();
			goNextLegacyPage();
		}, 500);
		else goNextLegacyPage();
}}
function demarcheLegaE7(){
	if (document.body.innerText.includes ('Avez-vous déjà acheté votre timbre électronique')){
		fillInputByLabel ("Oui, vous l’avez acheté et vous avez son numéro");
		// l'option d'acheter un timbre fait sortir de la démarche
		setTimeout (function(){
			fillInputByLabel ('Numéro du timbre électronique', '0000000000000000');
			goNextLegacyPage();
		}, 500);
	}
	else goNextLegacyPage();
}
function demarcheLegaE8(){
	const boxes = getRadioButtonsAndCheckboxes();
	for (var chbox of boxes) chbox.clickOn();
	getRecap ('rnpp');
	document.body.clickButtonByText ('Envoyer ma');
}
function demarcheLegaE9(){
	const linkDownload = document.getElementById ('confirmationTelechargement_btn_cofirmationPaseport');
	linkDownload.click();
	clickButtonByText ('Terminer');
}
function demarcheE1(){
}
function demarcheE2(){
	document.getElementById ('').clickOn();
	fillInputByLabel ('');
	setTimeout (function(){}, 500);
	document.body.addBlurListener ('', '', function (event){});
	fichiers[0].onchange = function(){}
}
function demarcheE3(){
}
function demarcheE5(){
}
// log (window.location.search);
// pages de npsl
if (document.body.innerText.includes ('Étape 1 sur 6')) demarcheE1();
// pages de legacy
else if (document.body.innerText.includes ('Étape 1 sur 8')) demarcheLegaE1();
else if (document.body.innerText.includes ('Étape 2 sur 8')) goNextLegacyPage();
else if (document.body.innerText.includes ('Étape 3 sur 8')) demarcheLegaE3();
else if (document.body.innerText.includes ('Étape 4 sur 8')) goNextLegacyPage();	// pré-rempli
else if (document.body.innerText.includes ('Étape 5 sur 8')) goNextLegacyPage();
else if (document.body.innerText.includes ('Étape 6 sur 8')) demarcheLegaE6();
else if (document.body.innerText.includes ('Étape 7 sur 8')) demarcheLegaE7();
else if (document.body.innerText.includes ('Étape 8 sur 8')) demarcheLegaE8();
else if (document.body.innerText.includes ('a été envoyée')) demarcheLegaE9();
