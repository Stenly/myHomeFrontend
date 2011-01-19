var currWindow = Titanium.UI.currentWindow;
 
var nextBtn = Titanium.UI.createButton({  
    title:'HOME',
    height: 25,
    width : 60
});
currWindow.add(nextBtn);
 
nextBtn.addEventListener('click', function(data)
{
    Ti.API.info("got click event");
    Ti.API.info(currWindow.rootWindow);
     
    // close the parent, then self to pop back to top
    currWindow.navGroup.close(currWindow._parent);
    currWindow.navGroup.close(currWindow);
});