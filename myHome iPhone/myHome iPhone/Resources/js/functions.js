function addEventToRow(theRow,theTitle, theUrl, theCurrentWindow, theNavGroup, theRootWindow)
{
    //theOrientationModes = (typeof theOrientationModes == 'undefined') ? Titanium.UI.PORTRAIT : theOrientationModes;
	
	theRow.addEventListener('click',function(e)
    {
        Ti.API.info("menue click event");
		var detailWindow = Ti.UI.createWindow( {
	        title : theTitle,
	        url: theUrl,
			//orientationModes: [theOrientationModes],
	        _parent: theCurrentWindow,
	        navGroup : theNavGroup,
	        rootWindow : theRootWindow
    	});
	
	theNavGroup.open(detailWindow);
	
    });
};