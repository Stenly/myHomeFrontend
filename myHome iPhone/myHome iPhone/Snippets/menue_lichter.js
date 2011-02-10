/*
 * Darstellung:
 * ---Name Licht----
 * Lichtschalter [switch]
 * [slider]
 * ------
 */

Titanium.include('functions.js');
Titanium.include('suds.js');

var itemRow = [];
var itemSecondRow = [];
var sectionArray = [];
var switchArray = [];
var sliderArray = [];

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

try {
    suds.invoke('getNodes', callparams, function(xmlDoc) {
        var results = xmlDoc.documentElement.getElementsByTagName('item');
        if (results && results.length>0) {
            
			for(var n = 0; n < results.length; n++){
				
				var result = results.item(n);
							
				var nodesName = result.getElementsByTagName('name').item(0).text;
				
				
				var nodesID = result.getElementsByTagName('id').item(0).text;
				
				// Nur wenn es bei dem zurückgegeben Node ein XML Tag 'Status' gibt, wird dieses auch ausgelesen
				// Notwendig, weil wir nur "lights" haben wollen
				if(result.getElementsByTagName('status')){
					var nodesStatus = result.getElementsByTagName('status');
					for(var i = 0; i < nodesStatus.length; i++ ){
								
						var nodesStatusKey = result.getElementsByTagName('key').item(0).text;
								
						var nodesStatusValue = result.getElementsByTagName('value').item(0).text;						
							
					}
							
					if(nodesStatusKey == 'light'){
						info('result: ' + result.text);
						info('name: ' + nodesName);
						info('ID: ' + nodesID);
						info('nodesStatusKey : ' + nodesStatusKey);
						info('nodesStatusValue : ' + nodesStatusValue);
						
						var lightboolean;
						if(nodesStatusValue == 0){
							lightboolean = false;
						} else {
							lightboolean = true;
						}
						
						var section1 = Titanium.UI.createTableViewSection({
							headerTitle: nodesName,
							color: '#fff'
						});
						
						// first option row
						itemRow[nodesID] = Ti.UI.createTableViewRow({
						});
						
						itemSecondRow[nodesID] = Ti.UI.createTableViewRow({
						});
						
						var firstItemLabel = Ti.UI.createLabel({
							left: 9,
							text: 'Lichtschalter'
						});
						itemRow[nodesID].add(firstItemLabel);
						
						switchArray[nodesID] = Titanium.UI.createSwitch({
							right: 9,
							value: lightboolean
						});
						itemRow[nodesID].add(switchArray[nodesID]);
						
						sliderArray[nodesID] = Titanium.UI.createSlider({
							width: '90%',
							min: 0,
							max: 100,
							value: nodesStatusValue
						});
						itemSecondRow[nodesID].add(sliderArray[nodesID]);
																
						section1.add(itemRow[nodesID]);
						section1.add(itemSecondRow[nodesID]);
						
						sectionArray.push(section1);
					}//if(nodesStatusKey == 'light')
				} //if(result.getElementsByTagName('status'))
							
			} // for(var n = 0; n < results.length; n++)
						
			main_menu.setData(sectionArray);
					
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