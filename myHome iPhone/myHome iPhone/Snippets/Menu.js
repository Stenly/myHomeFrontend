/*
 * Befehl um von jedem Menü zurück zum Hauptmenü zu gelangen
 */
var nextBtn = Titanium.UI.createButton({  
    title:'BAck to Main Menu',
    height: 25,
    width : 60
});
win1.add(nextBtn);

nextBtn.addEventListener('click', function(data)
{
    Ti.API.info("got click event");
    Ti.API.info(win1.rootWindow);
     
    // close the parent, then self to pop back to top
    win1.navGroup.close(win1._parent);
    win1.navGroup.close(win1);
});