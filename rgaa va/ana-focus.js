/* ce script masque le signalement originale du focus.
il permet de suivre le parcour du focus.
il faut compléter l'analyse en rechargeant la page, y compris pour repérer les éléments focusables masqués.
il faut faire une recherche au clavier pour les trouver
*/
function setFocus (event){ event.target.focus(); }
Element.prototype.showFocusable = function(){
	if (this.tabIndex >=0){
		this.classList.add ('rgaa-focusable');
		if (this.tabIndex >0){
			const borderWidth = 4+ 4* this.tabIndex;
			this.style.borderWidth = borderWidth.toString() + 'px';
		}
		this.addEventListener ('mouseover', setFocus);
}}
HTMLElement.prototype.showFocusable = function(){
	Element.prototype.showFocusable.call (this);
	for (var c=0; c< this.children.length; c++) this.children[c].showFocusable();
}
document.body.showFocusable();