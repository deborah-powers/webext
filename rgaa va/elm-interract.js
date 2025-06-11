const rolesAlert =[ 'alert', 'status', 'log', 'progressbar', 'timer', 'marquee' ];

Element.prototype.addInfos = function(){
	const role = this.getAttribute ('role');
	if (rolesAlert.includes (role)){
		this.verifyRole();
		this.verifyTitle();
	}
	else{
		var event = this.getAttribute ('event');
		if (exists (event)) this.infos = 'évênement: '+ event;
		for (var a=0; a< this.attributes.length; a++){
			event = this.attributes[a].name.substring (0,2);
			if ('on' === event) this.infos = this.infos + '<br/>action: '+ this.attributes[a].name;
		}
		if (exists (this.infos)){
			this.verifyRole();
			this.verifyTitle();
}}}



for (var r=0; r< rolesAlert.length; r++){
	links = document.body.getByRole (rolesAlert[r]);
	for (var i=0; i< links.length; i++) links[i].addAll();
}
