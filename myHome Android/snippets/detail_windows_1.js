var currWindow = Titanium.UI.currentWindow;
 
var nextBtn = Titanium.UI.createButton({  
    title:'NEXT',
    height: 25,
    width : 60
});
currWindow.add(nextBtn);
 
nextBtn.addEventListener('click', function(data)
{
    Ti.API.info("got click event");
    var detailWindow = Ti.UI.createWindow( {
        title : "test window two",
        layout : 'vertical',
        url: 'detail_windows_2.js',
        _parent: Titanium.UI.currentWindow,
        navGroup : currWindow.navGroup,
        rootWindow : currWindow.rootWindow        
    });
     
    currWindow.navGroup.open(detailWindow);
});