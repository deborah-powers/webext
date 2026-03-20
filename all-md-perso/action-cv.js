const cvTemplateHtml = 'page-cv.html';	// les cvTemplate doivent être déclarés dans manifest.json / web_accessible_resources
const cvTemplateTxt = 'template-cv.txt';
const formationTemplate = "<p>$date: <a href='$lien'>$titre</a></p>";
const experienceTemplate = "<div><p>$date<br/>$client</p><h3>$titre</h3><p>$description</p></div>";

function openWEfile (fileName){
	// fileName est dans le dossier de l'extension
	const filePath = chrome.extension.getURL (fileName);
	var reqHttp = new XMLHttpRequest();
	reqHttp.open ('GET', filePath, false);
	reqHttp.send();
	var fileText ="";
	if (reqHttp.status ==0 || reqHttp.status ==200) fileText = reqHttp.responseText;
	return fileText;
}
var htmlTemplate = openWEfile (cvTemplateHtml);
// récupérer les infos du cv
const cvData ={
	metier: "", metierFemminin: "", dureeExperience: "", presentation: "",
	competences: "", formations: "", outils: "", experiences: "", projetsPerso: "",
	fillTemplate: function (template){
		// les lignes simples
		template = template.replace ('$metierFemminin', this.metierFemminin);
		template = template.replaceAll ('$metier', this.metier);
		template = template.replace ('$dureeExperience', this.dureeExperience);
		template = template.replace ('$presentation', this.presentation);
		// les blocs
		// les compétences
		this.competences = this.competences.replaceAll ('\n', '</p><p>');
		this.competences = '<p>' + this.competences + '</p>';
		template = template.replace ('$competences', this.competences);
		// les formations
		var sectionList = this.formations.split ('\n');
		var itemText ="";
		for (var s=0; s< sectionList.length; s++){
			sectionList[s] = sectionList[s].split ('\t');
			itemText = formationTemplate.replace ('$date', sectionList[s][0]);
			itemText = itemText.replace ('$titre', sectionList[s][1]);
			itemText = itemText.replace ('$lien', sectionList[s][2]);
		}
		template = template.replace ('$formations', this.formations);
		// les outils
		this.outils = this.outils.replaceAll (': ', '</h3><p>');
		this.outils = this.outils.replaceAll ('\n', '</p><h3>');
		this.outils = '<h3>' + this.outils + '</p>';
		template = template.replace ('$outils', this.outils);
		// les expériences
		template = template.replace ('$experiences', this.experiences);
		// les projets personnels
		template = template.replace ('$projetsPerso', this.projetsPerso);
		return template;
	},
	extractData_va: function (textSrc){
		while (textSrc.includes ('\n\n')) textSrc = textSrc.replaceAll ('\n\n', '\n');
		// les lignes simples
		var d=8+ textSrc.indexOf ('Métier: ');
		var f= textSrc.indexOf ('\n',d);
		this.metier = textSrc.substring (d,f);
		d=10+ textSrc.indexOf ('Fémminin: ');
		f= textSrc.indexOf ('\n',d);
		this.metierFemminin = textSrc.substring (d,f);
		d=12+ textSrc.indexOf ('Expérience: ');
		f= textSrc.indexOf ('\n',d);
		this.dureeExperience = textSrc.substring (d,f);
		d=14+ textSrc.indexOf ('Presentation: ');
		f= textSrc.indexOf ('\n',d);
		this.presentation = textSrc.substring (d,f);
		// les blocs
		d=16+ textSrc.indexOf ('\n== Compétences\n');
		f= textSrc.indexOf ('\n==',d);
		this.competences = textSrc.substring (d,f);
		d=11+ textSrc.indexOf ('\n== Outils\n');
		f= textSrc.indexOf ('\n==',d);
		this.outils = textSrc.substring (d,f);
		d=15+ textSrc.indexOf ('\n== Formations\n');
		f= textSrc.indexOf ('\n==',d);
		this.formations = textSrc.substring (d,f);
		d=16+ textSrc.indexOf ('\n== Experiences\n');
		f= textSrc.indexOf ('\n==',d);
		this.experiences = textSrc.substring (d,f);
	},
	extractData: function (textSrc, templateSrc){
		var templateList = templateSrc.split ('$');
		// récupérer les données
		for (var t=0; t< templateList.length; t=t+2) textSrc = textSrc.replace (templateList[t], "$");
		console.log (textSrc);
		// récupérer le nom des blocs
		var t= templateList.length -1;
		for (; t>=0; t=t-2) templateList.splice (t,1);
		// transformer le tout en dictionnaire
		var textList = textSrc.split ('$');
		textList.splice (0,1);
		textList.splice (textList.length -1, 1);
		var dataDict ={};
		for (var d=0; d< textList.length; d++) dataDict[templateList[d]] = textList[d];
		console.log (dataDict);
	}
};
const templateSrc = openWEfile (cvTemplateTxt);
var textSrc = document.body.innerText.replaceAll ('\n\n', '\n');
while (textSrc.includes ('\n\n')) textSrc = textSrc.replaceAll ('\n\n', '\n');
cvData.extractData (textSrc, templateSrc);
/*
htmlTemplate = cvData.fillTemplate (htmlTemplate);
document.body.innerHTML = htmlTemplate;
*/