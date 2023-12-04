var agence ="";
var agenceNum ="";
var agenceMail ="";
var ref ="";
var prix ="";
var notaire = '17300';
var coutTotal ="";
var tf ="";
var ennergie ="";
var charges = 'inconnues';
var surface ="";
var etage = '? / ?';
var cave = 'non';
var nbCoproprio ="";
var ville ="";
var quartier ="";
var url = window.location.href;
var notaire = '17300';
var netProprio ="";
var fai ="";
var commentaire ="";
var photos =[];
var dpe ="";
var nbPieces ="";


HTMLCollection.prototype.setPhotos = function(){ for (var p=0; p< this.length; p++) photos.push (this[p].src); }
HTMLElement.prototype.setPhotos = function(){
	var images = containerTmp.getElementsByTagName ('img');
	images.setPhotos();
}