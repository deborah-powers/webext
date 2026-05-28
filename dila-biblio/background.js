// les pages de connection
function chooseActionOverPage(){
	if (window.location.href.includes ('/service-public/protocol/openid-connect/')){
		const main = document.getElementsByTagName ('main')[0];
		const buttonFranceConnect = main.getElementsByTagName ('a')[2];
		buttonFranceConnect.click();
	}
	else if (window.location.href.includes ('franceconnect.fr/api/v2/interaction/')){
		var form = null;
		if (window.location.href.includes ('/consent')) form = document.getElementsByTagName ('form')[0];	// page de re-connexion
		else form = document.getElementsByTagName ('form')[2];	// page de connexion
		const buttonFranceConnect = form.getElementsByTagName ('button')[0];
		buttonFranceConnect.click();
	}
	else if (window.location.href.includes ('fournisseur-d-identite.fr/interaction/')){
		// les données sont déjà pré-entrées
		setTimeout (function(){
			const main = document.getElementsByTagName ('form')[0];
			const buttonFranceConnect = main.getElementsByTagName ('button')[0];
			buttonFranceConnect.click();
		}, 1000);
}}
// setTimeout (chooseActionOverPage, 1500);

// les pages de npsl
const labelDict ={
	'Nationalité': 'Francaise', 'Situation matrimoniale': 'Célibataire', 'Pays': 'FRANCE',
	"Numéro d'AIOT": '0040987214', 'Numéro de SIRET': '41816609600069',
	'Nom de la personne en charge du dossier': 'Corado',
	'Prénom de la personne en charge du dossier': 'Céline',
	'Code postal / Localité': '35000',
	'Numéro et libellé de voie': '5 rue Jules Rieffel',
	'Téléphone': '0623456789',
	'Adresse e-mail': 'moi@gmail.com', 'Adresse électronique': 'toi@gmail.com',
	'ate de naissance': '2002-06-17',
	'om de votre projet': 'test rgaa sian',
	'Date de dépôt': '2025-06-15',
	"Organisme en charge de l'instruction": 'tma sian'
};
HTMLInputElement.prototype.fillFromDict = function(){
	const label = this.labels[0].children[0].innerText;
	if (labelDict.hasOwnProperty (label)){
		if (this.type === 'date') this.value = labelDict[label];
		else if (this.type === 'text') this.value = labelDict[label].substring (0, labelDict[label].length -1);
	}
	else for (var [key, value] of Object.entries (labelDict)){
		if (label.includes (key)){
			if (this.type === 'date') this.value = labelDict[key];
			else if (this.type === 'text') this.value = labelDict[key].substring (0, labelDict[key].length -1);
}}}
document.body.addEventListener ('click', function (event){
	if (event.target.tagName === 'INPUT') event.target.fillFromDict();
});
/*
const boxToCheck =[ "Je m'engage à", "Je prends note" ];
const inputs = document.getElementsByTagName ('input')
for (var box of inputs) if (box.type === 'checkbox'){
	for (var line of boxToCheck) if (box.labels[0].innerText.includes (line)){ box.checked = True; }
}

const buttonNext = document.getElementById ('btn-next');
if (buttonNext){
	buttonNext.click = function (event){
		log (event);
		setTimeout (chooseActionOverPage, 3000);
}}*/