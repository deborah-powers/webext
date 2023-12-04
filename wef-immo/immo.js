var agence ="";
var numero ="";
var ref ="";
var prix ="";
var coutTotal ="";
var tf = "";
var coutEnnergie ="";
var charges = "";
var surface ="";
var etage = '? / ?';
var cave = "";
var nbCoproprio ="";
var ville ="";
var quartier ="";
var url = window.location.href;

// https://www.seloger.com/annonces/achat/appartement/rueil-malmaison-92/plateau-mont-valerien/207723151.htm
if (window.location.href.includes ('https://www.seloger.com/annonces/achat/appartement/')){
	var containerTmp = document.body.findTagList ('phone-button');
	console.dir (containerTmp);
	document.body.innerHTML = document.getElementById ('__next').innerHTML;
	// la référence
	var d=4+ document.body.innerHTML.indexOf ('ef. ');
	var f= document.body.innerHTML.indexOf ('<', d);
	ref = document.body.innerHTML.substring (d,f);
	// le numéro de l'agence
	var containerTmp = document.body.findTagList ('phone-button');
	console.dir (containerTmp);
	/*
	if (exists (containerTmp)) numero = containerTmp.innerText;
	// préparation
	document.body.findTagReplace ('main');
	document.body.findTagReplace ('pages__CWrap-sc-jd4nxp-1');
	document.body.innerHTML = document.body.children[0].innerHTML;
	document.body.delAttribute();
	// le prix
	containerTmp = document.body.getElementsByClassName ('Summarystyled__ShowcaseSummaryContainer-sc-1u9xobv-0')[0];
	prix = containerTmp.children[1].innerText;
	containerTmp = containerTmp.children[0].children[1];
	surface = containerTmp.children[2].innerText;
	etage = containerTmp.children[3].innerText;
	// la ville
	containerTmp = document.body.getElementsByClassName ('Localizationstyled__Title-sc-gdkcr2-0')[0];
	ville = containerTmp.children[1].innerText;
	quartier = containerTmp.children[0].innerText.replace ('Quartier', "");
	// le coût énergétique
	containerTmp = document.body.getElementsByClassName ('Pricestyled__BlockContainer-sc-r5ze64-0')[0];
	coutEnnergie = containerTmp.children[2].children[1].innerText;
	// le coût tôtal
	coutTotal = containerTmp.children[1].children[1].children[5].children[1].innerText;
	// l'agence
	containerTmp = document.body.findTag ('centralContactForm').children[1];
	agence = containerTmp.getElementsByTagName ('h3')[0].innerText;
	*/
}
else if (window.location.href.includes ('https://www.bienici.com/annonce/vente/clamart/appartement/')){
	// nettoyage
	document.body.findTagReplace ('mainPageContainer');
	document.body.findTagReplace ('section');
	document.body.findTagReplace ('detailedSheetOtherInfo');
	// prix
	containerTmp = document.getElementsByClassName ('ad-price__the-price')[0];
	prix = containerTmp.innerText;
	// référence
	ref = document.getElementsByClassName ('detailsSection detailsSection_aboutThisAd')[0].getElementsByClassName ('labelInfo')[0].innerText;
	var d=2+ ref.indexOf (': ');
	ref = ref.slice (d);
	// surface et nbPieces
	surface = document.getElementsByTagName ('h1')[0].childNodes[0].textContent;
	var f =8+ surface.indexOf (' pièces ');
	surface = surface.slice (f);
	// ville et quartier
	ville = document.getElementsByTagName ('h1')[0].childNodes[1].textContent;
	d= ville.indexOf (' (');
	quartier = ville.slice (d+2, -1);
	ville = ville.slice (0,d);
}
console.log ('agence', agence, numero, ref);
console.log ('ville', quartier, ville);
console.log ('coût', prix, coutTotal, tf, coutEnnergie, charges);
console.log ('appartement', surface, etage, cave);
