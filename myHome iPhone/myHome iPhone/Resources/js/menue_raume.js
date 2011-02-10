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
		blueprintId: parseInt(win1.params, 10),
		maxHeight: 100,
		maxWidth: 100
	};
	soapAction = 'getBlueprint';
} else {
	callparams = {
	    userToken: '1234'
	};
	soapAction = 'getBlueprints';
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
        if(win1.params) {
			var results = xmlDoc.documentElement.getElementsByTagName('blueprintLinks');
	        if (results && results.length > 0) {
			
				for (var n = 0; n < results.length; n++) {
				
					var result = results.item(n);
					
					
					var nodesName = result.getElementsByTagName('name').item(0).text;
					
					var nodesID = result.getElementsByTagName('id').item(0).text;
					
					var nodesRefferingBlueprintId = result.getElementsByTagName('referringBlueprintId').item(0).text;
					
					var nodesPrimary = result.getElementsByTagName('primary').item(0).text;
					
					if (nodesPrimary == 'false') {
						itemRow[nodesID] = Ti.UI.createTableViewRow({
							hasChild: true
						});
						
						var firstItemLabel = Ti.UI.createLabel({
							left: 9,
							text: nodesName
						});
						
						itemRow[nodesID].add(firstItemLabel);
						
						addEventToRow(itemRow[nodesID], nodesName, 'menue_grundriss.js', Titanium.UI.currentWindow, win1.navGroup, win1.rootWindow, nodesRefferingBlueprintId);
						
						main_menu.appendRow(itemRow[nodesID]);
						
					}
					
				} // for(var n = 0; n < results.length; n++)
			} else {
            	Titanium.API.info('Error: SOAP call.');
        	}
		} // if(win1.params)
		else {
				var resultsA = xmlDoc.documentElement.getElementsByTagName('item');
				if (resultsA && resultsA.length > 0) {
				
					for (var i = 0; i < resultsA.length; i++) {
					
						var resultA = resultsA.item(i);
								
						var nodesName2 = resultA.getElementsByTagName('name').item(0).text;
							
						var nodesID2 = resultA.getElementsByTagName('id').item(0).text;
								
						var nodesPrimary2 = resultA.getElementsByTagName('primary').item(0).text;
								
						if (nodesPrimary2 == 'false') {
							itemRow[nodesID2] = Ti.UI.createTableViewRow({
								hasChild: true
							});
									
							var firstItemLabel2 = Ti.UI.createLabel({
								left: 9,
								text: nodesName2
							});
									
							itemRow[nodesID2].add(firstItemLabel2);
									
							addEventToRow(itemRow[nodesID2], nodesName2, 'menue_grundriss.js', Titanium.UI.currentWindow, win1.navGroup, win1.rootWindow, nodesID2);
									
							main_menu.appendRow(itemRow[nodesID2]);
									
							
						} // for (var i = 0; i < resultsA.length; i++)
						
					} // if (resultsA && resultsA.length > 0) {			
				} else {
		            Titanium.API.info('Error: SOAP call.');
		        }
			
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