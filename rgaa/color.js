const sectionConstast = voletRgaa.getElementsByTagName ('div')[1];
const contrastBlock = sectionConstast.innerHTML;

voletRgaa.getElementsByTagName ('p')[0].addEventListener ('click', chooseFromPage);
var colorInputs = voletRgaa.getElementsByTagName ('input');
colorInputs[0].addEventListener ('change', pickColorA);
colorInputs[1].addEventListener ('click', typeColorA);
colorInputs[2].addEventListener ('change', pickColorO);
colorInputs[3].addEventListener ('click', typeColorO);

// pour les jeux de mots: ABCDEFGILOS
// ------------------------ calculer le contraste ------------------------

function computefromSrgb (colSrgb){
	var color =0;
	if (colSrgb > 0.03928){
		color = colSrgb + 0.055;
		color /= 1.055;
		color = color **2.4;
	}
	else color = colSrgb / 12.92;
	return color;
}
function luxFromRgb (rgbArray){
	var rgbArrayBis =[
		rgbArray[0] / 255.0,
		rgbArray[1] / 255.0,
		rgbArray[2] / 255.0
	];
	const lux = 0.2126 * computefromSrgb (rgbArrayBis[0]) + 0.7152 * computefromSrgb (rgbArrayBis[1]) + 0.0722 * computefromSrgb (rgbArrayBis[2]);
	return lux;
}
function computeContrast (rgbA, rgbO){
	const luxa = luxFromRgb (rgbA);
	const luxo = luxFromRgb (rgbO);
	var lux = 0.2;
	if (luxa > luxo) lux = (luxa + 0.05) / (luxo + 0.05);
	else lux = (luxo + 0.05) / (luxa + 0.05);
	lux = Math.round (lux * 10) /10;
	return lux;
}
// ------------------------ préparer les couleurs ------------------------

function validateHex (hexCode){
	// longueur du code
	if (hexCode[0] === '#') hexCode = hexCode.substring (1);
	// supprimer la transparence, compliquée à gérer
	if (hexCode.length ===4) hexCode = hexCode.substring (0,3);
	else if (hexCode.length ===8) hexCode = hexCode.substring (0,6);
	if (hexCode.length ===3) hexCode = hexCode[0] + hexCode[0] + hexCode[1] + hexCode[1] + hexCode[2] + hexCode[2];
	else if (hexCode.length !==6) hexCode = 'CEFADA';
	// lettres du code
	hexCode = hexCode.toUpperCase();
	const values = '0123456789ABCDEF';
	var colorOk = true;
	var c=1;
	while (c< hexCode.length && colorOk){
		if (! values.includes (hexCode[c])) colorOk = false;
		c+=1;
	}
	if (! colorOk) hexCode = 'CEFADA';
	return '#'+ hexCode;
}
function rgbFromHex (hexCode){
	// hexCode = #123456
	const hexArray = [ hexCode[1] + hexCode[2], hexCode[3] + hexCode[4], hexCode[5] + hexCode[6] ];
	var rgbArray =[ parseInt (hexArray[0], 16), parseInt (hexArray[1], 16), parseInt (hexArray[2], 16) ];
	return rgbArray;
}
function rgbToHex (rgbArray){
	var hexArray =[];
	hexArray.push (rgbArray[0].toString (16));
	hexArray.push (rgbArray[1].toString (16));
	hexArray.push (rgbArray[2].toString (16));
	if (hexArray[0].length ===1) hexArray[0] ='0'+ hexArray[0];
	if (hexArray[1].length ===1) hexArray[1] ='0'+ hexArray[1];
	if (hexArray[2].length ===1) hexArray[2] ='0'+ hexArray[2];
	var hexCode = '#'+ hexArray[0] + hexArray[1] + hexArray[2];
	hexCode = hexCode.toUpperCase();
	return hexCode;
}
function rgbFromString (rgbString){
	// rgbString = rgb(1,2,3)
	if (rgbString.includes ('rgba')) rgbString = rgbString.substring (5, rgbString.length -1);
	else rgbString = rgbString.substring (4, rgbString.length -1);
	var rgbArray = rgbString.split (',');
	rgbArray[0] = parseInt (rgbArray[0]);
	rgbArray[1] = parseInt (rgbArray[1]);
	rgbArray[2] = parseInt (rgbArray[2]);
	if (rgbArray.length ===4) rgbArray[3] = parseFloat (rgbArray[3]);
//	else rgbArray.push (1.0);
	return rgbArray;
}
// ------------------------ récupérer les couleurs entrées par l'utilisateur ------------------------

