function demarcheE2(){
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
function demarcheE3(){ fillInputByLabel ('Adresse', '10 route de labiec 43210'); }
function demarcheE4(){
	fillInputByField ("Connaissez-vous le numéro d'AIOT", 'Oui');
	fillInputByField ('Connaissez-vous le service de contrôle ICPE', 'Oui');
	fillInputByLabel ('Déclaration');
	fillInputByField ('Souhaitez-vous ajouter une ou plusieurs rubriques ICPE impliquée', 'Oui');
	setTimeout (function(){
		fillInputByLabel ("Numéro AIOT de l'installation", '0012345678');
		fillInputByLabel ('DDETSPP');
		clickButtonByText ('Ajouter une rubrique');
		setTimeout (function(){
			fillInputByLabel ('Rubrique', 'elevage de coléo');
	}, 500); }, 500);
}
function demarcheE5(){
	fillInputByLabel ('Chargement ou déchargement de matières dangereuses par camion');
	goNextPage();
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
	goNextPage();
}

if (document.body.containsText ('Étape 1 sur 12')) goNextPage();
else if (document.body.containsText ('Étape 2 sur 12')) demarcheE2();
else if (document.body.containsText ('Étape 3 sur 12')) demarcheE3();
else if (document.body.containsText ('Étape 4 sur 12')) demarcheE4();
else if (document.body.containsText ('Étape 5 sur 12')) demarcheE5();
