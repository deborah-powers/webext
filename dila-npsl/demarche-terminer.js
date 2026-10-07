function terminerDemarche(){
	var linkDownload = document.body.findByInnerText ('Télécharger votre récapitulatif');
	linkDownload = linkDownload.findContainer ('a');
	linkDownload.click();
	if (document.body.containsText ('Télécharger le flux')){
		linkDownload = document.body.findByInnerText ('Télécharger le flux');
		linkDownload = linkDownload.findContainer ('a');
		linkDownload.click();
		setTimeout (function(){ clickButtonByText ('Terminer'); }, 500);
}}
function terminerDemarcheLegacy(){
	const linkDownload = document.getElementById ('confirmationTelechargement_btn_cofirmationPaseport');
	linkDownload.click();
	clickButtonByText ('Terminer');
}
if (window.location.search.includes ('codeDemarche=')) terminerDemarche();
else terminerDemarcheLegacy();