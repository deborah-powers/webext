var voletHtml =`<p>titre: $titre</p><p>doctype: $doctype</p><p>lang: $lang</p>`;

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
var blocLang = document.getByAttribute ('lang');
console.log (blocLang);
for (var i=0; i< blocLang.length; i++) blocLang[i].addAll();

voletRgaa.innerHTML = voletHtml;
