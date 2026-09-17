function demarcheE02(){
	if (! document.body.containsText ('Numéro de SIRET')){
		fillInputByLabel ('Oui');
		setTimeout (function(){
			fillInputByField ("L'accident/L'incident est-il terminé ?", 'Oui');
			setTimeout (function(){
				fillInputByField ("Cet accident/incident a-t-il déjà été télédéclaré ?", 'Non');
				setTimeout (function(){
					fillInputByLabel ("L'exploitant");
					setTimeout (function(){
						fillInputByLabel ('Personne physique');
						setTimeout (function(){
							fillInputByLabel ('Numéro de SIRET', '41816609600069');
	}, 500); }, 500); }, 500); }, 500); }, 500); }
	else{
		clickButtonByText ('Pré-remplir');
		setTimeout (function(){
			fillInputByField ('Qui est le responsable de', 'Nom', 'Guéridon');
			fillInputByField ('Qui est le responsable de', 'Prénom', 'Bertrand');
			fillInputByLabel ('Numéro de téléphone du responsable', '0123456789');
			fillInputByField ('Voulez-vous indiquer un numéro de téléphone secondaire pour le responsable', 'Non');
			fillInputByField ('Qui est le responsable de', 'Adresse email', 'bertand.gueridon@gmail.com');
			fillInputByField ('Qui êtes vous ?', 'Nom', 'Malabine');
			fillInputByField ('Qui êtes vous ?', 'Prénom', 'Fantine');
			fillInputByLabel ('Intitulé de poste', 'chef de projet');
			fillInputByLabel ('Nom de votre société', 'cocogema');
			fillInputByField ('Comment pouvons-nous vous contacter ?', 'Numéro de téléphone', '0678910112');
			fillInputByField ("Voulez-vous indiquer un numéro de téléphone secondaire pour échanger avec l'administration ?", 'Non');
			fillInputByField ('Comment pouvons-nous vous contacter ?', 'Adresse email', 'fanfan.titine@gmail.com');
			fillInputByField ('Voulez-vous indiquer une deuxième adresse e-mail', 'Non');
		}, 500);
}}
function demarcheE03(){ fillInputByLabel ('Adresse', '10 route de labiec 43210'); }
function demarcheE04(){
	fillInputByField ("Connaissez-vous le numéro d'AIOT", 'Oui');
	fillInputByField ('Connaissez-vous le service de contrôle ICPE', 'Oui');
	fillInputByLabel ('Déclaration');
	fillInputByField ('Souhaitez-vous ajouter une ou plusieurs rubriques ICPE impliquée', 'Oui');
	setTimeout (function(){
		fillInputByLabel ("Numéro AIOT de l'installation", '0012345678');
		fillInputByLabel ('DDETSPP');
		clickButtonByText ('Ajouter une rubrique');
		setTimeout (function(){
		//	fillInputByLabel ('Rubrique', 'elevage de coléo');
			document.body.addBlurListener ('Rubrique', 'elevage de coléo', function (event){ clickButtonByText ('Valider'); });
	}, 500); }, 500);
}
function demarcheE05(){
	fillInputByLabel ('Chargement ou déchargement de matières dangereuses par camion');
	goNextPage();
}
function demarcheE06(){
	fillInputByLabel ('Autre phénomène dangereux');
	setTimeout (function(){ fillInputByLabel ('Quelle est la nature', 'explosion de lisier'); }, 500);
}
function demarcheE07(){
	fillInputByLabel ('Date de début', '2026-09-14');
	fillInputByLabel ('Heure de début', '14:30')
	fillInputByLabel ('Date de fin', '2026-09-14');
	fillInputByLabel ('Heure de fin', '23:30');
	fillInputByLabel ('Odeurs anormales');
	fillInputByLabel ("Un personnel de l'établissement");
	fillInputByLabel ('Agression externe non humaine');
	fillInputByLabel ('Où et comment s', "La récente crue à rempli le puit où nous stockons le lisier et l'a fait dégorger. le lisier a donc atterrit dans le champ stérile voisin.");
}
function demarcheE08(){
	fillInputByLabel ("Déclenchement d'un plan de secours");
	fillInputByLabel ('Évacuation');
	goNextPage();
}
function demarcheE09(){
	fillInputByField ('conséquences humaines', 'Non');
	fillInputByField ("conséquences sur l'environnement", 'Non');
	fillInputByField ('conséquences sur votre activité', 'Oui');
	fillInputByField ('conséquences hors des frontières', 'Non');
	fillInputByField ('détailler les conséquences', 'Non');
	setTimeout (function(){ fillInputByLabel ('Dommage matériel pour les tiers'); }, 500);
	goNextPage();
}
function demarcheE10(){
	clickButtonByText ('Ajouter un fichier');
	const fichiers = getFileUploaderRequired();
	if (fichiers.length >0) fichiers[0].openFileUploader();
	else goNextPage();
}
function demarcheE11(){
}
function demarcheE12(){
	getRecap ('diaic');
	clickButtonByText ('Envoyer votre demande');
}
function demarcheE13(){
	var uploaderOpened = openFileUploaderRequired();
	if (uploaderOpened) uploaderOpened = openFileUploaderRequired();
	else{}
	setTimeout (function(){
		fillInputByLabel ('');
	}, 500);
	document.getElementById ('').clickOn();
	fillInputByLabel ('');
	fillInputByField ('', '');
	setTimeout (function(){}, 500);
	document.body.addBlurListener ('', '', function (event){});
	fichiers[0].onchange = function(){}
	goNextPage();
}

if (document.body.containsText ('Étape 1 sur 12')) goNextPage();
else if (document.body.containsText ('Étape 2 sur 12')) demarcheE02();
else if (document.body.containsText ('Étape 3 sur 12')) demarcheE03();
else if (document.body.containsText ('Étape 4 sur 12')) demarcheE04();
else if (document.body.containsText ('Étape 5 sur 12')) demarcheE05();
else if (document.body.containsText ('Étape 6 sur 12')) demarcheE06();
else if (document.body.containsText ('Étape 7 sur 12')) demarcheE07();
else if (document.body.containsText ('Étape 8 sur 12')) demarcheE08();
else if (document.body.containsText ('Étape 9 sur 12')) demarcheE09();
else if (document.body.containsText ('Étape 10 sur 12')) demarcheE10();
else if (document.body.containsText ('Étape 11 sur 12')) demarcheE11();
else if (document.body.containsText ('Étape 12 sur 12')) demarcheE12();
else if (document.body.containsText ('a été envoyée')) terminerDemarche();
