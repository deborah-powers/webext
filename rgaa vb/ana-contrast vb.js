
// pour les jeux de mots: ABCDEFGILOS, ABCDEF61105

// suggérer des couleurs contrastées à partir d'une référence
// les fonction pour transformer la string en array existent déjà

function rgbArrayFromColorString (colorStr){
	var rgbArray =[0,0,0];
	if (colorStr[0] === '#') rgbArray = rgbFromHex (colorStr);
	else if (colorStr.substring (0,3) === 'rgb') rgbArray = rgbFromString (colorStr);
	return rgbArray;
}
function computeToSrgb (color){
	var colSrgb =0.0;
	if (color > 0.0773){
		colSrgb = color ** (1/2.4);
		colSrgb /= 2.99;
	}
	else colSrgb = color * 12.92;
	if (colSrgb >1.0) console.log ('erreur', color, colSrgb);
	return colSrgb;
}
function luxToRgb (lux, rRate, gRate){
	const bRate = 1.0 - rRate - gRate;
	const rgbArray =[ 0.0,0.0,0.0 ];
	rgbArray[0] = computeToSrgb (lux * rRate / 0.2126);
	rgbArray[1] = computeToSrgb (lux * gRate / 0.7152);
	rgbArray[2] = computeToSrgb (lux * bRate / 0.0722);
	rgbArray[0] *= 255;
	rgbArray[1] *= 255;
	rgbArray[2] *= 255;
	rgbArray[0] = Math.round (rgbArray[0]);
	rgbArray[1] = Math.round (rgbArray[1]);
	rgbArray[2] = Math.round (rgbArray[2]);
	return rgbArray;
}
function rgbToString (rgbArray){ return 'rgb(' + rgbArray[0].toString() +','+ rgbArray[1].toString() +','+ rgbArray[2].toString() +')'; }
function findComplimentary_va (colorRefStr, limConstrast){
	const colRefRgbArray = rgbFromString (colorRefStr);
	const colRefLux = 0.05 + luxFromRgb (colRefRgbArray);
	const colDarkLux = (colRefLux / limConstrast) -0.05;
	const colLightLux = (colRefLux * limConstrast) -0.05;
	var colDark = 'none';
	var colLight = 'none';
	var colArray =[];
	if (colDarkLux <=1.0 && colDarkLux >=0.0){
		colArray = luxToRgb (colDarkLux, 0.3333, 0.3333);
		colDark = rgbToString (colArray);
	}
	if (colLightLux <=1.0 && colLightLux >=0.0){
		colArray = luxToRgb (colLightLux, 0.3333, 0.3333);
		colLight = rgbToString (colArray);
	}
	console.log (colorRefStr, colDark, colLight);
}
function findComplimentary (colorRefStr, limConstrast){
	const colRefRgbArray = rgbFromString (colorRefStr);
	const colRefLux = 0.05 + luxFromRgb (colRefRgbArray);
	const colDarkLux = (colRefLux / limConstrast) -0.05;
	const colLightLux = (colRefLux * limConstrast) -0.05;
	var colDark = 'none';
	var colLight = 'none';
	var colArray =[];
	if (colDarkLux <=1.0 && colDarkLux >=0.0){
		colArray = luxToRgb (colDarkLux, 0.3333, 0.3333);
		colDark = rgbToString (colArray);
	}
	if (colLightLux <=1.0 && colLightLux >=0.0){
		colArray = luxToRgb (colLightLux, 0.3333, 0.3333);
		colLight = rgbToString (colArray);
	}
	console.log (colorRefStr, colRefLux, limConstrast, colDark, colDarkLux, colLight, colLightLux);
//	console.log (colorRefStr, colDark, colLight);
}
findComplimentary ('rgb(0, 0, 0)',3);
findComplimentary ('rgb(0, 0, 0)',7);
findComplimentary ('rgb(255, 255, 255)',3);
findComplimentary ('rgb(255, 255, 255)',7);

// ------------------------ calculer le contraste ------------------------

function computeFromSrgb (colSrgb){
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
	const lux = 0.2126 * computeFromSrgb (rgbArrayBis[0]) + 0.7152 * computeFromSrgb (rgbArrayBis[1]) + 0.0722 * computeFromSrgb (rgbArrayBis[2]);
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
	else rgbArray.push (1.0);
	return rgbArray;
}
function compareTwoRgbString (rgbStrA, rgbStrO){
	const rgbArrayA = rgbFromString (rgbStrA);
	const rgbArrayO = rgbFromString (rgbStrO);
	const lux = computeContrast (rgbArrayA, rgbArrayO);
	return lux;
}