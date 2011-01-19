Titanium.include('js/functions.js');

var baseWin = Titanium.UI.createWindow({  
    title:'Base Win'
});

var win1 = Titanium.UI.createWindow({  
    title:'Menue',
	backgroundImage: 'images/darkfade.jpg'
});

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
	scrollable:false,
	top: '79'
});

// first option row
var firstItemRow = Ti.UI.createTableViewRow({
	hasChild: true
});

var firstItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "Ebenen"
});
firstItemRow.add(firstItemLabel);

main_menu.appendRow(firstItemRow);
// end first option row

// second option row
var secondItemRow = Ti.UI.createTableViewRow({
	hasChild: true
});

var secondItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "Räume"
});
secondItemRow.add(secondItemLabel);

main_menu.appendRow(secondItemRow);
// end second option row

// third option row
var thirdItemRow = Ti.UI.createTableViewRow({
	hasChild: true
});

var thirdItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "Lichter"
});
thirdItemRow.add(thirdItemLabel);

main_menu.appendRow(thirdItemRow);
// end third option row

// fourth option row
var fourthItemRow = Ti.UI.createTableViewRow({
	hasChild: true
});

var fourthItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "Heizungen"
});
fourthItemRow.add(fourthItemLabel);

main_menu.appendRow(fourthItemRow);
// end fourth option row

win1.add(main_menu);
 
var navGroup = Ti.UI.iPhone.createNavigationGroup( {
    window : win1
});

addEventToRow(firstItemRow, 'Ebenen', 'js/menue_ebenen.js', Titanium.UI.currentWindow, win1);
 
//win1.navGroup = navGroup;
//baseWin.add(navGroup);
baseWin.open();