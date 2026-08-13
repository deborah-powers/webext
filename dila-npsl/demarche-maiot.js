function demarcheE1Commun(){
	setTimeout (function(){
		fillInputByField ('Avez-vous déjà échangé avec le service instructeur dans le cadre de cette demande ?', 'Non');
		setTimeout (function(){
			fillInputByField ('Avez-vous déjà échangé avec le service instructeur dans le cadre de cette demande ?', 'Non');
			setTimeout (function(){
				fillInputByLabel ("Avez-vous utilisé les outils d'aide mis à disposition pour rédiger votre dossier", 'Non');
				setTimeout (function(){
					fillInputByLabel ("Modification d'un AIOT");
					// il y a d'autres cases à cocher. je me contente de celle-ci pour débuter
					setTimeout (function(){
						fillInputByLabel ('Oui, uniquement');
						setTimeout (function(){
							fillInputByLabel ('Élevages intensifs');
							setTimeout (function(){
								fillInputByLabel ('Plus de 85 000 emplacements pour les poulets et 60 000 pour les poules');
								goNextPage();
	}, 500); }, 500); }, 500); }, 500); }, 500); }, 500); }, 500);
}
function demarcheE1AiotConnu(){
	fillInputByLabel ('Oui');
	setTimeout (function(){
		fillInputByLabel ('La DDETSPP ou la DAAF');
		demarcheE1Commun();
	}, 500);
}
function demarcheE1AiotInconnu(){
	fillInputByLabel ('Non');
	demarcheE1Commun();
}
function demarcheE2(){
	fillInputByLabel ('Déclaration');
	setTimeout (function(){
		fillInputByLabel ('IOTA');
		setTimeout (function(){
			fillInputByLabel ('Non soumise à évaluation environnementale');
			fillInputByLabel ('Oui');
			setTimeout (function(){
			/*	fillInputByLabel ("Numéro d'AIOT", '0040987214');
				fillInputByLabel ("Connaissez-vous votre numéro d'AIOT ?");
			*/
				fillInputByLabel ("Je ne connais pas le numéro d'AIOT");
				setTimeout (function(){
					goNextPage();
	}, 500); }, 500); }, 500); }, 500);
}
function demarcheE3(){
	fillInputByLabel ("Nom de l'AIOT", 'les flots bleux');
	fillInputByLabel ('Adresse', '65 rue pierre brossolette, 92500');
}
function demarcheE4(){
	fillInputByLabel ('Nom du projet', "camping renove");
	fillInputByLabel ('Description synthétique', 'nouvelle machine de nettoyage oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo');
	fillInputByLabel ('Modification du bâti');
}
function demarcheE5(){
	fillInputByLabel ('Aucun risque, nuisance ou impact potentiel');
	fillInputByLabel ('Aucune mise à jour nécessaire');
	setTimeout (function(){
		fillInputByLabel ("Aucun arrêté ministériel n'est applicable à la modification");
		setTimeout (function(){
			fillInputByLabel ('Compatible avec les plans, schémas et documents de planification');
			setTimeout (function(){
				fillInputByLabel ('Aucune procédure');
				setTimeout (function(){
					goNextPage();
	}, 500); }, 500); }, 500); }, 500);
}
function demarcheE6(){
}
function demarcheE8(){
	setTimeout (function(){
		fillInputByLabel ('');
	}, 500);
	document.getElementById ('').clickOn();
	fillInputByLabel ('');
	fillInputByField ('', '');
	setTimeout (function(){}, 500);
	document.body.addBlurListener ('', '', function (event){});
	fichiers[0].onchange = function(){}
}

if (document.body.containsText ('Étape 1 sur 9')) demarcheE1AiotConnu();
else if (document.body.containsText ('Étape 2 sur 9')) demarcheE2();
else if (document.body.containsText ('Étape 3 sur 9')) demarcheE3();
else if (document.body.containsText ('Étape 4 sur 9')) demarcheE4();
else if (document.body.containsText ('Étape 5 sur 9')) demarcheE5();