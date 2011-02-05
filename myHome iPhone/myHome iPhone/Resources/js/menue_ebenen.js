Titanium.include('functions.js');
Titanium.include('suds.js');

// Hilfsarray um Ebenen aus SOAP Call zu speichern
var ebenenArray = [];
var sectionArray = [];
var itemRowArray = [];
var itemLabelArray = [];
/*
 * Definiton der URL Endpoint.
 */
var url = Titanium.App.Properties.getString('url') + '/services?wsdl'; 

/*
 * Definition der Parameter, die an SOAP Schnittstelle uebergeben werden soll.
 * userToken muss angepasst werden !!!
 */	
var callparams = {
    userToken: '1234'
};
/*
 * Neues Objekt SudsClient wird erzeugt (SOAP Client).
 */
var suds = new SudsClient({
	endpoint: url,
	targetNamespace: Titanium.App.Properties.getString('url')
});

var win1 = Titanium.UI.currentWindow;

win1.orientationModes = [Titanium.UI.PORTRAIT];

var main_menu = Ti.UI.createTableView({
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	scrollable:true,
	backgroundColor:'transparent',
	rowBackgroundColor:'white'
});

			
var section1 = Titanium.UI.createTableViewSection({
	headerTitle: 'Ebene 1',
	color: '#fff',
	top: '79px'
});
				
				
try {
    suds.invoke('getBlueprints', callparams, function(xmlDoc) {
        var results = xmlDoc.documentElement.getElementsByTagName('item');
        if (results && results.length>0) {
            
			for(var n = 0; n < results.length; n++){
				
				var result = results.item(n);
				Titanium.API.info('result: ' + result.text);
							
				var ebenenName = result.getElementsByTagName('name').item(0).text;
				info('name: ' + ebenenName);
				
				var ebenenID = result.getElementsByTagName('id').item(0).text;
				info('ID: ' + ebenenID);
								
				// first option row
				var firstItemRow = Ti.UI.createTableViewRow({
					hasChild: true
				});
				
				var firstItemLabel = Ti.UI.createLabel({
					left: 9,
					text: ebenenName
				});
				firstItemRow.add(firstItemLabel);
				
				addEventToRow(firstItemRow, ebenenName, 'menue_grundriss.js', Titanium.UI.currentWindow, win1.navGroup, win1.rootWindow, ebenenID);
				
				section1.add(firstItemRow);
				
							
			}
			
			// create the main menu container
								
			main_menu.setData([section1]);
								
			win1.add(main_menu);
			
        } else {
            Titanium.API.info('Error: SOAP call.');
        }
    });
} catch(e) {
    Ti.API.error('Error: ' + e);
}

var logoutBtn = Titanium.UI.createButton({
	title:'Logout'
});

win1.rightNavButton = logoutBtn;

logoutBtn.addEventListener('click',function(e)
{
	Ti.App.fireEvent('eventLogout');
});