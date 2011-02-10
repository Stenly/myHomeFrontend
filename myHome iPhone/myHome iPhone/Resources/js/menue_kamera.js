Titanium.include('functions.js');
Titanium.include('suds.js');

var itemRow = [];
var itemSecondRow = [];
var sectionArray = [];
var switchArray = [];
var sliderArray = [];

var win1 = Titanium.UI.currentWindow;

win1.orientationModes = [Titanium.UI.LANDSCAPE_RIGHT];
Titanium.UI.orientation = Titanium.UI.LANDSCAPE_RIGHT;

/*
 * Definiton der URL Endpoint.
 */
var url = Titanium.App.Properties.getString('url') + '/services?wsdl'; 

/*
 * Definition der Parameter, die an SOAP Schnittstelle uebergeben werden soll.
 * userToken muss angepasst werden !!!
 */
info(win1.params);
var callparams = {
    userToken: '1234',
	nodeId: parseInt(win1.params, 10)
};
var soapAction = 'getSnapshot';
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
        var results = xmlDoc.documentElement.getElementsByTagName('return');
        if (results && results.length>0) {
            
			for(var n = 0; n < results.length; n++){
				
				var result = results.item(n);							
				var image = result.getElementsByTagName('image').item(0).text;
				
				var imagewrite = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'kamera.png');
                var imageDecode = Titanium.Utils.base64decode(image);
				imagewrite.write( imageDecode );
				Titanium.API.info("Writing image: " + imagewrite.nativePath);
				
				win1.backgroundImage = imagewrite.nativePath;
							
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