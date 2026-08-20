function demarcheE1(){
	// ARPAJON est une commune reliée
	document.body.addBlurListener ('Code postal et commune', 'ROCHEFOURCHAT', function (event){
		fillInputByLabel ("La commune où habite l'un des futurs mariés");
		fillInputByLabel ('Date souhaitée pour le mariage', '2026-09-19');
});}
HTMLElement.prototype.setInfoTemoin = function (nom, prenom, metier, adresse){
	this.fillInputByLabel ('Nom', nom.capitalize());
	this.fillInputByLabel ('Prénom', prenom.capitalize());
	this.fillInputByLabel ('Activité ou profession', metier);
	this.fillInputByLabel ('En France');
	setTimeout (function(){ this.fillInputByLabel ('Numéro et nom de la voie', adresse); }, 500);
}
HTMLElement.prototype.setInfoPersonne = function (metier, adresse){
	this.fillInputByLabel ('Nationalité', 'française');
	this.fillInputByLabel ('Activité ou profession', metier);
	this.fillInputByLabel ('Célibataire');
	this.fillInputByField ('sous tutelle', 'Non');
	this.fillInputByField ('locataire ou propriétaire', 'Oui');
	this.fillInputByLabel ('En France');
	setTimeout (function(){ this.fillInputByLabel ('Numéro et nom de la voie', adresse); }, 500);
}
HTMLElement.prototype.setInfoParent = function (nom, prenom, metier, adresse){
	this.fillInputByLabel ('Nom', nom.capitalize());
	this.fillInputByLabel ('Prénom', prenom.capitalize());
	this.fillInputByField ('est-il décédé ?', 'Non');
	const self = this;
	setTimeout (function(){
		console.log (self);
		self.fillInputByLabel ('Quelle est son activité', metier);
		self.fillInputByLabel ('En France');
		setTimeout (function(){ self.fillInputByLabel ('Adresse', adresse); }, 500);
}, 500); }
function demarcheE2(){
	if (document.body.containsText ('Qui êtes-vous ?')) document.body.setInfoPersonne ('ingénieur', '20 Rue du lapin');
	else if (document.body.innerText.includes ('Qui est votre parent 1')){
		var parent1 = document.body.findByInnerText ('parent 1 ?').parentElement;
		parent1 = parent1.findContainer ('fieldset');
		parent1.setInfoParent ('gueridon', 'robert', 'artisan', '20 Rue Lecourbe');
		setTimeout (function(){
			var parent2 = document.body.findByInnerText ('parent 2 ?').parentElement;
			parent2 = parent2.findContainer ('fieldset');
			parent2.setInfoParent ('durand', 'andrésine', 'couturière', '20 Rue Lecourbe');
		}, 1500);
		fillInputByField ("Avez-vous fait l'objet d'une adoption simple", 'Non');
}}
function demarcheE3(){
	if (document.body.innerText.includes ('Qui est votre futur époux')){
		fillInputByLabel ('Nom', 'Gucci');
		fillInputByLabel ('Prénom 1', 'Sylvia');
		fillInputByLabel ('Date de naissance', '12/02/1962');
		const pays = document.body.findInputByLabel ('Pays de naissance');
		pays.fillInput ('FRANCE');
		pays.addEventListener ('blur', function (event){
			fillInputByLabel ('ville de naissance', 'trevoux');
			document.body.setInfoPersonne ('institutrice', '20 Rue du lapin');
			fillInputByLabel ('Adresse', '20 Rue du lapin');
			fillInputByLabel ('Adresse e-mail', 'gucci@gmail.com');
	});}
	else if (document.body.innerText.includes ('Qui est son parent 1')){
		var parent1 = document.body.findByInnerText ('parent 1 ?').parentElement;
		parent1 = parent1.findContainer ('fieldset');
		parent1.setInfoParent ('romanco', 'robert', 'artisan', '23 Rue Lecourbe');
		setTimeout (function(){
			var parent2 = document.body.findByInnerText ('parent 2 ?').parentElement;
			parent2 = parent2.findContainer ('fieldset');
			parent2.setInfoParent ('durand', 'anette', 'couturière', '24 Rue Lecourbe');
		}, 1500);
		fillInputByField ("fait l'objet d'une adoption simple", 'Non');
}}
function demarcheE4(){
	fillInputByLabel ("attestons sur l'honneur qu'il n'existe entre nous aucun lien de parenté");
	fillInputByField ('Souhaitez-vous établir un contrat de mariage', 'Non');
	fillInputByField ('Avez-vous des enfants', 'Non');
	goNextPage();
}
function demarcheE5(){
	var parent1 = document.body.findByInnerText ('Qui est votre témoin 1').parentElement;
	parent1 = parent1.findContainer ('fieldset');
	parent1.setInfoTemoin ('romanco', 'lydia', 'artisan', '23 Rue Lecourbe');
	setTimeout (function(){
		var parent2 = document.body.findByInnerText ('Qui est votre témoin 2').parentElement;
		parent2 = parent2.findContainer ('fieldset');
		parent2.setInfoTemoin ('durand', 'valentin', 'ingénieur', '24 Rue Lecourbe');
	}, 1500);
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
function demarcheE6(){
	// TODO à adapter
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
else if (document.body.innerText.includes ('Étape 7 sur 7')) getRecap ('ddmariage');
