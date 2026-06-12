function demarcheE1(){
	if (! document.body.innerText.includes ('nom de la voie')) fillInputByLabel ('Code postal et commune', 'ARPAJON');
	else fillInputByLabel ('nom de la voie', '11 avenue Aristide Briand');
}
function demarcheE2(){
	fillInputByLabel ('Monsieur');
	fillInputByLabel ('Département', 'Ille et Vilaine');
	fillInputByLabel ('Nationalité 1', 'française');
//	fillInputByLabel ('Nationalité 2', 'italienne');
	fillInputByLabel ('Célibataire');
	fillInputByLabel ('Non');
	fillInputByLabel ('Votre adresse de résidence commune');
}
function demarcheE3(){
	if (document.body.innerText.includes ('Qui est votre partenaire')){
		fillInputByLabel ('Madame');
		fillInputByLabel ('Nom', 'Gucci');
		fillInputByLabel ('Prénom 1', 'Sylvia');
		fillInputByLabel ('Date de naissance', '12/02/1962');
		const pays = document.body.findInputByLabel ('Pays de naissance');
	//	pays.fillInput ('FRANCE');
		pays.fillInput ('ITALIE');
		pays.addEventListener ('blur', function (event){
			if (event.target.value === 'FRANCE'){
				fillInputByLabel ('ville de naissance', 'CORBEIL ESSONNES');
				fillInputByLabel ('Département', 'Essonne');
				fillInputByLabel ('Nationalité 1', 'française');
			}
			else if (event.target.value === 'ITALIE'){
				fillInputByLabel ('ville de naissance', 'Sienne');
				const immigration = document.body.findInputByLabel ('Nationalité 1');
				immigration.fillInput ('italienne');
				immigration.addEventListener ('blur', function (event){
					var immigration = document.body.findByInnerText ("Votre partenaire est-il sous la protection de l'Ofpra");
					immigration = immigration.findContainer ('fieldset');
					immigration.fillInputByLabel ('Non');
					immigration = document.body.findByInnerText ('Votre partenaire est-il en France depuis plus de 1 an ?');
					immigration = immigration.findContainer ('fieldset');
					immigration.fillInputByLabel ('Oui');
			});}
			fillInputByLabel ('Célibataire');
			fillInputByLabel ('Non');
			fillInputByLabel ('Votre adresse de résidence commune');
			fillInputByLabel ('Adresse e-mail', 'nom@exemple.com');
	});}
	else if (document.body.innerText.includes ('Qui est son parent 1')){
		var personne = document.body.findByInnerText ('Qui est son parent 1 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Père');
		personne.fillInputByLabel ('Nom', 'Gucci');
		personne.fillInputByLabel ('Prénom', 'Roberto');
		personne = document.body.findByInnerText ('Qui est son parent 2 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Mère');
		personne.fillInputByLabel ('Nom', 'Hermes');
		personne.fillInputByLabel ('Prénom', 'Julie');
}}
function demarcheE4(){
	if (document.body.innerText.includes ('Quelle convention de Pacs, votre partenaire et vous, choisissez-vous ?')){
		fillInputByLabel ('La convention type');
		setTimeout (function(){
			fillInputByLabel ('Proportionnelle');
			fillInputByLabel ('Indivision');
			goNextPage();
		}, 500); }
	else if (document.body.innerText.includes ('ous pouvez relire maintenant votre convention')) goNextPage();
}
function demarcheE5(){
	fillInputByLabel ('que notre commune');
	fillInputByLabel ('ntre nous aucun lien de parenté');
	goNextPage();
}
function demarcheE6(){
	const identites = document.body.findHomonymInputs ("Carte d'identité");
	for (var idtt of identites) idtt.clickOn();
	setTimeout (function(){
		const uploaders = document.body.findListByInnerText ('Ajouter un fichier');
		log (uploaders.length, 'uploaders');
		for (var upload of uploaders) upload.parentElement.click();
		setTimeout (function(){
			const uploaders = getFileUploader();
			log (uploaders.length, 'uploaders');
			for (var upload of uploaders) upload.openFileUploader();
			goNextPage();
	}, 500); }, 500);
}
if (document.body.innerText.includes ('Étape 1 sur 7')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 7')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur 7')) demarcheE3();
else if (document.body.innerText.includes ('Étape 4 sur 7')) demarcheE4();
else if (document.body.innerText.includes ('Étape 5 sur 7')) demarcheE5();
else if (document.body.innerText.includes ('Étape 6 sur 7')) demarcheE6();
