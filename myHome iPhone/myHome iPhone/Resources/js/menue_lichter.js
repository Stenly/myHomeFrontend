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
				
				// Nur wenn es bei dem zurückgegeben Node ein XML Tag 'Status' gibt, wird dieses auch ausgelesen
				// Notwendig, weil wir nur "lights" haben wollen
				if(result.getElementsByTagName('type').item(0).text == 'relais'){
					var nodesStatus = result.getElementsByTagName('status');
					for(var i = 0; i < nodesStatus.length; i++ ){
								
						var nodesStatusKey = result.getElementsByTagName('key').item(0).text;
								
						var nodesStatusValue = result.getElementsByTagName('value').item(0).text;						
							
					}
					
					var lightboolean;
					if(nodesStatusValue == 0){
						lightboolean = false;
					} else {
						lightboolean = true;
					}
						
					// first option row
						itemRow[nodesID] = Ti.UI.createTableViewRow({
						});
												
						var firstItemLabel = Ti.UI.createLabel({
							left: 9,
							text: nodesName
						});
						itemRow[nodesID].add(firstItemLabel);
						
						switchArray[nodesID] = Titanium.UI.createSwitch({
							right: 9,
							value: lightboolean
						});
						info("VAlUE !!!!!!!!!!!!!?????????!!!!!!!" + switchArray[nodesID].value);						
						
						setEventListener(nodesID, nodesStatusKey);
						
						itemRow[nodesID].add(switchArray[nodesID]);
						
						main_menu.appendRow(itemRow[nodesID]);
					
				}
				
				
							
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

function setEventListener(nodesID, nodesStatusKey){
	switchArray[nodesID].addEventListener('change',function(f)
	{
		Titanium.API.info('Basic Switch value = ' + f.value + ' act val ' + switchArray[nodesID].value);
		var status;
		if(f.value == true){
			status = 1;
		} else {
			status = 0;
		}
		setLichtStatus(nodesID, nodesStatusKey, status);
	});
};

function setLichtStatus(id, key, value){
	info("UEBERGEBEN ID : " + id);
	info(id);
	info(key);
	info(value);
	var callparams2 = {
		userToken: '1234',
		nodeId: parseInt(id, 10),
		key: key,
		value: value
	};
	/*
	 * Neues Objekt SudsClient wird erzeugt (SOAP Client).
	 */
	var suds2 = new SudsClient({
		endpoint: url,
		targetNamespace: Titanium.App.Properties.getString('url')
	});
	
	try {
		suds2.invoke('setStatus', callparams2, function(xmlDoc){
			var resultsABC = xmlDoc.documentElement.getElementsByTagName('item');
			if (resultsABC && resultsABC.length > 0) {
				for (var n123 = 0; n123 < resultsABC.length; n123++) {
					var resultABC = resultsABC.item(n123);
					
					var nodesIDABC = resultABC.getElementsByTagName('id').item(0).text;
					Titanium.API.info('nodesIDABC: ' + nodesIDABC);
										
					var nodesStatusABC = resultABC.getElementsByTagName('status');
					for (var i = 0; i < nodesStatusABC.length; i++) {
					var resultXXX = nodesStatusABC.item(i);
						var nodesStatusKeyABC = resultXXX.getElementsByTagName('key').item(0).text;
						Titanium.API.info('nodesStatusKey : ' + nodesStatusKeyABC);
						
						var nodesStatusValueABC = resultXXX.getElementsByTagName('value').item(0).text;
						Titanium.API.info('nodesStatusValue : ' + nodesStatusValueABC);
						
					}
						
					
					updateSwitch(nodesIDABC, nodesStatusValueABC);
					
				}
			}
			else {
				Titanium.API.info('Error: SOAP call.');
			}
		});
	} catch(e) {
		Ti.API.error('Error: ' + e);
	}	
};

function updateSwitch(nodesID, nodesStatusValue){
	info(nodesID + " : " + nodesStatusValue);
	var status;
	if(nodesStatusValue == 1){
		status = true;
	} else {
		status = false;
	}
	switchArray[nodesID].setValue(status);
};
