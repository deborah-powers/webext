var voletHtml =`<p>titre: $titre</p><p>doctype: $doctype</p><p>lang: $lang</p><p class='legend'>éléments vides</p><p class='legend'>éléments interdits</p>`;
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
voletHtml = voletHtml.replace ('$lang', monTitre);
voletRgaa.innerHTML = voletHtml;

// éléments vides
function removeHighlight(){
	var toUnlight = document.getElementsByClassName ('rgaa-error');
	for (var h= toUnlight.length -1; h>=0; h--) toUnlight[h].classList.remove ('rgaa-error');
	toUnlight = document.getElementsByClassName ('rgaa-highlight');
	for (var h= toUnlight.length -1; h>=0; h--) toUnlight[h].classList.remove ('rgaa-highlight');
}
HTMLImageElement.prototype.isEmpty = function(){ if (this.src ==="") this.className.add ('rgaa-highlight'); }
HTMLAreaElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.className.add ('rgaa-highlight'); }
SVGSVGElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.className.add ('rgaa-highlight'); }
HTMLCanvasElement.prototype.isEmpty = function(){ if (this.innerHTML ==="") this.className.add ('rgaa-highlight'); }
HTMLObjectElement.prototype.isEmpty = function(){ if (this.innerHTML ==="" && this.src ==="") this.className.add ('rgaa-highlight'); }
HTMLInputElement.prototype.isEmpty = function(){ if (this.type === 'image' && this.src ==="") this.className.add ('rgaa-highlight'); }
HTMLOListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-highlight');
	else if (this.children.length ===0) this.classList.add ('rgaa-highlight');
	for (var c=0; c< this.children.length; c++){
		if (![ 'LI', 'OL', 'UL' ].includes (this.children[c].tagName)){
			this.children[c].classList.add ('rgaa-highlight');
			this.children[c].classList.add ('rgaa-error');
		}
		else this.children[c].isEmpty();
}}
HTMLUListElement.prototype.isEmpty = function(){
	if (this.innerHTML ==="") this.classList.add ('rgaa-highlight');
	else if (this.children.length ===0) this.classList.add ('rgaa-highlight');
	for (var c=0; c< this.children.length; c++){
		if (![ 'LI', 'OL', 'UL' ].includes (this.children[c].tagName)){
			this.children[c].classList.add ('rgaa-highlight');
			this.children[c].classList.add ('rgaa-error');
		}
		else this.children[c].isEmpty();
}}
HTMLElement.prototype.isEmpty = function(){
	if (! 'BR HR'.includes (this.tagName)){
		if (this.innerHTML ===""){
			this.classList.add ('rgaa-highlight');
		//	this.innerHTML = this.tagName + ' vide';
		}
		else if (this.innerText ==="" && ! this.innerHTML.includes ('<img') && ! this.innerHTML.includes ('<svg') && ! this.innerHTML.includes ('<canvas')){
			this.classList.add ('rgaa-highlight');
		//	this.innerHTML = this.tagName + ' invisible '+ this.innerHTML;
		}
		else if ([ 'DIV', 'SECTION', 'ARTICLE', 'NAV', 'DL' ].includes (this.tagName) && this.children.length ===0){
			this.classList.add ('rgaa-highlight');
		//	this.innerHTML = this.tagName + ' paragraphe: '+ this.innerHTML;
		}
		for (var c=0; c< this.children.length; c++) this.children[c].isEmpty();
}}
var elementVide = voletRgaa.getElementsByClassName ('legend')[0];
elementVide.addEventListener ('click', function (event){ removeHighlight(); document.body.isEmpty(); });

// les éléments interdits
const elementsInterdits =[ 'basefont', 'big', 'blink', 'center', 'font', 'marquee', 's', 'strike', 'tt' ];
elementVide = voletRgaa.getElementsByClassName ('legend')[1];


// structure des blocs
const conteneurs =[ 'header', 'main', 'footer', 'aside', 'nav', 'article', 'section', 'div', 'ol', 'ul', 'dl' ];

function verifierConteneur (tagName){
	const toHighlight = document.getElementsByTagName (tagName);
	var erreurs = false;
	if (toHighlight.length >0){
		const etiquetteConteneur = document.createElement ('p');
		etiquetteConteneur.className = 'legend';
		etiquetteConteneur.innerHTML = tagName +': '+ toHighlight.length;
		etiquetteConteneur.addEventListener ('click', function (event){
			removeHighlight();
			for (var h=0; h< toHighlight.length; h++) toHighlight[h].classList.add ('rgaa-highlight');
			// règles de gestion associées aux balises
			if (toHighlight.length >1){
				if (tagName === 'main'){
					var nbVisible =0;
					for (var h=0; h< toHighlight.length; h++){ if (! toHighlight[h].hidden) nbVisible +=1; }
						if (nbVisible >1){ for (var h=0; h< toHighlight.length; h++) toHighlight[h].classList.add ('rgaa-error'); }
				}
				else if ([ 'header', 'footer' ].includes (tagName)){
					for (var h=0; h< toHighlight.length; h++) if ([ 'HEADER', 'FOOTER' ].includes (toHighlight[h].parentElement.tagName)){
							toHighlight[h].classList.add ('rgaa-error');
				}}
			}
			if ([ 'ol', 'ul' ].includes (tagName)){
				for (var h=0; h< toHighlight.length; h++)
					for (var c=0; c< toHighlight[h].children.length; c++){
						if (![ 'LI', 'OL', 'UL' ].includes (toHighlight[h].children[c].tagName))
							toHighlight[h].children[c].classList.add ('rgaa-error');
			}}
		});
		voletRgaa.appendChild (etiquetteConteneur);
}}
for (var c=0; c< conteneurs.length; c++) verifierConteneur (conteneurs[c]);
