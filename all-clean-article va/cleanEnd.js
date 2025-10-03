fanfic.cleanTitle();
libHtml.cleanBody();
// libHtml.delAttributes();
document.body.removeAnnotations();
fanfic.fillHeader();
addCss ([ 'structure', 'perso' ]);
fanfic.text = document.body.innerHTML.replaceAll ('> ','>');
var downloadText = fanfic.fillDownloadFile();
libHtml.downloadFile (fanfic.title +'.html', downloadText);
