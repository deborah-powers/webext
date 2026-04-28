function adaptInput (event){
	log ('adaptInput', event.target);
	const alerte = document.getElementsByClassName ('fr-alert')[0];
	alerte.setAttribute ('role', 'alert');
	log (alerte);
}
function actionHelp(){
	const radioButtons = getRadioButtons();
	for (var [key, value] of Object.entries (radioButtons)){
		for (var button of value){
			button.addEventListener ('mousedown', adaptInput);
		}
}}
setTimeout (actionHelp, 2000);