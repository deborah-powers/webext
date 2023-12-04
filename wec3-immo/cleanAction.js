var header =`<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>`;
var body =`
	<h1>appartement</h1>
	<h2>appartement</h2>
	<p>surface: $surface</p>
	<p>$nbPieces pièces</p>
	<p>à $ville, $quartier</p>
	<p>présence d'une cave: $cave</p>
	<p>$commentaire</p>
	<a href='$url'>annonce $ref</a>
	<h2>coût</h2>
	<p>prix: $prix</p>
	<p>charges: $charges</p>
	<p>taxe foncière: $tf</p>
	<h2>agence, $agence</h2>
	<p>numéro: $agenceNum</p>
	<p>courriel: $agenceMail</p>`;

// récupérer le titre et nettoyer les headers
var title = document.head.getElementsByTagName ('title')[0].innerHTML;
title = title.toLowerCase().clean();
header = header.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = header;
document.body.cleanBody();

var agence ="";
var agenceNum ="";
var agenceMail ="";
var ref ="";
var photos =[];
var prix ="";
var tf ="";
var charges ="";
var ville ="";
var quartier ="";
var commentaire ="";
var surface ="";
var nbPieces ="";
var cave ="";
var url = window.location.href;

if (window.location.href.includes ('https://www.bienici.com/annonce/vente/clamart/appartement/')){
	// nettoyage
	document.body.findTagReplace ('mainPageContainer');
	document.body.findTagReplace ('section');
	document.body.findTagReplace ('detailedSheetOtherInfo');
	// photos, les urls
	var containerTmp = document.getElementsByClassName ('slides')[1];
	var imgList = containerTmp.getElementsByTagName ('img');
	for (var p=0; p< imgList.length; p++) photos.push (imgList[p].src);
	// prix
	containerTmp = document.getElementsByClassName ('ad-price__the-price')[0];
	prix = containerTmp.innerText;
	// référence
	ref = document.getElementsByClassName ('detailsSection detailsSection_aboutThisAd')[0].getElementsByClassName ('labelInfo')[0].innerText;
	var d=2+ ref.indexOf (': ');
	ref = ref.slice (d);
	// surface et nbPieces
	surface = document.getElementsByTagName ('h1')[0].childNodes[0].textContent;
	var f =1+ surface.indexOf (' pièces ');
	nbPieces = surface.slice (0,f);
	d= nbPieces.lastIndexOf (" ");
	nbPieces = nbPieces.slice (d);
	f+=7;
	surface = surface.slice (f);
	// ville et quartier
	ville = document.getElementsByTagName ('h1')[0].childNodes[1].textContent;
	d= ville.indexOf (' (');
	quartier = ville.slice (d+2, -1);
	ville = ville.slice (0,d);
	console.log (ville, quartier, surface, nbPieces, prix);


//	document.body.findTagReplace ('allDetails');
//	console.log (ref);
}