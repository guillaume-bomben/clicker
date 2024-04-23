let cursorCount = 0;
let cursorCost = 100; 
let maxCursors = 10;
let centerX = 555;
let centerY = 280;
let radius = 150;

$(document).ready(function(){
    function instantiateCursor() {      
        
        if (cursorCount >= maxCursors) {
            return;
        }
        $('#cursor_div .cursor').remove();

        let angleBetweenCursors = 360 / (cursorCount + 1);

        for (let i = 0; i <= cursorCount; i++) {
            let angle = i * angleBetweenCursors;
            let cx = centerX + Math.cos(angle * Math.PI / 180) * radius;
            let cy = centerY + Math.sin(angle * Math.PI / 180) * radius;

            let cursor = $('<img>', {
            src: 'Images/cursor1.svg',
            class: 'cursor'
            });

            $('#cursor_div').append(cursor);

            cursor.css({
            position: 'absolute',
            top: `${cy}px`,
            left: `${cx}px`,
            });
        }

        cursorCount++;
        animateCursors();
    }

    function animateCursors() {
        // Define the animation

      
        // Apply the animation to the cursor elements
        $('#cursor_div .cursor').css({
          animation: `rotate-cursor 5s linear infinite`
        });
      }
    $('#add_cursor').on('click', instantiateCursor);
});