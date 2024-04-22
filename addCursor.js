let cursorCount = 0;
let cursorCost = 100; // adjust the cost as needed
let maxCursors = 10;


$(document).ready(function(){
    function instantiateCursor() {
        let circle = $('<svg><circle cx="50%" cy="50%" r="50" fill="none" stroke="black" stroke-width="2"></circle></svg>');
        $('#button_div').append(circle);
      
        let angle = cursorCount / maxCursors * 360; // Calculate the angle for each cursor
        let cx = 50 + Math.sin(angle * Math.PI / 180) * 40; // Calculate the x-coordinate
        let cy = 50 - Math.cos(angle * Math.PI / 180) * 40; // Calculate the y-coordinate
      
        // Create a new cursor element
        let cursor = $('<img>', {
          src: 'Images/cursor1.svg',
          class: 'cursor'
        });
      
        // Add the cursor to the button_div
        $('#button_div').append(cursor);
      
        // Position the cursor along the circle
        cursor.css({
          position: 'absolute',
          top: cy + '%',
          left: cx + '%'
        });
      
        // Animate the cursor's rotation
        cursor.css({
          animation: 'rotate 5s linear infinite'
        });
      
        // Update the cursor count
        cursorCount++;
      }

$('#add_cursor').on('click', instantiateCursor);
});