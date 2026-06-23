function demarcheE2(){
	fillInputByLabel ('Nom', 'Gaillard');
	fillInputByLabel ('Prénom 1', 'Sylvie');
	fillInputByLabel ('Féminin');
//	if (document.body.includes ('Votre état civil'))
	fillInputByLabel ('Date de naissance', '1999-08-12');
	fillInputByLabel ('Commune de naissance', 'RUEIL MALMAISON');
	fillInputByLabel ('NIR ou numéro', '242042920300713');
	const uploader = getFileUploader()[0];
	uploader.openFileUploader();
}
function demarcheE3(){ if (document.body.innerText.includes ('Adresse email')) fillInputByLabel ('Adresse email', 'moi@gmoi.com'); }
if (document.body.innerText.includes ('Étape 2 sur 3')) demarcheE2();
if (document.body.innerText.includes ('Étape 3 sur 3')) demarcheE3();
