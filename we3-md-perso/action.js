var text = document.body.children[0].innerHTML.toHtml();
text = text.toHtmlShapes();
document.body.innerHTML = text;