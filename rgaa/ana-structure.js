var voletHtml =`<p>titre: $titre</p><p>doctype: $doctype</p><p>lang: $lang</p><p class='legend'>header</p><p class='legend'>footer</p><p class='legend'>main</p><p class='legend'>nav</p><p class='legend'>aside</p><p class='legend'>article</p><p class='legend'>section</p><p class='legend'>div</p><p class='legend'>ol, ul, dl</p>
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
voletHtml = voletHtml.replace ('$lang', monTitre);

// structure des blocs
voletRgaa.innerHTML = voletHtml;
var blocLang = document.body.getByAttribute ('lang');
for (var i=0; i< blocLang.length; i++) blocLang[i].addAll();