function printColor (blocLetter, hexCode){
	document.getElementById ('col-' + blocLetter + '-picker').style.backgroundColor = hexCode;
	document.getElementById ('col-' + blocLetter + '-picker').value = hexCode;
	document.getElementById ('col-' + blocLetter + '-code').value = hexCode;
}
function printColorBord (rgbBrd, rgbPr){
	const hexCode = rgbToHex (rgbBrd);
	const hexCodePr = rgbToHex (rgbPr);
	const blockBord = document.getElementById ('color-bord').style;
	blockBord.backgroundColor = hexCode;
	blockBord.color = hexCodePr;
}
function printColorBord_va (hexCode, hexCodePr){
	const blockBord = document.getElementById ('color-bord').style;
	blockBord.backgroundColor = hexCode;
	blockBord.color = hexCodePr;
}
function pickColor (blocLetter, hexCode){
	// afficher la couleur
	printColor (blocLetter, hexCode);
	// comparer les couleurs
	var hexCode2 = hexCode;
	if (blocLetter === 'a') hexCode2 = document.getElementById ('col-o-picker').style.backgroundColor;
	else hexCode2 = document.getElementById ('col-a-picker').style.backgroundColor;
	var rgbA = rgbFromHex (hexCode);
	var rgbO =[];
	if (hexCode2[0] === '#') rgbO = rgbFromHex (hexCode2);
	else if (hexCode2.substring (0,3) === 'rgb') rgbO = rgbFromString (hexCode2);
	printContrast (rgbA, rgbO, "");
}
function typeColor (blocLetter, hexCode){
	hexCode = validateHex (hexCode);
	pickColor (blocLetter, hexCode);
}
function pickColorInit (blocLetter, hexCode){
	hexCode = validateHex (hexCode);
	// afficher la couleur
	printColor (blocLetter, hexCode);
}
function pickColorA (event){ pickColor ('a', event.target.value); }
function pickColorO (event){ pickColor ('o', event.target.value); }
function typeColorA (event){ typeColor ('a', event.target.value); }
function typeColorO (event){ typeColor ('o', event.target.value); }

