// variable de import-js
crutialData =`
	exists: exists,
	prepareText: prepareText,
	findTitle: function (url){ return url.findTitleFromUrl(); }
`;
const htmlLib = callLibrary ([ 'textFct', 'htmlFct' ]);

// importer mes scipts et styles persos
var metaPage =`
	<title></title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<base target='_blank'>
	<link rel='icon' type='image/svg+xml' href='file:///C:/wamp64/www/site-dp/data/nounours-perso.svg' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/structure.css' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/perso.css' media='screen' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/shapes.css' />
	<style type='text/css'>
		a#download-link {
			display: block;
			background-color: var(--page-color, ivory);
			opacity: 1;
			color: var(--text-color, black);
			font-size: 18px;
			font-weight: normal;
			font-style: normal;
			font-family: georgia, serif;
			text-transform: none;
			text-decoration: none;
			border: double 8px var(--bord-color, grey);
			border-radius: 0.5em;
			padding: 0.5em;
			white-space: pre-wrap;
			max-width: 30vw;
			position: fixed;
			bottom: 2em;
			z-index: 20;
			right: 0;
			animation-duration: 5s;
			animation-iteration-count: 2;
			animation-direction: alternate;
		}
		a#download-link:focus { border-color: var(--text-color, black); }
		a#download-link:hover { animation-name: move-dowload-link; }
		@keyframes move-dowload-link {
			to {
				color: transparent;
				border-color: transparent;
				background-color: transparent;
			}
		}
	</style>
`;
// récupérer les metadonnées de mes articles
var header = "<h1><a href='$lien'>$titre</a></h1><p>par <a href='$lienAuteur'>$auteur</a></p><p>à propos de $sujet</p><a id='download-link' href='data:text/plain;charset=utf-8,$data' download='$titre.html'>télécharger</a>";
const title = htmlLib.findTitle (window.location.href);
metaPage = metaPage.replace ('<title></title>', '<title>' + title + '</title>');
document.head.innerHTML = metaPage;

function findMetaLocal (metadata, title){
	// créer la page
	header = header.replaceAll ('$titre', title);
	if (""=== metadata['lien']){
		header = header.replace ("<a href='$lien'>", "");
		header = header.replace ('</a>', "");
	}
	else header = header.replace ('$lien', metadata['lien']);
	if (! htmlLib.exists (metadata['autlink'])){
		header = header.replace ("<a href='$lienAuteur'>", "");
		header = header.replace ('$auteur</a>', '$auteur');
	}
	else header = header.replace ('$lienAuteur', metadata['autlink']);
	header = header.replace ('$auteur', metadata['auteur']);
	header = header.replace ('$sujet', metadata['sujet']);
	if (htmlLib.exists (metadata['date'])) header = header + '<p>date: '+ metadata['date'] + '</p>';
	// le lien de téléchargement
	const textEncoded = encodeURIComponent (document.body.innerHTML);
	header = header.replace ('$data', textEncoded);
	document.body.innerHTML = header + document.body.innerHTML;
}
const metadata = htmlLib.prepareText();
findMetaLocal (metadata, title);
/*
const downloadLink = document.getElementById ('download-link');
downloadLink.addEventListener ('mouseleave', function (event){
	if (this.className.includes ('moved')) this.className ="";
	else this.className = 'moved';
});*/