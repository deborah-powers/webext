var actionCourrante = 'hello';
var actionCourranteVb ={
	valeur: null,
	setVide: function(){ this.valeur = null; },
	set: function (nouvelleValeur){
		if (nouvelleValeur === 'lolo') console.log ('lolo est ajouté');
		this.valeur = nouvelleValeur;
	}
};

function fermerPopins(){
	const popinList = document.getElementsByClassName ('ui-dialog');
	for (var popin of popinList) if ('none' !== popin.style.display){
		var buttons = popin.getElementsByTagName ('button');
		for (var bton of buttons) if ('OK' === bton.innerText){ bton.click(); }
	}
}
function cliquerSuivant(){
	const boutonsSuivant = document.getElementsByClassName ('boutonDroite');
	var b=0;
	while (b< boutonsSuivant.length && 'A' !== boutonsSuivant[b].tagName) b= b+1;
	if (b< boutonsSuivant.length) setTimeout (function(){ boutonsSuivant[b].click(); }, 2000);
}
function listerRubriques(){
	const titreRubriqueList = document.getElementsByClassName ('titrebleu');
	var titreRubriques ="";
	for (var rubr of titreRubriqueList) titreRubriques = titreRubriques +" "+ rubr.innerText;
	return titreRubriques;
}

function allerPivot(){
	const rubriques = listerRubriques();
	if (rubriques.includes ('SELECTIONNEZ CI-DESSOUS LES RUBRIQUES QUE VOUS SOUHAITEZ FAIRE APPARAITRE')){
		actionCourrante = null;
		fermerPopins();
	}
	else if (actionCourrante === 'vas-pivot'){
		fermerPopins();
		cliquerSuivant();
		setTimeout (function(){ allerPivot(); }, 1000);
	}
	else actionCourrante = null;
}
function allerResume(){
	const resume = document.getElementsByTagName ('h2')[0];
	if ((undefined === resume || "Résumé de votre déclaration" !== resume.innerText) && actionCourrante === 'vas-resume'){
		console.log ('ok');
		fermerPopins();
		cliquerSuivant();
		setTimeout (function(){ allerResume(); }, 2000);
	}
	else{
		actionCourrante = null;
		console.log ('fin', actionCourrante);
	}
	console.log ('boucle', actionCourrante);
}

const observer = new MutationObserver (function (mutations){
	console.log ("callback that runs when observer is triggered", actionCourrante);
});
observer.observe (document.body, { subtree: true, characterData: true });
window.onload = function (event){ console.log ('window onload', event.target); }
/*
var actionCourrante ={
	valeur = null;
	setVide = function(){ this.valeur = null; }
	set = function (nouvelleValeur){
		if (nouvelleValeur === ''){}
	}
};
connectedCallback(){
	this.style.display = 'flex';
	this.style.justifyContent = 'space-between';
	this.style.alignItems = 'stretch';
	const self = this;
	var nbChildren =0;
	var observer = new MutationObserver (function (mutations){
		nbChildren +=1;
		if (nbChildren ===1){
			self.appendChild (document.createElement ('button'));
			self.children[0].addEventListener ('click', function (event){ self.goLeft(); });
			self.children[0].style.flexGrow = '1';
			self.children[0].innerHTML = '<';
		}
		else if (nbChildren ===2){
			self.appendChild (document.createElement ('img'));
			self.children[1].style.flexGrow = '2';
			self.children[1].style.objectFit = 'contain';
			self.children[1].style.maxWidth = '50%';
		}
		else if (nbChildren ===3){
			self.appendChild (document.createElement ('button'));
			self.children[2].addEventListener ('click', function (event){ self.goRight(); });
			self.children[2].style.flexGrow = '1';
			self.children[2].innerHTML = '>';
	}});
	observer.observe (this, { childList: true });

window.addEventListener ('DOMContentLoaded', function (event){
	console.log ("DOM fully loaded and parsed", event.target);
});
*/