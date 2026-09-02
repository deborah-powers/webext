function habiteFrance(){
	fillInputByLabel ('En France');
	setTimeout (function(){
		fillInputByField ('Quelle est votre adresse postale ?', 'Adresse', '20 place des pradettes');
		fillInputByLabel ('Pays', 'France');
	}, 500);
}
function habiteEtranger(){
	fillInputByLabel ("l'étranger");
	setTimeout (function(){
		fillInputByLabel ('Pays', 'Algerie');
		fillInputByLabel ('Code postal', '1234-567');
		fillInputByLabel ('Ville ou commune', 'Oran');
	}, 500);
}
function demarcheE1(){
	fillInputByLabel ("Quel acte d'état civil souhaitez-vous transcrire", "naissance d'un enfant");
	setTimeout (function(){
		fillInputByLabel ('Sa mère ou son père');
//		fillInputByLabel ('Sa ou son représentant légal');
		setTimeout (function(){
			fillInputByLabel ('Oui');
			setTimeout (function(){
				fillInputByLabel ('De quel consulat français dépend le lieu de naissance', 'Oran');
				setTimeout (function(){
					fillInputByField ('Avez-vous obtenu la liste des justificatifs', 'Oui');
					setTimeout (function(){
						fillInputByLabel ('Numéro de téléphone', '+33678910112');
						habiteFrance();
	}, 500); }, 500); }, 500); }, 500); }, 500);
}
function demarcheE2enfant(){
	fillInputByLabel ("Nom inscrit sur l'acte", 'Guéridon');
	fillInputByField ("Voulez-vous que votre enfant porte ce nom à l'état civil français ?", 'Oui');
	fillInputByLabel ('Prénom 1', 'Bérengère');
	fillInputByLabel ('Date de naissance', '14/04/2019'); // mineure
	fillInputByLabel ('Localité ou ville et pays de naissance', 'Oran');
	fillInputByLabel ('Féminin');
	fillInputByField ("Ses deux parents figurent-ils sur l'acte de naissance", 'Oui');
	setTimeout (function(){
		fillInputByField ('Les parents sont-ils mariés ?', 'Non');
		fillInputByField ("Y a-t-il un acte de reconnaissance", 'Oui');
		fillInputByField ("Les parents ont-ils ensemble d'autres enfants ?", 'Non');
		setTimeout (function(){
			fillInputByLabel ('Date de reconnaissance', '16/04/2019');
			fillInputByLabel ('Pays de reconnaissance', 'Algerie');
			fillInputByLabel ('Localité ou ville de reconnaissance', 'Oran');
	}, 500); }, 500);
}
function demarcheE2parent2(){
	fillInputByLabel ('Nom', 'Bouari');
	fillInputByLabel ("Nom d'usage", 'Guéridon');
	fillInputByLabel ('Prénom', 'Nour');
	fillInputByLabel ('Date de naissance', '15/06/1957');
	fillInputByLabel ('Pays de naissance', 'Algerie');
	fillInputByLabel ('Localité ou ville de naissance', 'Alger');
}
function demarcheE4(){
	fillInputByLabel ("certifie sur l'honneur l'exactitude des informations fournies");
	getRecap ('trancription');
	clickButtonByText ('Envoyer votre demande');
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
if (document.body.innerText.includes ('Étape 1 sur 4')) demarcheE1();
else if (document.body.innerText.includes ('Étape 2 sur 4')){
	if (document.body.containsText ("Quel est le nom de l'enfant sur l'acte de naissance étranger ?")) demarcheE2enfant();
	else if (document.body.containsText ("Le parent 1 de l'enfant")) goNextPage();
	else if (document.body.containsText ("Le parent 2 de l'enfant")) demarcheE2parent2();
}
else if (document.body.containsText ('Étape 4 sur 4')) demarcheE4();
else if (document.body.containsText ('a été envoyée')) terminerDemarcheLegacy();

