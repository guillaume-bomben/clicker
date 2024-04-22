let cursorCount = 0;
let cursorCost = 100; 
let maxCursors = 10;


$(document).ready(function(){
    function instantiateCursor() {
        let circle = $('<svg><circle cx="50%" cy="50%" r="50" fill="none" stroke="black" stroke-width="2"></circle></svg>');
        $('#cursor_div').append(circle);
        let circleElement = circle.find('circle');
        let path = circleElement.attr('d');
        console.log(path);

        $('#cursor_div svg circle').css({
            'cx': '44.5%',
            'cy': '47%',
            'r': '15%'
          });
        
        if (cursorCount >= maxCursors) {
            return;
        }
        let radius = 150;
        let centerX = 550;
        let centerY = 280;
        let angle = cursorCount / maxCursors * 2 * Math.PI; // Calculate the angle for each cursor
        let cx = centerX + Math.cos(angle) * radius; // Calculate the x-coordinate
        let cy = centerY + Math.sin(angle) * radius; // Calculate the y-coordinate

        // Create a new cursor element
        let cursor = $('<img>', {
            src: 'Images/cursor1.svg',
            class: 'cursor'
        });

        // Add the cursor to the button_div
        $('#cursor_div').append(cursor);

        // Position the cursor along the circle
        cursor.css({
            position: 'absolute',
            top: `${cy}px`,
            left: `${cx}px`,
        });

        // Update the cursor count
        cursorCount++;
        console

    }
    $('#add_cursor').on('click', instantiateCursor);
});