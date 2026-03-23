const cvTemplateHtml = 'page-cv.html';	// les cvTemplate doivent être déclarés dans manifest.json / web_accessible_resources
const cvTemplateTxt = 'template-cv.txt';
const formationTemplate = "<p>$date: <a href='$lien'>$titre</a></p>";
const experienceTemplate = "<div><p>$date<br/>$client</p><h3>$titre</h3><p>$description</p></div>";

crutialData =`
	strip: function (text, char){ return text.strip (char); },
	fromModel: function (text, model){ return text.fromModel (model); },
	toModel: function (text, dataDict){ return text.toModel (dataDict); }
`;
const htmlLib = callLibrary ([ 'textFct' ]);

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
		var dataDict ={};
		dataDict ['dureeExperience'] = this.dureeExperience;
		dataDict ['presentation'] = this.presentation;
		// les blocs
		// les compétences
		this.competences = this.competences.replaceAll ('\n', '</p><p>');
		this.competences = '<p>' + this.competences + '</p>';
		dataDict ['competences'] = this.competences;
		// les formations
		var sectionList = this.formations.split ('\n');
		this.formations ="";
		var itemText ="";
		for (var s=0; s< sectionList.length; s++){
			sectionList[s] = sectionList[s].split ('\t');
			itemText = formationTemplate.replace ('$date', sectionList[s][0]);
			itemText = itemText.replace ('$titre', sectionList[s][1]);
			itemText = itemText.replace ('$lien', sectionList[s][2]);
			this.formations = this.formations + itemText;
		}
		dataDict ['formations'] = this.formations;
		// les outils
		this.outils = this.outils.replaceAll (': ', '</h3><p>');
		this.outils = this.outils.replaceAll ('\n', '</p><h3>');
		this.outils = '<h3>' + this.outils + '</p>';
		dataDict ['outils'] = this.outils;
		dataDict ['experiences'] = this.experiences;
		dataDict ['projetsPerso'] = this.projetsPerso;
		template = htmlLib.toModel (template, dataDict);
		return template;
	},
	extractData: function (textSrc, templateSrc){
		const dataDict = htmlLib.fromModel (textSrc, templateSrc);
		this.metier = dataDict['metier'];
		this.metierFemminin = dataDict['metierFemminin'];
		this.dureeExperience = dataDict['dureeExperience'];
		this.presentation = dataDict['presentation'];
		this.competences = dataDict['competences'];
		this.formations = dataDict['formations'];
		this.outils = dataDict['outils'];
		this.experiences = dataDict['experiences'];
		this.projetsPerso = dataDict['projetsPerso'];
	}
};
const templateSrc = openWEfile (cvTemplateTxt);
var textSrc = document.body.innerText.replaceAll ('\n\n', '\n');
while (textSrc.includes ('\n\n')) textSrc = textSrc.replaceAll ('\n\n', '\n');
cvData.extractData (textSrc, templateSrc);

htmlTemplate = cvData.fillTemplate (htmlTemplate);
document.body.innerHTML = htmlTemplate;
