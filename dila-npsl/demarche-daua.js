function traiterE1(){}
function traiterLieu(){
	document.body.addBlurListener ('Code postal de la commune', 'Arpajon (9129', function (event){
		document.body.addBlurListener ('Adresse', '11 Avenue Aristide Briand 91290', function (event){
			fillInputByLabel ('Préfixe', '000');
			fillInputByLabel ('Section', 'AK');
			fillInputByLabel ('N° de parcelle', '0238');
			fillInputByLabel ('Surface', '300');
}); }); }
function traiterType(){
	fillInputByLabel ('Mode guidé');
}


if (document.body.innerText.includes ('Avant de commencer')) goNextPage();
else if (document.body.innerText.includes ('Lieu des travaux')) traiterLieu();
else if (document.body.innerText.includes ('Type de travaux')) traiterType();

else if (document.body.innerText.includes (' travaux')) traiter();
else if (document.body.innerText.includes ('Étape 10 sur 10')) getRecap ('daua');
