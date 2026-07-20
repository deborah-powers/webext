function demarcheE1CasOui(){
	document.getElementById ('estRenouvelePremiereFois_input_0_passeportEnLigne').clickOn();
	setTimeout (function(){
		document.getElementById ('erreurAdministration_input_0_erreurAdministration').clickOn();
		setTimeout (function(){
			// non coché par défaut. oui est intéressant aussi
			document.getElementById ('validiteVisas_input_1_validiteVisas').clickOn();
	}, 500); }, 500);
}
function demarcheE1CasNon(){
	document.getElementById ('estRenouvelePremiereFois_input_1_passeportEnLigne').clickOn();
	setTimeout (function(){}, 500);
}
function demarcheE1(){
	fillInputByLabel ('Pays de résidence', 'portug');
	setTimeout (function(){ fillInputByLabel ('Oui');
		setTimeout (function(){ fillInputByLabel ('Date de délivrance', '2024-05-14');
			setTimeout (function(){ fillInputByLabel ("Date d'expiration", '2034-05-14');
				setTimeout (function(){ fillInputByLabel ("Date d'expiration", '2034-05-14');
					setTimeout (function(){ demarcheE1CasOui();
	}, 500);}, 500); }, 500); }, 500); }, 500);
}

function demarcheE2(){
	setTimeout (function(){}, 500);
}
function demarcheE3(){
}
function demarcheE5(){
}
// pages de npsl
if (document.body.innerText.includes ('Étape 1 sur')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur')) demarcheE3();
else if (document.body.innerText.includes ('Étape 5 sur')) getRecap ('jcc');