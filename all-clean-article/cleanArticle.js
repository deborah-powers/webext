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
		new FanficSubject ('tricot', [ 'point', 'crochet' ]),
		new FanficSubject ('programmation', [ 'java', 'tests' ])
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
		this.author = 'inconnu';
		this.subject ="";
		this.link = window.location.href;
	}
	cleanTitle(){
		const chars = "\t\n\\'.:;,_-/";
		if (this.title.includes ('|')){
			const f= this.title.indexOf ('|');
			this.title = this.title.substring (0,f);
			this.title = this.title.strip();
		}
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
			subject: this.subject,
			link: this.link
		};
		return fanfic;
	}
	toJsonString(){
		const fanficStr = JSON.stringify (this.toData());
		return fanficStr;
	}
	toPage(){
		var header =`<title></title>
	<base target='_blank'/>
	<meta charset='utf-8'/>
	<meta name='viewport' content='width=device-width, initial-scale=1'/>
	<meta name='subject' content='$subject'/>
	<meta name='author' content='$author'/>
	<meta name='link' content='$link'/>
`;
		var footer =`<footer>
	<p>subject: $subject</p>
	<p>title: $title</p>
	<p>link: $link</p>
	<p>author: $author</p>
</header>`;
		header = header.replace ('<title></title>', '<title>' + this.title + '</title>');
		header = header.replace ('$subject', this.subject);
		header = header.replace ('$title', this.title);
		header = header.replace ('$link', this.link);
		header = header.replace ('$author', this.author);
		document.head.innerHTML = header;
		/* si j'enregistre en tant que page web complète, je récupère mes headers
		footer = footer.replace ('$subject', this.subject);
		footer = footer.replace ('$title', this.title);
		footer = footer.replace ('$link', this.link);
		footer = footer.replace ('$author', this.author);
		document.body.innerHTML = this.text + footer;
		*/
}}
HTMLElement.prototype.removeAnnotations = function(){
	if (this.children.length >0){ for (var c=0; c< this.children.length; c++) if (this.children[c].tagName !== 'svg') this.children[c].removeAnnotations(); }
	else if (this.innerText){
		var text = this.innerHTML.slice (0, 15).toLowerCase();
		text = text.replaceAll (" ","");
		if (text.includes ('disclaimer')) this.parentElement.removeChild (this);
		else if (text.slice (0,3).includes ('a/n')) this.parentElement.removeChild (this);
}}
window.addEventListener ('pagereveal', function (event) {
	document.body.style.backgroundColor = 'lightgreen';
});