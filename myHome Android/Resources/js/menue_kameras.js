Titanium.include('functions.js');

var win1 = Titanium.UI.currentWindow;

win1.orientationModes = [Titanium.UI.PORTRAIT];

Titanium.UI.orientation = Titanium.UI.PORTRAIT;

var logo = Titanium.UI.createImageView({
image: "../images/logo.png",
width: '59px',
height: '59px',
top: '10px'
});

win1.add(logo);

var section1 = Titanium.UI.createTableViewSection({
headerTitle: 'Kameras'
});
 
// create the main menu container
var kamera_menue = Ti.UI.createTableView({
left:0,
top: '79px'
});

// first option row
var firstItemRow = Ti.UI.createTableViewRow({
hasChild: true,
leftImage: "../images/preso.png"
});

var firstItemLabel = Ti.UI.createLabel({
left: 40,
text: "Kamera1"
});
firstItemRow.add(firstItemLabel);

section1.add(firstItemRow);
// end first option row


// second option row
var secondItemRow = Ti.UI.createTableViewRow({
hasChild: true,
hasDetail: true,
leftImage: "../images/preso.png"
});

var secondItemLabel = Ti.UI.createLabel({
left: 40,
text: "Kamera2"
});
secondItemRow.add(secondItemLabel);

section1.add(secondItemRow);
// end second option row


// third option row
var thirdItemRow = Ti.UI.createTableViewRow({
hasChild: true,
leftImage: "../images/preso.png"
});

var thirdItemLabel = Ti.UI.createLabel({
left: 40,
text: "Kamera3"
});
thirdItemRow.add(thirdItemLabel);

section1.add(thirdItemRow);
// end third option row

// fourth option row
var fourthItemRow = Ti.UI.createTableViewRow({
hasChild: true,
leftImage: "../images/preso.png"
});

var fourthItemLabel = Ti.UI.createLabel({
left: 40,
text: "Kamera4"
});
fourthItemRow.add(fourthItemLabel);

section1.add(fourthItemRow);
// end fourth option row

kamera_menue.setData([section1]);

win1.add(kamera_menue);

/*
firstItemRow.addEventListener('click', function (e) {
Titanium.API.info("Oeffne Grundriss");
openWindow('js/menue_grundriss.js', 'Grundriss', true);
});
*/