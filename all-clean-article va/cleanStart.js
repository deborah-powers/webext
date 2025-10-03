crutialData = `
cleanBody: function(){ document.body.cleanBody(); },
replaceTag: function (tagName){ document.body.replaceTag (tagName); },
replaceTagList: function (tagParent, tagName){ tagParent.replaceTagList (tagName); },
findTag: function (tagParent, tagName){ return tagParent.findTag (tagName); },
findTagList: function (tagParent, tagName){ return tagParent.findTagList (tagName); },
cleanHtml: function (text){ return text.cleanHtml(); },
delAttributes: function(){
	document.body.delAttributes();
	document.body.delIds();
},
findTitle: findTitle,
downloadFile: downloadFile
`;
const libHtml = callLibrary ([ 'textFct', 'htmlFct', 'pageFct' ]);
document.body.innerHTML = libHtml.cleanHtml (document.body.innerHTML);
var fanfic = new Fanfic();
fanfic.title = libHtml.findTitle();
fanfic.cleanTitle();
fanfic.findSubject();