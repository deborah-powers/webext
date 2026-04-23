const indic = document.body.findNextInput ('Indicatif');
if (indic){ indic.onmousedown = function(){ fillInputByLabel ('Numéro de téléphone principal', '632981674'); }}

if (document.body.innerText.includes ('Mes informations personnelles')){
	fillInputByLabel ('Nationalité', 'Fra');
	fillInputByLabel ('Situation matrimoniale', 'Célibatai');
	fillInputByLabel ('Profession', 'ADJUDA');
	fillInputByLabel ('Indicatif', '+33 (FRANCE)');
	//	fillInputByLabel ('Adresse électronique', 'moi@gmail.com');
	fillInputByLabel ('Pays', 'FRAN');
	fillInputByLabel ('Numéro et libellé de voie', '1 rue du lapi');
	fillInputByLabel ('Code postal / Localité', 'ALLEV');
}
else if (document.body.innerText.includes ('Description des faits')){
	fillInputByLabel ('Date de ', '2026-04-13');
	fillInputByLabel ('Comment avez-vous', 'Moteur');
	fillInputByLabel ('Sur quel site', 'PA');
	fillInputByLabel ('Type de bien', 'Mais');
	fillInputByLabel ('Pays', 'FRAN');
	fillInputByLabel ('Pseudo', 'doudou');
}
else if (document.body.innerText.includes ('Préjudice financier')) fillInputByLabel ('Date', '2026-04-13');
