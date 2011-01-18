// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

// create base UI tab and root window
var win1 = Titanium.UI.createWindow({
	title:'Tab 1',
	backgroundColor:'#fff',
	tabBarHidden:true
});
var tab1 = Titanium.UI.createTab({
	title:'Tab 1',
	window:win1
});

// create the main menu container
var main_menu = Ti.UI.createTableView({
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	scrollable:false
});

// first option row
var firstItemRow = Ti.UI.createTableViewRow({
	hasChild: true
});

var firstItemLabel = Ti.UI.createLabel({
	left: 9,
	text: "This is the first option"
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
	text: "This is the second option"
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
	text: "This is the third option"
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
	text: "This is the fourth option"
});
fourthItemRow.add(fourthItemLabel);

main_menu.appendRow(fourthItemRow);
// end fourth option row

win1.add(main_menu);

// add tabs
tabGroup.addTab(tab1); 

// open tab group
tabGroup.open();


// sub window 1
var sub_win1 = Ti.UI.createWindow({title:'Sub-Window 1'});
var sub_table1 = Ti.UI.createTableView({style:Titanium.UI.iPhone.TableViewStyle.GROUPED});
var sub_row1 = Ti.UI.createTableViewRow();
var sub_label1 = Ti.UI.createLabel({left:9, text: "This is a sub option!"});
sub_row1.add(sub_label1);
sub_table1.appendRow(sub_row1);
sub_win1.add(sub_table1);

// sub window 2
var sub_win2 = Ti.UI.createWindow({title:'Sub-Window 2'});
var sub_table2 = Ti.UI.createTableView({style:Titanium.UI.iPhone.TableViewStyle.GROUPED});
var sub_row2 = Ti.UI.createTableViewRow();
var sub_label2 = Ti.UI.createLabel({left:9, text: "This is a sub option!"});
sub_row2.add(sub_label2);
sub_table2.appendRow(sub_row2);
sub_win2.add(sub_table2);

// sub window 3
var sub_win3 = Ti.UI.createWindow({title:'Sub-Window 3'});
var sub_table3 = Ti.UI.createTableView({style:Titanium.UI.iPhone.TableViewStyle.GROUPED});
var sub_row3 = Ti.UI.createTableViewRow();
var sub_label3 = Ti.UI.createLabel({left:9, text: "This is a sub option!"});
sub_row3.add(sub_label3);
sub_table3.appendRow(sub_row3);
sub_win3.add(sub_table3);

// sub window 4
var sub_win4 = Ti.UI.createWindow({title:'Sub-Window 4'});
var sub_table4 = Ti.UI.createTableView({style:Titanium.UI.iPhone.TableViewStyle.GROUPED});
var sub_row4 = Ti.UI.createTableViewRow();
var sub_label4 = Ti.UI.createLabel({left:9, text: "This is a sub option!"});
sub_row4.add(sub_label4);
sub_table4.appendRow(sub_row4);
sub_win4.add(sub_table4);

// add the event to the first item
firstItemRow.addEventListener('click', function (e) {
	tab1.open(sub_win1);
});

// add the event to the second item
secondItemRow.addEventListener('click', function (e) {
	tab1.open(sub_win2);
});

// add the event to the third item
thirdItemRow.addEventListener('click', function (e) {
	tab1.open(sub_win3);
});

// add the event to the fourth item
fourthItemRow.addEventListener('click', function (e) {
	tab1.open(sub_win4);
});


/*
 * Sub Window bei Navigation
 */
nextBtn.addEventListener('click', function(data)
{
    Ti.API.info("got click event");
    var detailWindow = Ti.UI.createWindow( {
        title : "test window two",
        layout : 'vertical',
        url: 'detail_windows_2.js',
        _parent: Titanium.UI.currentWindow,
        navGroup : currWindow.navGroup,
        rootWindow : currWindow.rootWindow        
    });
     
    currWindow.navGroup.open(detailWindow);
});
*/
