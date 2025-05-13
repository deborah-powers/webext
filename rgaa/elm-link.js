/* dépend de encart.js, de ana-common.js et de ana-name.js
prendre en compte la valeur des pseudo-classes :before et :after
*/
HTMLElement.prototype.addInfos = function(){
	this.infos = this.compareNames();
	this.setAttribute ('infos', this.infos.replaceAll ('<br/>', '\n'));	// utiliser le sélecteur css before au lieu de la modale js
	if (this.infos.includes ('erreur:')){
		this.classList.add ('rgaa-error');
		this.label = 'erreur';
	}
	else this.label = 'ok';
}
var links = document.getElementsByTagName ('a');
for (var i=0; i< links.length; i++) links[i].addAll();
links = document.body.getAllByRole ('link');
for (var i=0; i< links.length; i++) links[i].addAll();
