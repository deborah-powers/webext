function fillInfosSp(){
	if (document.body.containsText ('Code postal / Ville de naissance')){
		fillInputByLabel ('Nom de famille', 'Guéridon');
		fillInputByLabel ('Prénom', 'Bertrand');
		fillInputByLabel ('Masculin');
		fillInputByLabel ('Date de naissance', '19/06/1956');
		fillInputByLabel ('Code postal / Ville de naissance', 'LILLEMER');
		fillInputByLabel ('Pays de naissance', 'franc');
		const descriptions = document.body.findHomonymInputs ('Descriptif du fichier');
		descriptions[0].fillInput ('cni');
		descriptions[1].fillInput ('selfie');
		descriptions[2].fillInput ('quittance');
}}
function demarcheE1(){
	var openFile = openFileUploaderRequired();	// lié à fillInfosSp
	if (openFile === false){
		fillInfosSp();
		fillInputByLabel ('Nationalité', 'français');
		fillInputByLabel ('Situation matrimoniale', 'Célibataire');
		fillInputByLabel ('Profession', 'ADJUDANT');
		fillInputByLabel ('Indicatif', '+33');
		fillInputByLabel ('Numéro de téléphone principal', '123456789');
		fillInputByField ('Adresse de domicile', 'Pays', 'franc');
		fillInputByLabel ('Numéro et libellé de voie', '72 rue Balzac');
		fillInputByLabel ('Code postal / Localité', 'paris 01');
}}
function demarcheE3Paiement(){
	fillInputByLabel ('Mode de paiement utilisé', 'Bitcoins');
	fillInputByLabel ('Montant en euros', '400');
	fillInputByField ('Le paiement a-t-il été débité ?', 'Oui');
	setTimeout (function(){ fillInputByLabel ('Date du paiement', '2026-09-07'); }, 500);
}
function demarcheE4(){
	fillInputByLabel ('Non');
	fillInputByField ('Pour la suite de votre affaire', 'Oui');
	goNextPage();
}
function demarcheE5(){ fillInputByLabel ("Je certifie sur l'honneur"); }
function demarcheRancongicielE2(){
	fillInputByLabel ('Date du blocage', '2026-09-07');
	fillInputByLabel ('Mon ordinateur');
	fillInputByLabel ("Quel est le message affiché à l'écran", "ah ah je t'ai eu");
	fillInputByLabel ('Avant ce blocage, sur quel support étiez-vous ?', 'Sur un autre support');
	fillInputByLabel ('quelle date', '2026-09-07');
}
function demarcheEpaE2(){
	fillInputByLabel ('Date de découverte', '2026-09-07');
	fillInputByLabel ('Comment avez-vous découvert', 'Popup publicitaire');
	fillInputByLabel ('Sur quel site était-elle publiée', 'Amazon.fr');
	fillInputByLabel ('Type de bien', 'Maison');
	fillInputByLabel ('Pays', 'franc');
	fillInputByLabel ('Pseudonyme');
	fillInputByLabel ('Homme');
	fillInputByLabel ('Entre le', '2026-09-05');
	fillInputByLabel ('Et le', '2026-09-07');
	fillInputByLabel ('Résumé des échanges', "il m'a proposé de louer sa villa pendant deux semaines");
	fillInputByField ('Avez-vous transmis des copies de pièces', 'Non');
	fillInputByField ('Avez-vous reçu une ou plusieurs photos du bien', 'Oui');
	fillInputByField ('Avez-vous reçu un courriel ou des documents vous incitant', 'Oui');
	setTimeout (function(){
		fillInputByLabel ('Quel est son pseudonyme ?', 'harthure');
		fillInputByLabel ("Indiquez-nous la nature ou l'objet de ce document", 'un mail me demandant de faire un versement');
		const fichiers = getFileUploader();
		fichiers[0].openFileUploader();
		setTimeout (function(){ fillInputByLabel ('Descriptif du fichier', 'le mail en question') }, 500);
	}, 500);
}
function demarcheEpaE3Pf(){
	fillInputByField ("Vous a-t-on demandé de verser de l'argent ?", 'Oui');
	fillInputByField ("Avez-vous encaissé de l'argent", 'Non');
	setTimeout (function(){ demarcheE3Paiement(); }, 500);
}
function demarcheEpaE3Interlocuteur(){
	fillInputByLabel ('Non');
	goNextPage();
}
function demarcheEasE2(){
	fillInputByLabel ('Homme');
	fillInputByLabel ('Pseudonyme');
	fillInputByLabel ('Entre le', '2026-09-05');
	fillInputByLabel ('Et le', '2026-09-07');
	fillInputByLabel ('Résumé des échanges', "on s'envoyait des sms");
	fillInputByField ("Vous a-t-on demandé de verser de l'argent ?", 'Oui');
	fillInputByField ("Avez-vous encaissé de l'argent", 'Non');
	setTimeout (function(){
		fillInputByLabel ('Quel est son pseudonyme ?', 'harthure');
		fillInputByLabel ("Indiquez-nous la nature ou l'objet de ce document", 'sms');
	}, 500);
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
if (document.body.containsText ('Étape 1 sur 5')){
	if (document.body.containsText ('Avertissement')) goNextPage();
	else if (document.body.containsText ('Mes informations personnelles')) demarcheE1();
}
else if (document.body.containsText ('Étape 2 sur 5')){
	if (document.body.containsText ('escroquerie à la petite annonce')) demarcheEpaE2();
	else if (document.body.containsText ('rançongiciel')) demarcheRancongicielE2();
	else if (document.body.containsText ('escroquerie aux sentiments')) demarcheEasE2();
}
else if (document.body.containsText ('Étape 3 sur 5')){
	if (document.body.containsText ('escroquerie à la petite annonce')){
		if (document.body.containsText ('Préjudice financier')) demarcheEpaE3Pf();
		else demarcheEpaE3Interlocuteur();
	}
	else if (document.body.containsText ('rançongiciel')) demarcheE3Paiement();
}
else if (document.body.containsText ('Étape 4 sur 5')) demarcheE4();
else if (document.body.containsText ('Étape 5 sur 5')) demarcheE5();
else if (document.body.containsText ('a été envoyée')) terminerDemarche();
