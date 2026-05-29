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
document.body.addEventListener ('click', function (event){
	if (event.target.tagName === 'INPUT') event.target.fillFromDict();
	else if (event.target.tagName === 'SELECT'){
		const label = this.labels[0].children[0];
		event.target.fillFromDict (label);
}});
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