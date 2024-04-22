let cursorCount = 0;
let cursorCost = 100; 
let maxCursors = 10;
let centerX = 550;
let centerY = 280;
let radius = 150;

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
    }
    $('#add_cursor').on('click', instantiateCursor);
});