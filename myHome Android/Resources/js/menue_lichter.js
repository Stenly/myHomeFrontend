Titanium.include('functions.js');

var win1 = Titanium.UI.currentWindow;

/******************************
 *  POTRAIT MODUS
 *****************************/
//if (currWindow.orientationModes = Titanium.UI.PORTRAIT){

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
		headerTitle: 'Lichter'
	});
	 
	// create the main menu container
	var lichter_menu = Ti.UI.createTableView({
		left:0,
		top: '79px'
	});
	
	// first option row
	var firstItemRow = Ti.UI.createTableViewRow({
		hasChild: true,
		leftImage: "../images/lightbulb.png"
	});
	
	var firstItemLabel = Ti.UI.createLabel({
		left: 40,
		text: "Licht1"
	});
	firstItemRow.add(firstItemLabel);
	
	var firstSwitch = Titanium.UI.createSwitch({
		value:false
	});
	firstItemRow.add(firstSwitch);
	
	section1.add(firstItemRow);
	// end first option row
	
	
	// second option row
	var secondItemRow = Ti.UI.createTableViewRow({
		hasChild: true,
		hasDetail: true,
		leftImage: "../images/lightbulb.png"
	});
	
	var secondItemLabel = Ti.UI.createLabel({
		left: 40,
		text: "Licht2"
	});
	secondItemRow.add(secondItemLabel);
	
	var secondSwitch = Titanium.UI.createSwitch({
		value:false
	});
	secondItemRow.add(secondSwitch);
	
	section1.add(secondItemRow);
	// end second option row
	
	
	// third option row
	var thirdItemRow = Ti.UI.createTableViewRow({
		hasChild: true,
		leftImage: "../images/lightbulb.png"
	});
	
	var thirdItemLabel = Ti.UI.createLabel({
		left: 40,
		text: "Licht3"
	});
	thirdItemRow.add(thirdItemLabel);
	
	var thirdSwitch = Titanium.UI.createSwitch({
		value:false
	});
	thirdItemRow.add(thirdSwitch);
	
	section1.add(thirdItemRow);
	// end third option row
	
	// fourth option row
	var fourthItemRow = Ti.UI.createTableViewRow({
		hasChild: true,
		leftImage: "../images/lightbulb.png"
	});
	
	var fourthItemLabel = Ti.UI.createLabel({
		left: 40,
		text: "Licht4"
	});
	fourthItemRow.add(fourthItemLabel);
	
	var fourthSwitch = Titanium.UI.createSwitch({
		value:false
	});
	fourthItemRow.add(fourthSwitch);
	
	section1.add(fourthItemRow);
	// end fourth option row
	
	lichter_menu.setData([section1]);
	
	win1.add(lichter_menu);


/******************************
 *  LANDSCAPE MODUS
 *****************************/
/*
else{
	
	var testLabel = Ti.UI.createLabel({
		left: 9,
		text: "Test"
	});
	win1.add(testLabel);
	
}
*/

/*
firstItemRow.addEventListener('click', function (e) {
	Titanium.API.info("Oeffne Grundriss");
	openWindow('js/menue_grundriss.js', 'Grundriss', true);
});
*/