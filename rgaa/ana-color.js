// const colorFrame = "<iframe src='./couleurs.html'>votre navigateur ne supporte pas les cadres iframe.</iframe>";
var colorFrame = document.createElement ('iframe');
colorFrame.src = './couleurs.html';
colorFrame.innerHTML = 'votre navigateur ne supporte pas les cadres iframe.';
document.body.appendChild (colorFrame);
