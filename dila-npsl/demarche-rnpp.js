/* ------------------------ fonctions de la legacy ------------------------ */

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
	if (document.body.containsText ('Que souhaitez-vous modifier sur votre passeport actuel ?')){
		// changement d'état civil
	//	fillInputByLabel ("nom d'usage");
		document.getElementById ('nomUsage_input_nomUsage').clickOn();
	}
	else document.getElementById ('estRenouvelePremiereFois_input_1_passeportEnLigne').clickOn();
	demarcheLegaE1CasNonFinPage();
}
function demarcheLegaE1(){
	// non coché par défaut. oui est intéressant aussi
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
	/* bon timbre: 0000000000000000
	mauvais timbre: 0000000000000001
	*/
	if (document.body.containsText ('Avez-vous déjà acheté votre timbre électronique')){
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
/* ------------------------ fonctions de la npsl ------------------------ */

function visaExists (event){
	setTimeout (function(){ fillInputByField ("Est-ce qu'un ou plusieurs visas en cours de validité", 'Non'); }, 500);
}
function renoveForFree (event){
	setTimeout (function(){
		fillInputByField ('Voulez-vous renouveler gratuitement', 'Oui');
		visaExists();
	}, 500);
}
function fillPassportError(){
	setTimeout (function(){
		document.body.addBlurListener ('Numéro du titre concerné', '12ab12345', function (event){
			setTimeout (function(){
				var element = document.body.findByInnerText ('Je soussigné(e), certifie avoir constaté');
				element = element.findContainer ('fieldset');
				const checkboxes = element.getRadioButtonsAndCheckboxes();
				for (var box of checkboxes) box.addEventListener ('click', function (event){
					visaExists();
	}); }, 800); }); }, 500);
}
function demarcheE1CasOui(){
	fillInputByField ('Avez-vous utilisé cette démarche en ligne', 'Oui');
	setTimeout (function(){
		fillInputByField ('Renouvelez-vous votre passeport pour corriger une erreur', 'Oui');
		fillPassportError();
	}, 500);
}
function demarcheE1CasNon(){
	fillInputByField ('Avez-vous utilisé cette démarche en ligne', 'Non');
	setTimeout (function(){
		var element = document.body.findByInnerText ('Pour quelle raison renouvelez-vous votre passeport ?');
		element = element.findContainer ('div');
		const raisonsRenouv = element.getRadioButtonsAndCheckboxes();
		raisonsRenouv[0].addEventListener ('click', visaExists);
		raisonsRenouv[1].addEventListener ('click', renoveForFree);
		raisonsRenouv[2].addEventListener ('click', function (event){
			var container = document.body.findByInnerText ('Que souhaitez-vous modifier sur votre passeport');
			container = container.findContainer ('div');
			const boxes = container.getRadioButtonsAndCheckboxes();
			for (var chbox of boxes) chbox.clickOn();
		});
		raisonsRenouv[3].addEventListener ('click', renoveForFree);
		raisonsRenouv[5].addEventListener ('click', function (event){
			renoveForFree (event);
			fillPassportError();
		});
		raisonsRenouv[6].addEventListener ('click', visaExists);
	}, 500);
}
function demarcheE1(){
	if (document.body.containsText ('Pays de résidence'))
		document.body.addBlurListener ('Pays de résidence', 'australi', function (event){
			fillInputByLabel ('Oui');
			setTimeout (function(){
				document.body.addBlurListener ('Date de délivrance', '2024-05-14', function (event){
					document.body.addBlurListener ("Date d'expiration", '2034-05-14', function (event){
						demarcheE1CasNon();
	}); }); }, 500); });
	else if (document.body.containsText ('Votre démarche avec le consulat')) goNextPage();
}
function demarcheE2(){
	var NomUsageBloc = document.body.findByInnerText ('Voulez-vous supprimer ou modifier votre nom');
	NomUsageBloc = NomUsageBloc.findContainer ('fieldset');
	const NomUsageList = NomUsageBloc.getElementsByTagName ('input');
	NomUsageList[0].addEventListener ('click', function (event){ setTimeout (function(){
	// conserver le nom d'usage
		fillInputByLabel ('Nom de votre père ou votre mère');
		fillInputByLabel ('Aucun préfixe');
		fillInputByField ('Voulez-vous utiliser votre nom', 'Oui');
		goNextPage();
	}, 500); });
	NomUsageList[2].addEventListener ('click', function (event){ setTimeout (function(){
		// modifier le nom d'usage
		fillInputByLabel ('Nom de votre époux ou épouse');
		fillInputByLabel ('Époux ou épouse');
		fillInputByField ('Voulez-vous utiliser votre nom', 'Nom');
		fillInputByLabel ("Nouveau nom d'usage", 'flix-flox');
		fillInputByField ('Voulez-vous utiliser votre nom', 'Oui');
		goNextPage();
	}, 500); });
}
function demarcheE3(){
	fillInputByLabel ('Père');
	fillInputByField ('Lien de parenté du parent 2', 'Mère');
	goNextPage();
}
function demarcheE4(){
	fillInputByLabel ('Indicatif', '+1 (CANADA)');
	goNextPage();
}
function demarcheE6(){
	/* bon timbre: 0000000000000000
	mauvais timbre: 0000000000000001
	*/
	if (document.body.containsText ('Avez-vous déjà acheté votre timbre électronique')){
		fillInputByLabel ("Oui, vous");
		// l'option d'acheter un timbre fait sortir de la démarche
		setTimeout (function(){ fillInputByLabel ('Numéro du timbre électronique', '0000000000000000'); }, 500);
	}
	else goNextPage();
}
function demarcheE7(){
	const boxes = getRadioButtonsAndCheckboxes();
	for (var chbox of boxes) chbox.clickOn();
	getRecap ('rnpp');
	document.body.clickButtonByText ('Envoyer votre demande');
}
function demarcheE8(){
	document.getElementById ('').clickOn();
	fillInputByLabel ('');
	setTimeout (function(){}, 500);
	document.body.addBlurListener ('', '', function (event){});
	fichiers[0].onchange = function(){}
}
/* ------------------------ pages de la npsl ------------------------ */

if (document.body.containsText ('Étape 1 sur 7')) demarcheE1();
else if (document.body.containsText ('Étape 2 sur 7')) demarcheE2();
else if (document.body.containsText ('Étape 3 sur 7')) demarcheE3();	// pré-rempli avec des erreurs
else if (document.body.containsText ('Étape 4 sur 7')) demarcheE4();	// pré-rempli
else if (document.body.containsText ('Étape 5 sur 7')) demarcheLegaE6();
else if (document.body.containsText ('Étape 6 sur 7')) demarcheE6();
else if (document.body.containsText ('Étape 7 sur 7')) demarcheE7();
else if (document.body.containsText ('a été envoyée')) terminerDemarche();

/* ------------------------ pages de la legacy ------------------------ */

else if (document.body.containsText ('Étape 1 sur 8')) demarcheLegaE1();
else if (document.body.containsText ('Étape 2 sur 8')) goNextLegacyPage();
else if (document.body.containsText ('Étape 3 sur 8')) demarcheLegaE3();
else if (document.body.containsText ('Étape 4 sur 8')) goNextLegacyPage();	// pré-rempli
else if (document.body.containsText ('Étape 5 sur 8')) goNextLegacyPage();
else if (document.body.containsText ('Étape 6 sur 8')) demarcheLegaE6();
else if (document.body.containsText ('Étape 7 sur 8')) demarcheLegaE7();
else if (document.body.containsText ('Étape 8 sur 8')) demarcheLegaE8();
else if (document.body.containsText ('a été envoyée')) terminerDemarcheLegacy();
