function demarcheE1(){
	fillInputByLabel ("Je m'engage à ce que les fichiers déposés");
	fillInputByLabel ("Je m'engage à ne déposer aucune pièce");
	fillInputByLabel ('Je prends note que tous les plans réglementaires');
	fillInputByLabel ('En initiant le dépôt de mon dossier via la téléprocédure');
	var block = document.body.findByInnerText ("Je connais mon numéro d'AIOT");
	block = block.findContainer ('fieldset');
	block.fillInputByLabel ('Oui');
	block = document.body.findByInnerText ("Connaissez-vous le service instructeur coordonnateur en charge de votre dossier ?");
	block = block.parentElement.parentElement;
	block.fillInputByLabel ('Oui');
	setTimeout (function(){
		fillInputByLabel ("Numéro d'AIOT", '0040987214');
		fillInputByLabel ('La D(R)EAL, la DRIEAT ou la DGTM');
	}, 500);
}
function demarcheE2(){
	if (! document.body.innerText.includes ('Quelle est votre date de naissance ?')){
		fillInputByLabel ('Oui');
		setTimeout (function(){
			fillInputByLabel ('Une personne physique');
			setTimeout (function(){
				fillInputByLabel ('En France');
				setTimeout (function(){
					fillInputByLabel ("Dans l'hypothèse où ces données seraient mises");
					var block = document.body.findByInnerText ('Quel est votre sexe ?');
					block = block.findContainer ('fieldset');
					block.fillInputByLabel ('Masculin');
					fillInputByLabel ('Quelle est votre date de naissance ?', '1959-06-15');
					fillInputByLabel ('Siret', '13000918600011');
				}, 500); }, 500); }, 500);
	}
	else{
		const block = document.body.findByInnerText ('Pré-remplir');
		block.click();
		setTimeout (function(){
			fillInputByLabel ('Nom', 'Guéridon');
			fillInputByLabel ('Prénom', 'Bertrand');
			document.body.addBlurListener ('Téléphone portable', '0678910112', function (event){
				setTimeout (function(){
					fillInputByLabel ('Adresse électronique', 'moi@gmail.com');
					var block = document.body.findByInnerText ("Est-ce que l'adresse électronique d'échange");
					block = block.findContainer ('fieldset');
					block.fillInputByLabel ('Oui');
		}, 500); }); }, 2500);
}}
function demarcheE3(){
	fillInputByLabel ('Quel est le nom de votre projet ?', 'test sian');
	var inputs = document.body.findHomonymInputs ('Non');
	for (var ip of inputs) ip.clickOn();
	inputs = getFileUploader();
	inputs[0].openFileUploader();
	inputs[1].openFileUploader();
	inputs[3].openFileUploader();
}
function demarcheE4(){
	document.body.addBlurListener ('Quelle est votre adresse ?', '2 Allée Colette Cosnier 35000', function (event){
		fillInputByLabel ('Localité / Code postal', 'CESSON SEVIGNE');
		fillInputByLabel ('Préfixe', '000');
		fillInputByLabel ('Section', 'AK');
		fillInputByLabel ('N° de parcelle', '0238');
		const inputs = getFileUploader();
		inputs[0].openFileUploader();
}); }
function demarcheE5(){
	if (! document.body.innerText.includes ('Rubrique n° 2')){
		document.body.fillInputByField ("La demande est-elle une régularisation d'activité ?", 'Oui', null);
		document.body.fillInputByField ("Une ou des rubriques IOTA (Loi sur l'eau) sont-elles connexes aux activités", 'Oui', null);
		setTimeout (function(){ fillInputByLabel ('Une ou des rubriques autorisation IOTA'); }, 500);
		document.body.addClickListener ('Ajouterune rubrique', function (event){
			if (! document.body.innerText.includes ('Rubrique n° 1')) setTimeout (function(){
				document.body.addBlurListener ('Rubrique', 'Prélèvement dans un système aq', function (event){
					clickButtonByText ('Sélectionner');
					setTimeout (function (){
						fillInputByLabel ('Quantité totale susceptible', '500');
						fillInputByLabel ('Quantité ajoutée ou retirée', '200');
			}, 500); }); }, 500);
			else setTimeout (function(){
				document.body.addBlurListener ('Rubrique', 'Elevage de chiens', function (event){
					const buttons = document.body.findListByInnerText ('Sélectionner');
					buttons[1].click();
					setTimeout (function (){
						fillInputByLabel ('Quantité totale', '100');
						fillInputByLabel ('Quantité ajoutée ou retirée', '60');
			}, 500); }); }, 500);
		});
		clickButtonByText ('Ajouterune rubrique');
	}
	else fillInputByLabel ('Rubrique systématique 1', '8° Aérodromes');
}
function demarcheE6(){
	var inputs = document.body.findHomonymInputs ('Non');
	for (var ip of inputs) ip.clickOn();
	inputs = getFileUploader();
	inputs[0].openFileUploader();
}
function demarcheE7(){
	var inputs = document.body.findHomonymInputs ('Non');
	for (var ip of inputs) ip.clickOn();
	fillInputByLabel ('Un projet sur un site existant');
	inputs = getFileUploader();
	inputs[0].openFileUploader();
}
function demarcheE8(){
	var inputs = getFileUploader();
	inputs[0].openFileUploader();
	inputs[1].openFileUploader();
	inputs[2].openFileUploader();
}
if (document.body.innerText.includes ('Étape 1 sur 9')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 9')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur 9')) demarcheE3();
else if (document.body.innerText.includes ('Étape 4 sur 9')) demarcheE4();
else if (document.body.innerText.includes ('Étape 5 sur 9')) demarcheE5();
else if (document.body.innerText.includes ('Étape 6 sur 9')) demarcheE6();
else if (document.body.innerText.includes ('Étape 7 sur 9')) demarcheE7();
else if (document.body.innerText.includes ('Étape 8 sur 9')) demarcheE8();
else if (document.body.innerText.includes ('Étape 9 sur 9')) getRecap ('eicpe');


