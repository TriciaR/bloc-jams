###box-sizing: content-box
####the default

- width/height only measures the content , does not include padding or  border

width + padding + border = actual visible/rendered width of an element's box

height + padding + border = actual visible/rendered height of an element's box

- Total w/h of box = width/height of content + padding LEFT/TOP + border LEFT/TOP therefore....

the actual rendered width/height is wider than the width/height you set. (ie: width:400px; actual width would be 400px + padding + border) 

- more diffcult when workign with other meanurements such as %... where width: 25%; and a border:10px; then total displayed is actually ... 25%+12px....?



###box-sizing: border-box
####can use a border-box reset uysing universal selectors:

>\*, \*:before, \*:after { 

>-webkit-box-sizing: border-box;

>-moz-box-sizing: border-box; 

>box-sizing: border-box;

>}



> the box-sizing: border-box allows for easier calculations of screen space since for example placing 4 boxes at 25% each horozontally will fit without expanding past the screen no matter what the border or padding is applied. (NOT margin)
- border and padding is INCLUDED in the WIDTH/HEIGHT

- actual width of content = width - padding(l+r) - border(l+r)

