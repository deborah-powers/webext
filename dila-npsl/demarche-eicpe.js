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
					block = document.body.findByInnerText ('Pré-remplir');
					block.addEventListener ('click', function(){
						setTimeout (function(){
							fillInputByLabel ('Nom', 'Guéridon');
							fillInputByLabel ('Prénom', 'Bertrand');
		}, 1500); }); }, 500); }, 500); }, 500);
	}
	else if (false){
		const block = document.body.findByInnerText ('Pré-remplir');
		block.click();
		setTimeout (function(){
			fillInputByLabel ('Nom', 'Guéridon');
			fillInputByLabel ('Prénom', 'Bertrand');
			const input = document.body.findInputByLabel ('Téléphone portable');
			input.fillInput ('0678910112');
			input.addEventListener ('blur', function (event){
				setTimeout (function(){
					fillInputByLabel ('Adresse électronique', 'moi@gmail.com');
					var block = document.body.findByInnerText ("Est-ce que l'adresse électronique d'échange");
					block = block.findContainer ('fieldset');
					block.fillInputByLabel ('Oui');
			}, 500); }); }, 1000);
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
	const input = document.getElementById ('idSaisie57');
	input.fillInput ('2 Allée Colette Cosnier 35000 Rennes');
//	fillInputByLabel ('Quel est votre adresse ?', '2 Allée Colette Cosnier 35000 Rennes');
	setTimeout (function(){
		const inputs = getFileUploader();
		console.log (inputs);
		inputs[0].openFileUploader();
	}, 500);
}
if (document.body.innerText.includes ('Étape 1 sur 9')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 9')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur 9')) demarcheE3();
else if (document.body.innerText.includes ('Étape 4 sur 9')) demarcheE4();

