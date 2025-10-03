fanfic.cleanTitle();
document.body.cleanBody();
document.body.delAttributes();
document.body.delIds();
document.body.removeAnnotations();
fanfic.fillHeader();
fanfic.text = document.body.innerHTML.replaceAll ('> ','>');
var downloadText = fanfic.fillDownloadFile();
downloadFile (fanfic.title +'.html', downloadText);
<<<<<<< HEAD

=======
>>>>>>> adcbae3 (maison 10/03 18:07)
