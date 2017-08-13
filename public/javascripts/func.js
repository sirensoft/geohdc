 function openPop(url, percent) {
     var w = 630,
         h = 440; // default sizes
     if (window.screen) {
         w = window.screen.availWidth * percent / 100;
         h = window.screen.availHeight * percent / 100;

     }

     var myWin = window.open(url, 'myWin', 'top=5,left=15,width=' + w + ',height=' + h);
 }