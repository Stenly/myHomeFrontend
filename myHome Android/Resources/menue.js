Titanium.include('js/functions.js');

var win1 = Titanium.UI.currentWindow;

win1.orientationModes = [Titanium.UI.PORTRAIT];

Titanium.UI.orientation = Titanium.UI.PORTRAIT;

var logo = Titanium.UI.createImageView({
	image: "images/logo.png",
	width: '59',
	height: '59',
	top: '10'
});

win1.add(logo);

// create the main menu container
var main_menu = Ti.UI.createTableView({
	left:0,
	top: '79'
});

// first option row
var firstItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/layers_1.png"
});

var firstItemLabel = Ti.UI.createLabel({
	left: 40,
	text: "Ebenen"
});
firstItemRow.add(firstItemLabel);

main_menu.appendRow(firstItemRow);
// end first option row

// second option row
var secondItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/box.png"
});

var secondItemLabel = Ti.UI.createLabel({
	left: 40,
	text: "Räume"
});
secondItemRow.add(secondItemLabel);

main_menu.appendRow(secondItemRow);
// end second option row

// third option row
var thirdItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/lightbulb.png"
});

var thirdItemLabel = Ti.UI.createLabel({
	left: 40,
	text: "Lichter"
});
thirdItemRow.add(thirdItemLabel);

main_menu.appendRow(thirdItemRow);
// end third option row

// fourth option row
var fourthItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/heating.png"
});

var fourthItemLabel = Ti.UI.createLabel({
	left: 40,
	text: "Heizungen"
});

fourthItemRow.add(fourthItemLabel);

main_menu.appendRow(fourthItemRow);
// end fourth option row

// fifth option row
var fifthItemRow = Ti.UI.createTableViewRow({
	hasChild: true,
	leftImage: "/images/preso.png"
});

var fifthItemLabel = Ti.UI.createLabel({
	left: 40,
	text: "Kameras"
});
fifthItemRow.add(fifthItemLabel);

main_menu.appendRow(fifthItemRow);
// end fifth option row

win1.add(main_menu);

firstItemRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Ebenen");
	openWindow('js/menue_ebenen.js', 'Ebenen', true);
});

thirdItemRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Ebenen");
	openWindow('js/menue_lichter.js', 'Lichter', true);
});

fifthItemRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Ebenen");
	openWindow('js/menue_kameras.js', 'Kameras', true);
});
 
//win1.navGroup = navGroup;
//baseWin.add(navGroup);