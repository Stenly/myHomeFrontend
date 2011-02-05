circlesarray[id].addEventListener('dblclick',function(e)
    {
		
		
		if(modalWindowsArray[id].visible == false && Titanium.App.Properties.getBool('licht') == false){
			Titanium.API.info("Licht Klick Modal Window == false");
			Titanium.App.Properties.setBool('licht', true);			
			//modalWindowsArray[id].visible = true;
			createModalWindow(win1, id, name, value, key);			
		} 
		
	});

function createModalWindow(win1, id, name, value, key){
	
	if(value == 1){
		lightboolean = true;
	} else {
		lightboolean = false;
	}
	
	modalWindowsArray[id] = Titanium.UI.createWindow({
				opacity: 0.8,
				bottom: 0,
				height: 50,
				backgroundColor: '#000',
				zIndex: 100,
				visible: true
			});
			
	var modalWinLabel = Titanium.UI.createLabel({
				text: name,
				color: '#fff',
				left: 10
			});
			
	modalWindowsArray[id].add(modalWinLabel);
	
	
	switchArray[id] = Titanium.UI.createSwitch({
		value: lightboolean,
		left: 150
	});
	
	modalWindowsArray[id].add(switchArray[id]);
	
	buttonArray[id] = Titanium.UI.createButton({
		title: 'Close',
		right: 10,
		width: 100,
		height: 30,
		top: 10
	});
	
	modalWindowsArray[id].add(buttonArray[id]);
					
	win1.add(modalWindowsArray[id]);
	
	buttonArray[id].addEventListener('click',function(e)
    {
		
		if(modalWindowsArray[id].visible == false){
			Titanium.API.info("Licht Klick Modal Window == false");
			modalWindowsArray[id].visible = true;			
		} else {
			Titanium.API.info("Licht Klick Modal Window == true");
			Titanium.App.Properties.setBool('licht', false);
			modalWindowsArray[id].visible = false;	
		}
		
	});
	
	switchArray[id].addEventListener('click',function(e)
	{
      info("Anscheinend wird das hier ausgeführt...wieso?");
	  /*
       * SOAP Request um Licht auszumachen
       */
	  
	  /*
	   * Definiton der URL Endpoint.
	   */
	  var url = Titanium.App.Properties.getString('url') + '/services?wsdl'; 
	
	  /*
	   * Definition der Parameter, die an SOAP Schnittstelle uebergeben werden soll.
	   * userToken muss angepasst werden !!!
	   */
	  var newValue;
	  if (lightboolean == true){
	  	newValue = '0';
	  } else {
	  	newValue = '1';
	  }
	  
	  var callparams = {
	  	userToken: '1234',
		nodeId: id,
		key: key,
		value: newValue
	  };
	  /*
	   * Neues Objekt SudsClient wird erzeugt (SOAP Client).
	   */
	  var suds = new SudsClient({
		endpoint: url,
		targetNamespace: Titanium.App.Properties.getString('url')
	  });
	  
	  try {
	      	suds.invoke('setStatus', callparams, function(xmlDoc) {
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
						
						var nodesStatus = result.getElementsByTagName('status');
						for(var i = 0; i < nodesStatus.length; i++ ){
							
							var nodesStatusKey = result.getElementsByTagName('key').item(0).text;
							Titanium.API.info('nodesStatusKey : ' + nodesStatusKey);
							
							var nodesStatusValue = result.getElementsByTagName('value').item(0).text;
							Titanium.API.info('nodesStatusValue : ' + nodesStatusValue);
						
						}
						
						updateCircle(nodesID, nodesStatusValue);
						
					}
				}else {
		            Titanium.API.info('Error: SOAP call.');
		        }
		    });
		} catch(e) {
		    Ti.API.error('Error: ' + e);
		}
	  
  			
	}); //switch
}