// traiter le texte
var d= pageOriginale.indexOf ('** ');
pageOriginale = pageOriginale.substring (d, pageOriginale.length);
htmlLib.fromText (pageOriginale);
document.body.innerHTML = pageFinale + document.body.innerHTML;
