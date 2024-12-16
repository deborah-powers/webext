var voletHtml =`<p>titre: $titre</p><p>doctype: $doctype</p><p>lang: $lang</p><p class='legend' id='header'>header</p><p class='legend' id='footer'>footer</p><p class='legend' id='main'>main</p><p class='legend' id='aside'>aside</p><p class='legend' id='nav'>nav</p><p class='legend' id='article'>article</p><p class='legend' id='section'>section</p><p class='legend' id='div'>div</p>
`;
// structure générale de la page
// trouver le titre
const titleList = document.getElementsByTagName ('title');
var monTitre = "";
if (titleList.length ===0) monTitre = 'erreur, pas de balise title dans la page';
else if (titleList.length >1) monTitre = 'erreur, plusieurs balises title dans la page';
else if (titleList[0].innerText ==="" || ' \n\t'.includes (titleList[0].innerText)) monTitre = 'erreur, balise vide';
else monTitre = titleList[0].innerText;
voletHtml = voletHtml.replace ('$titre', monTitre);
// le doctype
monTitre = 'présent';
if (document.doctype === null || document.doctype === undefined) monTitre = 'erreur, pas de doctype';
else if (document.doctype.publicId !== null && document.doctype.publicId !== undefined && document.doctype.publicId !=="" && ! ' \n\t'.includes (document.doctype.publicId))
	monTitre = document.doctype.publicId;
voletHtml = voletHtml.replace ('$doctype', monTitre);
// la langue
monTitre = 'erreur, la langue doit être précisée dans la balise html';
if (document.documentElement.lang !=="") monTitre = document.documentElement.lang +' (lang)';
else if (document.documentElement.attributes['xml:lang'] !== undefined) monTitre = document.documentElement.attributes['xml:lang'].value +' (xml:lang)';
else monTitre = navigator.language;
voletHtml = voletHtml.replace ('$lang', monTitre);
voletRgaa.innerHTML = voletRgaa.innerHTML + voletHtml;

// structure des blocs
const conteneurs =[ 'HEADER', 'FOOTER', 'MAIN', 'ASIDE', 'NAV', 'ARTICLE', 'SECTION', 'DIV' ];
HTMLElement.prototype.conteneurConformeRgaa = function(){
	if (conteneurs.includes (this.tagName) && (this.innerHTML ==="" || this.children.length ===0)) this.classList.add ('rgaa-error');
	if ([ 'HEADER', 'FOOTER' ].includes (this.tagName)){
		for (var c=0; c< this.children.length; c++) if ([ 'HEADER', 'FOOTER' ].includes (this.children[c].tagName)){
			this.classList.add ('rgaa-error');
			this.children[c].classList.add ('rgaa-error');
	}}
	else if (this.tagName === 'MAIN' && ! this.className.includes ('rgaa-error')){
		const mains = document.getElementsByTagName ('main');
		if (mains.length >1){
			var nbVisible =0;
			for (var m=0; m< mains.length; m++){ if (! mains[m].hidden) nbVisible +=1; }
			if (nbVisible >1){ for (var m=0; m< mains.length; m++) mains[m].classList.add ('rgaa-error'); }
	}}
	for (var c=0; c< this.children.length; c++) this.children[c].conteneurConformeRgaa();
}
SVGSVGElement.prototype.conteneurConformeRgaa = function(){ return; }
document.body.conteneurConformeRgaa();