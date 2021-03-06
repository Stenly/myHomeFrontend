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
	headerTitle: 'Ebene 1'
});
 
// create the main menu container
var main_menu = Ti.UI.createTableView({
	left:0,
	top: '79px'
});

// first option row
var firstItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/page_layout.png"
});

var firstItemLabel = Ti.UI.createLabel({
	left: 35,
	text: "Grundriss"
});
firstItemRow.add(firstItemLabel);

section1.add(firstItemRow);
// end first option row

// second option row
var secondItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/lightbulb.png"
});

var secondItemLabel = Ti.UI.createLabel({
	left: 35,
	text: "Lichter"
});
secondItemRow.add(secondItemLabel);

section1.add(secondItemRow);

// end second option row

// third option row
var thirdItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/box.png"
});

var thirdItemLabel = Ti.UI.createLabel({
	left: 35,
	text: "Raeume"
});
thirdItemRow.add(thirdItemLabel);

section1.add(thirdItemRow);
// end third option row

// fourth option row
var fourthItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/preso.png"
});

var fourthItemLabel = Ti.UI.createLabel({
	left: 35,
	text: "Kameras"
});
fourthItemRow.add(fourthItemLabel);

section1.add(fourthItemRow);
// end fourth option row

main_menu.setData([section1]);

win1.add(main_menu);

firstItemRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Grundriss");
	openWindow('js/menue_grundriss.js', 'Grundriss', true);
});

secondItemRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Lichter");
	openWindow('js/menue_lichter.js', 'Lichter', true);
});

fourthItemRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Kameras");
	openWindow('js/menue_kameras.js', 'Kameras', true);
});