// ------------------------ récupérer les couleurs sur la page ------------------------
Array.prototype.isEqual = function (newList){
	if (this.length === newList.length){
		var isidem = true;
		var i=0;
		while (isidem && i< this.length){
			if (this[i] !== newList[i]) isidem = false;
			i+=1;
		}
		return isidem;
	}
	else return false;
}
function chooseFromPage(){ document.body.activeColorSelection(); }
HTMLElement.prototype.activeColorSelection = function(){
	this.addEventListener ('mousedown', selectColor);
	for (var c=0; c< this.children.length; c++) this.children[c].activeColorSelection();
}
HTMLElement.prototype.stopColorSelection = function(){
	this.removeEventListener ('mousedown', selectColor);
	for (var c=0; c< this.children.length; c++) this.children[c].stopColorSelection();
}
HTMLAnchorElement.prototype.activeColorSelection = function(){ this.addEventListener ('mouseover', selectColor); }
HTMLAnchorElement.prototype.stopColorSelection = function(){ this.removeEventListener ('mouseover', selectColor); }
HTMLButtonElement.prototype.activeColorSelection = function(){ this.addEventListener ('mouseover', selectColor); }
HTMLButtonElement.prototype.stopColorSelection = function(){ this.removeEventListener ('mouseover', selectColor); }
SVGSVGElement.prototype.activeColorSelection = function(){ this.addEventListener ('mousedown', selectColor); }
SVGSVGElement.prototype.stopColorSelection = function(){ this.removeEventListener ('mousedown', selectColor); }
// https://disic.github.io/guide-concepteur/6-couleurs.html
function roundColor (colorNb){
	colorNb = Math.round (colorNb);
	if (colorNb >255) colorNb = 255;
	return colorNb;
}
HTMLElement.prototype.computeRgbBg = function(){
	const style = window.getComputedStyle (this);
	var rgbaBg = rgbFromString (style.backgroundColor);
	if (rgbaBg[3] ===0){
		if (this.tagName === 'BODY') rgbaBg = [255,255,255,1];
		else rgbaBg = this.parentElement.computeRgbBg();
	}
	else if (rgbaBg[3] <1){
		rgbaBg[0] *= rgbaBg[3];
		rgbaBg[1] *= rgbaBg[3];
		rgbaBg[2] *= rgbaBg[3];
		if (this.tagName !== 'BODY'){
			var rgbaTmp = this.parentElement.computeRgbBg();
			rgbaBg[0] += rgbaTmp[0];
			rgbaBg[1] += rgbaTmp[1];
			rgbaBg[2] += rgbaTmp[2];
			rgbaBg[3] += 1;
			if (rgbaBg[3] >1){
				rgbaBg[0] /= rgbaBg[3];
				rgbaBg[1] /= rgbaBg[3];
				rgbaBg[2] /= rgbaBg[3];
				rgbaBg[3] =1;
	}}}
	rgbaBg[0] = roundColor (rgbaBg[0]);
	rgbaBg[1] = roundColor (rgbaBg[1]);
	rgbaBg[2] = roundColor (rgbaBg[2]);
	return [ rgbaBg[0], rgbaBg[1], rgbaBg[2] ];
}
HTMLElement.prototype.computeRgbTxt = function (rgbBg){
	const style = window.getComputedStyle (this);
	var rgbaTxt = rgbFromString (style.color);
	if (rgbaTxt[3] <1){
		rgbaTxt[0] *= rgbaTxt[3];
		rgbaTxt[1] *= rgbaTxt[3];
		rgbaTxt[2] *= rgbaTxt[3];
		rgbaTxt[0] += rgbBg[0];
		rgbaTxt[1] += rgbBg[1];
		rgbaTxt[2] += rgbBg[2];
		rgbaTxt[3] += 1;
		rgbaTxt[0] /= rgbaTxt[3];
		rgbaTxt[1] /= rgbaTxt[3];
		rgbaTxt[2] /= rgbaTxt[3];
		rgbaTxt[3] =1;
	}
	return [ rgbaTxt[0], rgbaTxt[1], rgbaTxt[2] ];
}
function selectColor (event){
	const style = window.getComputedStyle (event.target);
	const rgbBg = event.target.computeRgbBg();
	const rgbTxt = event.target.computeRgbTxt (rgbBg);
	document.body.stopColorSelection();
	// afficher les couleurs
	const hexText = rgbToHex (rgbTxt);
	const hexBg = rgbToHex (rgbBg);
	printColor ('a', hexText);
	printColor ('o', hexBg);
	// couleur de la bordure
	var rgbBrd =[];
	if (style.borderStyle === 'none') rgbBrd = rgbBg;
	else rgbBrd = event.target.computeRgbTxt (rgbBg, style.borderColor);
	const rgbPr = this.parentElement.computeRgbBg();
	printContrast (rgbTxt, rgbBg, style.fontSize, rgbBrd, rgbPr);
}
// ------------------------ afficher le contraste ------------------------

function printContrast (rgbA, rgbO, fontSize, rgbBrd, rgbPr){
	const lux = computeContrast (rgbA, rgbO);
	sectionConstast.innerHTML = contrastBlock.replace ('$contrast', lux);
	const spanSize = sectionConstast.getElementsByTagName ('span')[0];
	if (fontSize ===""){
		spanSize.style.display = 'none';
		sectionConstast.innerHTML = sectionConstast.innerHTML.replace ('$luxBord', "");
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$bordAA', "");
	}
	else {
		spanSize.style.display = 'inline';
		sectionConstast.innerHTML = sectionConstast.innerHTML.replace ('$fontSize', fontSize);
		const luxBord = computeContrast (rgbBrd, rgbPr);
		sectionConstast.innerHTML = sectionConstast.innerHTML.replace ('$luxBord', luxBord.toString() +':1');
		if (luxBord >=3) sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$bordAA', 'OK');
		else sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$bordAA', 'KO');
		if (luxBord >1) printColorBord (rgbBrd, rgbPr);
		else{
			const luxOne = luxFromRgb (rgbBrd);
			if (luxOne <0.5) printColorBord (rgbBrd, [255,255,255]);
			else printColorBord (rgbBrd, [0,0,0]);
		}
	}
	if (lux <3){
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAAA', 'KO');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAAA', 'KO');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAA', 'KO');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAA', 'KO');
	}
	else if (lux <4.5){
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAAA', 'KO');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAAA', 'KO');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAA', 'OK');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAA', 'KO');
	}
	else if (lux <7){
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAAA', 'OK');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAAA', 'KO');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAA', 'OK');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAA', 'OK');
	}
	else{
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAAA', 'OK');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAAA', 'OK');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$grandTextAA', 'OK');
		sectionConstast.innerHTML = sectionConstast.innerHTML.replaceAll ('$petitTextAA', 'OK');
	}
}
pickColorInit ('a', '#0AF0AF');
pickColor ('o', '#CEFADA');