
HTMLIFrameElement.prototype.addInfos = function(){
	HTMLElement.prototype.addInfos.call (this);
	const title = this.getAttribute ('title');
	if (! exists (title)) this.infos = this.infos + "\nl'attribut obligatoire title manque";
}
HTMLElement.prototype.addInfosFigure = function(){
	HTMLElement.prototype.addInfos.call (this);
	if (! exists (this.role)) this.infos = this.infos + "\nle rôle est obligatoire. il doit valoir figure ou group";
	else if (! [ 'group', 'figure' ].includes (this.role)) this.infos = this.infos + "\nle rôle doit valoir figure ou group";
}
var cadres = document.getElementsByTagName ('iframe');
cadres.setNbItemMax ('iframe');
for (var i=0; i< nbItemMax; i++) cadres[i].addInfos();
cadres = document.getElementsByTagName ('figure');
cadres.setNbItemMax ('figure');
for (var i=0; i< nbItemMax; i++) cadres[i].addInfosFigure();
downloadAnalyse ('cadres');
