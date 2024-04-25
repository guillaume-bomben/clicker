import {updateScore} from './script_button.js';

let cursorCount = 0;
export let cursorPerLV = [0,0,0,0,0];
let moneyPerCursor = [150,500,2000,10000,50000];
export let moneyPerSecond = 0;
let maxCursors = 10;
let cursorDiv = $('.cursor');
let cursorDivPosition = cursorDiv.position();
let cursorDivWidth = cursorDiv.width();
let cursorDivHeight = cursorDiv.height();

let centerX = cursorDivPosition.left + cursorDivWidth / 2;
let centerY = cursorDivPosition.top + cursorDivHeight / 2;
let radius = Math.min(cursorDivWidth, cursorDivHeight) / 2;

let speedCursor = 300;
export function instantiateCursor() {
    $('.cursor_object').remove();
    let angleBetweenCursors = 360 / cursorCount;
    moneyPerSecond = 0;
    for (let LV=0; LV<5; LV++) {
        for (let i = 0; i < cursorPerLV[LV]; i++) {
            let angle = i * angleBetweenCursors;
            let cx = centerX + Math.cos(angle * Math.PI / 180) * radius;
            let cy = centerY + Math.sin(angle * Math.PI / 180) * radius;

            let path = 'assets/images/Finger'+ (LV+1) +'.svg';
            let cursor = $('<img>', {
            src: path,
            class: 'cursor_object lv'+(LV+1),
            });

            $('.cursor').append(cursor);

            cursor.css({
            position: 'absolute',
            top: `${cy}px`,
            left: `${cx}px`,
            });
            moneyPerSecond += moneyPerCursor[LV];
        }
    }
    animateCursors();
}



    function moveCursorToCenterAndBack(cursor) {
        let centerLeft = centerX;
        let centerTop = centerY;
    
        cursor.animate({
            left: centerLeft,
            top: centerTop
        }, {
            duration: speedCursor,
        });
    }


    function animateCursors() {
        let cursors = $('.cursor_object');
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
            updateScore("auto");
            let delay = 0;
            cursors.each(function(index) {
                let cursor = $(this);
                setTimeout(function() {
                    moveCursorToCenterAndBack(cursor);
                }, delay);
                delay += speedCursor;
            });
        },speedCursor * 10);
        
    }


export function createCursor() {
    cursorCount = cursorPerLV[0] + cursorPerLV[1] + cursorPerLV[2] + cursorPerLV[3] + cursorPerLV[4];  
        if (cursorCount === maxCursors) {
            return false;
        }
        cursorPerLV[0] += 1;
        cursorCount += 1;
        instantiateCursor();
}

/*
$(document).ready(function(){
    $(window).resize(function() {
        let cursorDiv = $('.cursor');
        let cursorDivPosition = cursorDiv.position();
        let cursorDivWidth = cursorDiv.width();
        let cursorDivHeight = cursorDiv.height();
    
        let centerX = cursorDivPosition.left + cursorDivWidth / 2;
        let centerY = cursorDivPosition.top + cursorDivHeight / 2;
        let radius = Math.min(cursorDivWidth, cursorDivHeight) / 2;
    
        let cursors = $('.cursor_object');
    
        cursors.each(function(index) {
            let cursor = $(this);
            let angleBetweenCursors = 360 / (cursorCount + 1);
            let cursorAngle = angleBetweenCursors * index;
    
            let cx = centerX + Math.cos(cursorAngle * Math.PI / 180) * radius;
            let cy = centerY + Math.sin(cursorAngle * Math.PI / 180) * radius;
    
            // Ensure the cursor stays within the cursor div
            let left = Math.min(Math.max(cx, cursorDivPosition.left), cursorDivPosition.left + cursorDivWidth - 20);
            let top = Math.min(Math.max(cy, cursorDivPosition.top), cursorDivPosition.top + cursorDivHeight - 20);
    
            cursor.css({
                top: `${top}px`,
                left: `${left}px`,
            });
        });
    });
});
*/