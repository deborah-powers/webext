// importer mes scipts et styles persos
var metaPage =`
	<title>$title</title>
	<meta name='viewport' content='width=device-width,initial-scale=1'/>
	<meta charset='utf-8'/>
	<base target='_blank'>
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/structure.css' />
	<link rel='stylesheet' type='text/css' href='file:///C:/wamp64/www/site-dp/library-css/shapes.css' />
	<link rel='stylesheet' type='text/css' href='file:///C:/Users/LENOVO/Desktop/rueil-bruyeres/style.css' />
`;
var headPage = '<h1><span>Association résidence les bruyères</span><span>$title</span></h1>';
var titleEnd = document.body.children[0].innerHTML.indexOf ('\n');
const title = document.body.children[0].innerHTML.substring (0, titleEnd);
document.body.innerHTML = document.body.children[0].innerHTML.substring (titleEnd +1);
metaPage = metaPage.replace ('$title', title);
headPage = headPage.replace ('$title', title);
document.head.innerHTML = metaPage;
document.body.innerHTML = document.body.innerHTML.replaceAll ('-- ', '__ ');
document.body.innerHTML = document.body.innerHTML.replaceAll ('** ', '-- ');
document.body.innerHTML = document.body.innerHTML.replaceAll ('== ', '** ');
const metadata = prepareText();
document.body.innerHTML = headPage + document.body.innerHTML;
