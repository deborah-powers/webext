class FanficSubject{
	static subjects =[
		new FanficSubject ('romance', [ ' sex', 'x reader', 'rasmus', 'ville valo', 'jyrki', 'him (band)', '30 seconds to mars', 'integra', 'axi', 'damned caeli' ]),
		new FanficSubject ('rocker', [ 'rasmus', 'ville valo', 'jyrki', 'him (band)', '30 seconds to mars' ]),
		new FanficSubject ('tstm', [ '30 seconds to mars', 'jared leto', 'shanon leto' ]),
		new FanficSubject ('him', [ 'him (band)', 'ville valo' ]),
		new FanficSubject ('69eyes', [ 'jyrki', 'jussi' ]),
		new FanficSubject ('hellsing', [ 'integra', 'axi', 'damned caeli' ]),
		new FanficSubject ('monstre', [ 'mythology', 'vampire', 'naga', 'pokemon' ]),
		new FanficSubject ('sf', [ 'mythology', 'vampire', 'scify', 'lovecraft', 'stoker', 'conan doyle', 'naga' ]),
		new FanficSubject ('tricot', [ 'point', 'crochet' ])
	];
	constructor (name, values){
		this.name = name;
		this.values = [ name, ];
		for (var v=0; v< values.length; v++) this.values.push (values[v]);
	}
	includes (text){
		var isIncluded ="";
		var v=0;
		while (v< this.values.length && isIncluded ===""){
			if (text.includes (this.values[v])){
				isIncluded = ', '+ this.name;
				v= this.values.length;
		} v++; }
		return isIncluded;
}}
class Fanfic{
	constructor(){
		this.title ="";
		this.text ="";
		this.author ="";
		this.authlink ="";
		this.subject ="";
		this.link = window.location.href;
	}
	cleanTitle(){
		const chars = "\t\n\\'.:;,_-/";
		this.title = this.title.toLowerCase();
		this.author = this.author.toLowerCase();
		for (var c=0; c< chars.length; c++){
			this.title = this.title.replaceAll (chars[c],' ');
			this.author = this.author.replaceAll (chars[c],' ');
		}
		while (this.title.includes ("  ")) this.title = this.title.replaceAll ('  ',' ');
		while (this.author.includes ("  ")) this.author = this.author.replaceAll ('  ',' ');
	}
	findSubject(){
		const storyData = this.title + this.author + this.subject.toLowerCase();
		var subject ="";
		for (var s=0; s< FanficSubject.subjects.length; s++) subject = FanficSubject.subjects[s].includes (storyData)
		if (subject ==="") subject = 'fiction';
		else subject = subject.substring (2);
		this.subject = subject;
	}
	toData(){
		var fanfic ={
			title: this.title,
			text: this.text,
			author: this.author,
			authlink: this.authlink,
			subject: this.subject,
			link: this.link
		};
		return fanfic;
	}
}
HTMLElement.prototype.removeAnnotations = function(){
	if (this.children.length >0){ for (var c=0; c< this.children.length; c++) if (this.children[c].tagName !== 'svg') this.children[c].removeAnnotations(); }
	else if (this.innerText){
		var text = this.innerHTML.slice (0, 15).toLowerCase();
		text = text.replaceAll (" ","");
		if (text.includes ('disclaimer')) this.parentElement.removeChild (this);
		else if (text.slice (0,3).includes ('a/n')) this.parentElement.removeChild (this);
}}
String.prototype.usePlaceholders = function(){
	const placeholders = ('y/n', 'e/c', 'h/c', 'f/n', 'l/n');
	var text = this;
	for (var p=0; p< placeholders.length; p++){
		text = text.replaceAll (placeholders[p].toUpperCase(), placeholders[p]);
		text = text.replaceAll ('('+ placeholders[p] +')', placeholders[p]);
		text = text.replaceAll ('['+ placeholders[p] +']', placeholders[p]);
		text = text.replaceAll ('{'+ placeholders[p] +'}', placeholders[p]);
	}
	text = text.replaceAll ('y/n', 'Deborah');
	text = text.replaceAll ('f/n', 'Deborah');
	text = text.replaceAll ('e/c', 'grey');
	text = text.replaceAll ('h/c', 'dark blond');
	text = text.replaceAll ('l/n', 'Powers');
	return text;
}