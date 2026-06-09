function enterParentsData(){
	var personne = document.body.findByInnerText ('Qui est votre parent 1 ?').parentElement;
	personne = personne.findContainer ('fieldset')
	personne.fillInputByLabel ('Nom', 'Guéridon');
	personne.fillInputByLabel ('Prénom', 'Robert');
	personne = document.body.findByInnerText ('Qui est votre parent 2 ?').parentElement;
	personne = personne.findContainer ('fieldset')
	personne.fillInputByLabel ('Nom', 'Bernard');
	personne.fillInputByLabel ('Prénom', 'Andrésine');
}
function demarcheE1(){
	fillInputByLabel ('Commune de', 'ROCHEFOURCHAT');
	fillInputByLabel ('Motif de votre demande', "Demande d'allocation");
	setTimeout (function(){ fillInputByLabel ("Nature de l'allocation", 'APL'); }, 500);
}
function adresseRochefourchat(){
	fillInputByLabel ('Écrire mon adresse');
	setTimeout (function(){
		fillInputByLabel ('Lieu-dit, commune', 'les châteaux');
		fillInputByLabel ('Code postal et commune', 'ROCHEFOURCHAT');
	}, 500);
}
function demarcheE3(){
	if (document.body.innerText.includes ('Je choisis une adresse corrigée')) fillInputByLabel ('11 avenue');
	else{
		fillInputByLabel ('En France');
		setTimeout (function(){
			if (document.body.innerText.includes ('Code postal et commune')){
			//	fillInputByLabel ('nom de la voie', '11 avenue Aristide Briand');
				fillInputByLabel ('Code postal et commune', 'ROCHEFOURCHAT');
				fillInputByLabel ('Lieu-dit', 'les châteaux');
			}
			else adresseRochefourchat();
		//	else fillInputByLabel ('Adresse', '11 avenue Aristide Briand');
			fillInputByLabel ('Téléphone', '0678910112');
		}, 500);
}}
function demarcheMariageE2(){
	fillInputByLabel ('Vous êtes', "Titulaire de l'acte");
	setTimeout (function(){
		fillInputByLabel ('Type de document', 'Extrait avec filiation');
		setTimeout (function(){
			fillInputByLabel ("Nombre d'exemplaires souhaité", '3');
			fillInputByLabel ('Date de mariage', '2025-09-12');
			// le marié
			fillInputByLabel ('Monsieur');
			fillInputByLabel ('Pays de naissance', 'FRANCE');
			fillInputByLabel ('Département de naissance', 'Drôme');
			fillInputByLabel ('Commune de naissance', 'ROCHEFOURCHAT');
			fillInputByLabel ('Nationalité', 'Française');
			enterParentsData();
			// la mariée
			personne = document.body.findByInnerText ("Quelle est l'identité de votre époux ou de votre épouse ?").parentElement;
			personne = personne.findContainer ('fieldset')
			personne.fillInputByLabel ('Madame');
			personne.fillInputByLabel ('Nom', 'Aubegaïa');
			personne.fillInputByLabel ('Prénom', 'Françoise');
			personne.fillInputByLabel ('Date de naissance', '1962-02-15');
			personne.fillInputByLabel ('Pays de naissance', 'FRANCE');
			personne.fillInputByLabel ('Département de naissance', 'Drôme');
			personne.fillInputByLabel ('Commune de naissance', 'ROCHEFOURCHAT');
			personne.fillInputByLabel ('Nationalité', 'Française');
			// ses parents
			personne = document.body.findByInnerText ('Qui est son parent 1 ?').parentElement;
			personne = personne.findContainer ('fieldset')
			personne.fillInputByLabel ('Nom', 'Aubegaïa');
			personne.fillInputByLabel ('Prénom', 'Ferdinand');
			personne = document.body.findByInnerText ('Qui est son parent 2 ?').parentElement;
			personne = personne.findContainer ('fieldset')
			personne.fillInputByLabel ('Nom', 'Toubie');
			personne.fillInputByLabel ('Prénom', 'Elise');
	}, 500); }, 500);
}
function demarcheDecesE2(){
	fillInputByLabel ('Type de document', 'Extrait plurilingue');
	setTimeout (function(){
		fillInputByLabel ("Nombre d'exemplaires souhaité", '3');
		fillInputByLabel ('Date du', '2026-05-12');
		fillInputByLabel ('Madame');
		fillInputByLabel ('Nom', 'Bernard');
		fillInputByLabel ('Prénom', 'Andrésine');
	}, 500);
}
function demarcheDecesE3(){
	fillInputByLabel ('Monsieur');
	demarcheE3();
}
function demarcheNaissanceE2(){
	fillInputByLabel ('Vous êtes', "Titulaire de l'acte");
	setTimeout (function(){
		fillInputByLabel ('Type de document', 'Extrait avec filiation');
		setTimeout (function(){
			fillInputByLabel ("Nombre d'exemplaires souhaité", '3');
			fillInputByLabel ('Monsieur');
			enterParentsData();
		}, 500); }, 500);
}
function demarcheNaissanceE3(){
	demarcheE3();
	setTimeout (function(){
		fillInputByLabel ('commune déléguée', 'les châteaux');
	}, 500);
}
if (document.body.innerText.includes ('Étape 1 sur 4')) demarcheE1();
if (document.body.innerText.includes ('acte de mariage')){
	if (document.body.innerText.includes ('Étape 2 sur 4')) demarcheMariageE2();
	else if (document.body.innerText.includes ('Étape 3 sur 4')) demarcheE3();
}
else if (document.body.innerText.includes ('acte de décès')){
	if (document.body.innerText.includes ('Étape 2 sur 4')) demarcheDecesE2();
	else if (document.body.innerText.includes ('Étape 3 sur 4')) demarcheDecesE3();
}
else if (document.body.innerText.includes ('acte de naissance')){
	if (document.body.innerText.includes ('Étape 2 sur 4')) demarcheNaissanceE2();
	else if (document.body.innerText.includes ('Étape 3 sur 4')) demarcheNaissanceE3();
}
else if (document.body.innerText.includes ('Vérification et envoi')){
	fillInputByLabel ("sur l’honneur");
	fillInputByLabel ("sur l'honneur");
}

