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
function luxFromHex (hexCode){
	// préparer le code hexadécimal
	if (hexCode[0] === '#') hexCode = hexCode.substring (1);
	// supprimer la transparence, compliquée à gérer
	if (hexCode.length ===4) hexCode = hexCode.substring (0,3);
	else if (hexCode.length ===8) hexCode = hexCode.substring (0,6);
	if (hexCode.length ===3) hexCode = hexCode[0] + hexCode[0] + hexCode[1] + hexCode[1] + hexCode[2] + hexCode[2];
	// calculer les valeurs chiffrées
	const hexArray = [ hexCode[0] + hexCode[1], hexCode[2] + hexCode[3], hexCode[4] + hexCode[5] ];
	var rs = parseInt (hexArray[0], 16);
	rs /= 255.0;
	var gs = parseInt (hexArray[1], 16);
	gs /= 255.0;
	var bs = parseInt (hexArray[2], 16);
	bs /= 255.0;
	const lux = 0.2126 * computefromSrgb (rs) + 0.7152 * computefromSrgb (gs) + 0.0722 * computefromSrgb (bs);
	return lux;
}
function contrastFromHex (hexa, hexo){
	const luxa = luxFromHex (hexa);
	const luxo = luxFromHex (hexo);
	if (luxa > luxo) return (luxa + 0.05) / (luxo + 0.05);
	else return (luxo + 0.05) / (luxa + 0.05);
}
console.log ('idem', contrastFromHex ('#FEE', '#FEE5'));
console.log ('max', contrastFromHex ('#FFF', '#000'));
// https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o
