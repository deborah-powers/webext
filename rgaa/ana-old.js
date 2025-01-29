HTMLAnchorElement.prototype.enSerie = function(){
	var nba =0;
	if (this.tagName === 'A') nba =1;
	if (this.nextElementSibling !== null && this.nextElementSibling.tagName === 'A') nba += this.nextElementSibling.enSerie();
	if (this.previousElementSibling !== null && this.previousElementSibling.tagName === 'A') nba += this.previousElementSibling.enSerie();
	return nba;
}
HTMLAnchorElement.prototype.inListe = function(){
	const nba = this.enSerie();
	if (nba >2) this.parentElement.style.border = 'solid 4px lime';
}
HTMLAnchorElement.prototype.inListe_va = function(){
	if (this.nextElementSibling !== null && this.nextElementSibling.tagName === 'A'){
		if (this.previousElementSibling === null) this.style.border = 'dotted 4px lime';
		else if (this.previousElementSibling.tagName === 'A') this.style.border = 'solid 4px lime';
		else if (this.previousElementSibling.tagName === 'OL' || this.previousElementSibling.tagName === 'UL') this.style.border = 'dashed 4px lime';
		else this.style.border = 'dotted 4px lime';
	}
	else if (this.previousElementSibling !== null && this.previousElementSibling.tagName === 'A'){
		if (this.nextElementSibling === null) this.style.border = 'dotted 4px lime';
		else if (this.nextElementSibling.tagName === 'OL' || this.nextElementSibling.tagName === 'UL') this.style.border = 'dashed 4px lime';
		else this.style.border = 'dotted 4px lime';
	}
}
var titleText = document.body.isTitle();
voletRgaa.innerHTML = titleText;
// liste de a dans une liste
listes = document.getElementsByTagName ('a');
for (var i=0; i< listes.length; i++) listes[i].inListe();

