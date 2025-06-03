crutialData = `
cleanBody: function(){ document.body.cleanBody(); },
replaceTag: function (tagName){ document.body.replaceTag (tagName); },
replaceTagList: function (tagParent, tagName){ tagParent.replaceTagList (tagName); },
findTag: function (tagParent, tagName){ return tagParent.findTag (tagName); },
findTagList: function (tagParent, tagName){ return tagParent.findTagList (tagName); },
delAttributes: function(){
	document.body.delAttributes();
	document.body.delIds();
},
findTitle: findTitle,
downloadFile: downloadFile
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
document.body.innerHTML = document.body.innerHTML.cleanHtml();
const codeBlocs = document.getElementsByTagName ('xmp');
for (var b=0; b< codeBlocs.length; b++) codeBlocs[b].simplifyNesting();
var fanfic = new Fanfic();
fanfic.title = libHtml.findTitle();
fanfic.cleanTitle();
fanfic.findSubject();
var styleLocal ="";

console.log ('debut', libHtml);