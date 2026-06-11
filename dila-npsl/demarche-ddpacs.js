function demarcheE1(){
	if (! document.body.innerText.includes ('nom de la voie')) fillInputByLabel ('Code postal et commune', 'ARPAJON');
	else fillInputByLabel ('nom de la voie', '11 avenue Aristide Briand');
}
function demarcheE2(){
	fillInputByLabel ('Monsieur');
	fillInputByLabel ('Département', 'Ille et Vilaine');
	fillInputByLabel ('Nationalité 1', 'française');
	fillInputByLabel ('Nationalité 2', 'italienne');
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
			fillInputByLabel ('ville de naissance', 'SIENNE');
		//	fillInputByLabel ('ville de naissance', 'CORBEIL ESSONNES');
		//	fillInputByLabel ('Département', 'Essonne');
			fillInputByLabel ('Nationalité 1', 'française');
			fillInputByLabel ('Nationalité 2', 'italienne');
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
	var bloc = document.body.findByInnerText ('nationalité Française').parentElement;
	bloc = bloc.findContainer ('fieldset');
	bloc.fillInputByLabel ("Carte d'identité");
	bloc = document.body.findByInnerText ('nationalité Italienne').parentElement;
	bloc = bloc.findContainer ('fieldset');
	bloc.fillInputByLabel ("Carte d'identité");
	setTimeout (function(){
		var uploaders = document.body.findListByInnerText ('Ajouter un fichier');
		for (var upload of uploaders) upload.click();
		uploaders = getFileUploader();
		for (var upload of uploaders) upload.openFileUploader();
		goNextPage();
	}, 500);
}
if (document.body.innerText.includes ('Étape 1 sur 7')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 7')) demarcheE2();
else if (document.body.innerText.includes ('Étape 3 sur 7')) demarcheE3();
else if (document.body.innerText.includes ('Étape 4 sur 7')) demarcheE4();
else if (document.body.innerText.includes ('Étape 5 sur 7')) demarcheE5();
else if (document.body.innerText.includes ('Étape 6 sur 7')) demarcheE6();
