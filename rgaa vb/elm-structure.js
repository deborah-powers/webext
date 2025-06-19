HTMLElement.prototype.addInfos = function(){
	if (this.tagName === 'NAV'){
		var items = this.getElementsByTagName ('a');
		var itemsRole = this.getAllByRole ('link');
		if (items.length ===0 && itemsRole.length ===0) this.infos = 'pas de liens';
		else{
			var externalLink = false;
			for (var link of items) if (! link.href.includes (window.location.hostname)){ externalLink = true; }
			for (var link of itemsRole){
				if (exists (link.getAttribute ('href')) &&! link.getAttribute ('href').includes (window.location.hostname))
					externalLink = true;
			}
			if (externalLink) this.infos = 'liens externes dans la liste';
		}
		items = this.getElementsByTagName ('button');
		itemsRole = this.getAllByRole ('button');
		if (items.length >0 || itemsRole.length >0) this.infos = this.infos = '\nprésence de boutons';
		infos = infos +'\n\n\t'+ this.tagName +'\t';
		if (exists (this.role)) infos = infos + this.role;
		else infos = infos + 'aucun role';
		infos = infos +'\t'+ this.getXpath() +'\n'+ this.infos;
		this.setAttribute ('infos', this.infos);
}}
infos = infos +'\n\n== le main\n';
var elements = document.getElementsByTagName ('main');
if (elements.length ===0) infos = infos + "\nil manque l'élément obligatoire main";
else{
	if (elements.length >1) infos = infos + '\nplusieurs éléments main';
	// différencier les mains actifs ou éteinds, ainsi que la présence du role main
	var roleMainActif = false;
	var mainActif =0;
	var mainEteind =0;
	for (var main of elements){
		if (main.hidden) mainEteind +=1;
		else{
			mainActif +=1;
			if ('main' === main.role) roleMainActif = true;
	}}
	if (mainActif >1) infos = infos +'\n\t'+ mainActif.toString() +' main actifs';
	else if (mainActif ===0) infos = infos + '\n\taucun main actif';
	if (mainEteind >1) infos = infos +'\n\t'+ mainEteind.toString() +' main éteinds';
	if (roleMainActif) infos = infos + "\nau moins l'un des main actifs porte le role main";
	else infos = infos +"\naucun des main actifs ne porte le role main";
}
infos = infos +'\n\n== le header\n';
elements = document.getElementsByTagName ('header');
if (elements.length ===0) infos = infos + "\nil manque l'élément obligatoire header[role='banner']";
else{
	var bannerRole =0;
	var bannerRoleEteind =0;
	for (var head of elements){
		if ('banner' == head.role){
			bannerRole +=1;
			if (head.hidden) bannerRoleEteind +=1;
	}}
	if (bannerRole ===0) infos = infos + "\nil manque l'élément obligatoire header[role='banner']";
	else if (bannerRole === bannerRoleEteind) infos = infos + "\nl'élément header[role='banner'] est masqué"
	else{
		infos = infos + "\nplusieurs éléments header[role='banner'] dont ";
		if (bannerRole - bannerRoleEteind ===1) infos = infos + 'un seul actif';
		else infos = infos + 'plusieurs actifs';
}}
elements = document.body.getAllByRole ('banner');
for (var head of elements) if (head.tagName !== 'HEADER'){
	infos = infos + "un élément autre qu'un header possède le role banner: "+ head.tagName;
}
infos = infos +'\n\n== le pied de page\n';
elements = document.getElementsByTagName ('footer');
if (elements.length ===0) infos = infos + "\npas de pied de page (footer[role='contentinfo'])";
else{
	var footRole =0;
	var footRoleEteind =0;
	for (var foot of elements){
		if ('contentinfo' == foot.role){
			footRole +=1;
			if (foot.hidden) footRoleEteind +=1;
	}}
	if (footRole ===0) infos = infos + "\npas de pied de page (footer[role='contentinfo'])";
	else if (footRole === footRoleEteind) infos = infos + "\nle pied de page (footer[role='contentinfo']) est masqué"
	else{
		infos = infos + "\nplusieurs pieds de page (footer[role='contentinfo']) dont ";
		if (footRole - footRoleEteind ===1) infos = infos + 'un seul actif';
		else infos = infos + 'plusieurs actifs';
}}
elements = document.body.getAllByRole ('contentinfo');
for (var foot of elements) if (foot.tagName !== 'FOOTER'){
	infos = infos + "un élément autre qu'un footer possède le role contentinfo: "+ foot.tagName;
}
infos = infos +'\n\n== les barres de navigation\n';
elements = document.getElementsByTagName ('nav');
if (elements.length ===0) infos = infos + "\npas de barre de page navigation";
else{
	var navRole = false;
	for (var nav of elements){
		if ('navigation' === nav.role) navRole = true;
		nav.addInfos();
	}
	if (navRole) infos = infos + "au moins une barre de navigation porte le role navigation";
}
downloadAnalyse ('structure');
