Titanium.include('functions.js');
Titanium.include('suds.js');

var itemRow = [];
var itemSecondRow = [];
var sectionArray = [];
var switchArray = [];
var sliderArray = [];

var win1 = Titanium.UI.currentWindow;

win1.orientationModes = [Titanium.UI.PORTRAIT];

/*
 * Definiton der URL Endpoint.
 */
var url = Titanium.App.Properties.getString('url') + '/services?wsdl'; 

/*
 * Definition der Parameter, die an SOAP Schnittstelle uebergeben werden soll.
 * userToken muss angepasst werden !!!
 */
var callparams;
var soapAction;

if(win1.params){
	callparams = {
	    userToken: '1234',
		blueprintId: parseInt(win1.params, 10)
	};
	soapAction = 'getNodesByBlueprint';
} else {
	callparams = {
	    userToken: '1234'
	};
	soapAction = 'getNodes';
}
/*
 * Neues Objekt SudsClient wird erzeugt (SOAP Client).
 */
var suds = new SudsClient({
	endpoint: url,
	targetNamespace: Titanium.App.Properties.getString('url')
});

var main_menu = Ti.UI.createTableView({
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	scrollable:true,
	backgroundColor:'transparent',
	rowBackgroundColor:'white'
});

try {
    suds.invoke(soapAction, callparams, function(xmlDoc) {
        var results = xmlDoc.documentElement.getElementsByTagName('item');
        if (results && results.length>0) {
            
			for(var n = 0; n < results.length; n++){
				
				var result = results.item(n);
							
				var nodesName = result.getElementsByTagName('name').item(0).text;
				
				
				var nodesID = result.getElementsByTagName('id').item(0).text;
				
				var nodesCategory = result.getElementsByTagName('category').item(0).text;
				
				// Wir wollen nur Kameras
				if(nodesCategory == 'camera'){
					// first option row
					itemRow[nodesID] = Ti.UI.createTableViewRow({
						hasChild: true
					});
											
					var firstItemLabel = Ti.UI.createLabel({
						left: 9,
						text: nodesName
					});
					itemRow[nodesID].add(firstItemLabel);
					
					addEventToRow(itemRow[nodesID], nodesName, 'menue_kamera.js', Titanium.UI.currentWindow, win1.navGroup, win1.rootWindow, nodesID);
					
					main_menu.appendRow(itemRow[nodesID]);
				} // if(nodesCategory == 'camera')
				
							
			} // for(var n = 0; n < results.length; n++)
						
					
        } else {
            Titanium.API.info('Error: SOAP call.');
        }
		
    }); // suds.invoke
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

win1.add(main_menu);