/* ce script ne colore pas les éléments focusables masqués.
il faut faire une recherche au clavier pour les trouver
*/
Element.prototype.showFocusable = function(){
	if (this.tabIndex >=0){
		this.classList.add ('rgaa-focusable');
		if (this.tabIndex >0){
			const borderWidth = 4+ 4* this.tabIndex;
			this.style.borderWidth = borderWidth.toString() + 'px';
		}
	}
	for (var c=0; c< this.children.length; c++) this.children[c].showFocusable();
}
document.body.showFocusable();