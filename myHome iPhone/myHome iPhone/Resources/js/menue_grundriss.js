Titanium.include('functions.js');
Titanium.include('suds.js');

Titanium.UI.orientation = Titanium.UI.LANDSCAPE_RIGHT;
Titanium.App.Properties.setBool('licht', false);

var win1 = Titanium.UI.currentWindow;

win1.orientationModes = [Titanium.UI.LANDSCAPE_RIGHT];
 
var logoutBtn = Titanium.UI.createButton({
	title:'Logout'
});

win1.rightNavButton = logoutBtn;

/*
 * HilfArrays
 */
var blueprintLinksArray = [];
var blueprintLinksLabelsArray = [];


/*
 * Definiton der URL Endpoint.
 */
var url = Titanium.App.Properties.getString('url') + '/services?wsdl'; 

/*
 * Definition der Parameter, die an SOAP Schnittstelle uebergeben werden soll.
 * userToken muss angepasst werden !!!
 */
var callparams = {
    userToken: '1234',
	blueprintId: parseInt(win1.params, 10),
	maxHeight: win1.navGroup.height,
	maxWidth: 480
};
/*
 * Neues Objekt SudsClient wird erzeugt (SOAP Client).
 */
var suds = new SudsClient({
	endpoint: url,
	targetNamespace: Titanium.App.Properties.getString('url')
});

try {
    suds.invoke('getBlueprint', callparams, function(xmlDoc) {
        var results = xmlDoc.documentElement.getElementsByTagName('return');
        if (results && results.length>0) {
            
			for(var n = 0; n < results.length; n++){
				
				var result = results.item(n);
				Titanium.API.info('result: ' + result.text);
							
				var ebenenName = result.getElementsByTagName('name').item(0).text;
				Titanium.API.info('name: ' + ebenenName);
				
				var ebenenID = result.getElementsByTagName('id').item(0).text;
				Titanium.API.info('ID: ' + ebenenID);
				
				var image = result.getElementsByTagName('image').item(0).text;
				Titanium.API.info('image: ' + image);
								
				var imagewrite = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'test.png');
                var imageDecode = Titanium.Utils.base64decode(image);
				imagewrite.write( imageDecode );
				Titanium.API.info("Writing image: " + imagewrite.nativePath);
				
								
				win1.backgroundImage = imagewrite.nativePath;	 
							
			}
			
			var results2 = xmlDoc.documentElement.getElementsByTagName('blueprintLinks');
			if (results2 && results2.length>0) {
				for(var m = 0; m < results2.length; m++){
					var result2 = results2.item(m);
					
					var blueprintLinksID = result2.getElementsByTagName('id').item(0).text;
					info("blueprintsLinksID: " + blueprintLinksID);
					
					var blueprintLinksName = result2.getElementsByTagName('name').item(0).text;
					info("blueprintsLinksName: " + blueprintLinksName);
					
					var blueprintLinksReferringBlueprintId = result2.getElementsByTagName('referringBlueprintId').item(0).text;
					info("blueprintLinksReferringBlueprintId: " + blueprintLinksReferringBlueprintId);
					
					var blueprintLinksX = result2.getElementsByTagName('x').item(0).text;
					info("blueprintsLinksX: " + blueprintLinksX);
					
					var blueprintLinksY = result2.getElementsByTagName('y').item(0).text;
					info("blueprintsLinksY: " + blueprintLinksY);
					
					var posX = blueprintLinksX * 480;
					var posY = blueprintLinksY * win1.navGroup.height;
					
					blueprintLinksArray[m] = Titanium.UI.createView({
						width: 20,
						height: 20,
						borderRadius: 5,
						backgroundColor: "#000",
						top: posY - 10,
						left: posX - 10,
						zIndex: 11,
						visible: true
					});
					
					blueprintLinksLabelsArray[m] = Titanium.UI.createLabel({
						text: blueprintLinksName,
						height:'auto',
						left: posX - 30,
						top: posY - 30,
						visible: true,
						zIndex: 12
					});
					
					win1.add(blueprintLinksArray[m]);
					win1.add(blueprintLinksLabelsArray[m]);
					
				}
			} else {
				info("Keine dazugehöirgen Blueprints gefunden!");
			}
			
			
        } else {
            Titanium.API.info('Error: SOAP call.');
        }
    });
} catch(e) {
    Ti.API.error('Error: ' + e);
}

var callparams2 = {
    userToken: '1234',
	blueprintId: parseInt(win1.params, 10)
};
/*
 * Neues Objekt SudsClient wird erzeugt (SOAP Client).
 */
var suds2 = new SudsClient({
	endpoint: url,
	targetNamespace: Titanium.App.Properties.getString('url')
});

try {
    suds2.invoke('getNodesByBlueprint', callparams, function(xmlDoc) {
        var results = xmlDoc.documentElement.getElementsByTagName('item');
        if (results && results.length>0) {
            
			for(var n = 0; n < results.length; n++){
				
				var result = results.item(n);
				Titanium.API.info('result: ' + result.text);
							
				var nodesID = result.getElementsByTagName('id').item(0).text;
				Titanium.API.info('nodesID: ' + nodesID);
				
				var nodesCategory = result.getElementsByTagName('category').item(0).text;
				Titanium.API.info('nodesCategory: ' + nodesCategory);
				
				var nodesManufacturer = result.getElementsByTagName('manufacturer').item(0).text;
				Titanium.API.info('nodesManufacturer: ' + nodesManufacturer);
				
				var nodesHardwareId = result.getElementsByTagName('hardwareId').item(0).text;
				Titanium.API.info('nodesHardwareId: ' + nodesHardwareId);
				
				var nodesName = result.getElementsByTagName('name').item(0).text;
				Titanium.API.info('name: ' + nodesName);
				
				var nodesType = result.getElementsByTagName('type').item(0).text;
				Titanium.API.info('nodesType: ' + nodesType);
				
				var nodesX = result.getElementsByTagName('x').item(0).text;
				Titanium.API.info('nodesX: ' + nodesX);
				
				var nodesY = result.getElementsByTagName('y').item(0).text;
				Titanium.API.info('nodesY: ' + nodesY);	
				
				
				var nodesStatus = result.getElementsByTagName('status');
				for(var i = 0; i < nodesStatus.length; i++ ){
					
					var nodesStatusKey = result.getElementsByTagName('key').item(0).text;
					Titanium.API.info('nodesStatusKey : ' + nodesStatusKey);
					
					var nodesStatusValue = result.getElementsByTagName('value').item(0).text;
					Titanium.API.info('nodesStatusValue : ' + nodesStatusValue);
				
				}
					
				createNodes(win1, nodesID, nodesName, nodesX, nodesY, nodesStatusValue, nodesStatusKey);
											
			}
			
			
        } else {
            Titanium.API.info('Error: SOAP call.');
        }
    });
} catch(e) {
    Ti.API.error('Error: ' + e);
}

