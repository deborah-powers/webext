function goNextPage(){
	const buttonNext = document.getElementById ('btn-next');
	buttonNext.click();
}
function validate(){
	const buttonValider = document.body.findByInnerText ('Valider');
	buttonValider.addEventListener ('click', function (event){});
}
function pageParents (nomPere, prenomPere, nomMere, prenomMere){
	if (document.body.innerText.includes ('parent 1 ?')){
		var personne = document.body.findByInnerText ('parent 1 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Père');
		personne.fillInputByLabel ('Nom', nomPere.capitalize());
		personne.fillInputByLabel ('Prénom', prenomPere.capitalize());
		personne = document.body.findByInnerText ('parent 2 ?').parentElement;
		personne = personne.findContainer ('fieldset');
		personne.fillInputByLabel ('Mère');
		personne.fillInputByLabel ('Nom', nomMere.capitalize());
		personne.fillInputByLabel ('Prénom', prenomMere.capitalize());
}}