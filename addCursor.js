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

    function moveCursorToCenterAndBack(cursor) {
        let initialPosition = cursor.position();
        let initialLeft = initialPosition.left;
        let initialTop = initialPosition.top;
    
        let centerLeft = centerX;
        let centerTop = centerY;
    
        cursor.animate({
            left: centerLeft,
            top: centerTop
        }, {
            duration: 1000,
        });
    }
    
    function animateCursors() {
        let cursors = $('.cursor');
        let angle = 0;
        let speed = 0.01;
    
        setInterval(function() {
            angle += speed;
    
            cursors.each(function(index) {
                let cursor = $(this);
                let angleBetweenCursors = 360 / cursors.length;
                let cursorAngle = angleBetweenCursors * index + angle * 180 / Math.PI;
    
                let cx = centerX + Math.cos(cursorAngle * Math.PI / 180) * radius;
                let cy = centerY + Math.sin(cursorAngle * Math.PI / 180) * radius;
    
                // Calculate angle towards the center
                let angleToCenter = Math.atan2(centerY - cy, centerX - cx);
                // Convert radians to degrees
                let rotationAngle = angleToCenter * 180 / Math.PI;
    
                cursor.css({
                    top: `${cy}px`,
                    left: `${cx}px`,
                    transform: `rotate(${rotationAngle + 90}deg)`
                });
            });
        }, 1000 / 60);

        setInterval(function() {
            let delay = 0;
            cursors.each(function(index) {
                let cursor = $(this);
                setTimeout(function() {
                    moveCursorToCenterAndBack(cursor);
                }, delay);
                delay += 1000;
                console.log(delay);
            });
        }, 10000); 
    }
    
    animateCursors();

    $('#add_cursor').on('click', instantiateCursor);
});