import {updateScore} from './button.js';

let cursorCount = 0;
export let cursorPerLV = [0,0,0,0,0];
let moneyPerCursor = [150,500,2000,10000,50000];
let moneyPerSecond = 0;
export let moneyPerCycle = 0;
let maxCursors = 10;
let cursorDiv = $('.cursor');
let cursorDivPosition = cursorDiv.position();
let cursorDivWidth = cursorDiv.width();
let cursorDivHeight = cursorDiv.height();

let centerX = cursorDivPosition.left + cursorDivWidth / 2;                                      // Calculate the center of the cursor div
let centerY = cursorDivPosition.top + cursorDivHeight / 2;
let radius = Math.min(cursorDivWidth, cursorDivHeight) / 2;

let speedCursor = 300;

export function getMoneyPerSecond(){                                                            // Function to get the money per second
    return moneyPerSecond;
}

export function setMoneyPerSecond(value){                                                       // Function to set the money per second                                             
    moneyPerSecond = value;
}

export function getSpeedCursor(){                                                               // Function to get the speed of the cursor
    return speedCursor;
}
export function setSpeedCursor(value){                                                          // Function to set the speed of the cursor       
    speedCursor = value;
}

export async function instantiateCursor() {                                                     // Function to instantiate the cursor        
    $('.cursor_object').remove();
    let angleBetweenCursors = 360 / cursorCount;
    moneyPerCycle = 0;
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
            moneyPerCycle += moneyPerCursor[LV];
        }
    }
    moneyPerSecond = moneyPerCycle / (speedCursor * 0.01)
    animateCursors();
}
async function moveCursorToCenterAndBack(cursor) {                                              // Function to move the cursor to the center and back     
    let centerLeft = centerX;
    let centerTop = centerY;

    cursor.animate({
        left: centerLeft,
        top: centerTop
    }, {
        duration: speedCursor *0.95,
    });
}


async function animateCursors() {                                                               // Function to animate the cursors in a circular motion
    let cursors = $('.cursor_object');
    let angle = 0;
    let speed = 0.01;
    
    setInterval(function() {
        angle += speed;
        
        cursors.each(function(index) {
            let cursor = $(this);
            let angleBetweenCursors = 360 / cursors.length;                                         // Calculate the angle between the cursors to distribute them evenly    
            let cursorAngle = angleBetweenCursors * index + angle * 180 / Math.PI;
            
            let cx = centerX + Math.cos(cursorAngle * Math.PI / 180) * radius;
            let cy = centerY + Math.sin(cursorAngle * Math.PI / 180) * radius;
            
            let angleToCenter = Math.atan2(centerY - cy, centerX - cx);                             // Calculate the angle towards the center
            let rotationAngle = angleToCenter * 180 / Math.PI;                                      // Convert the angle from radiants to degrees    
            
            cursor.css({                                                                            // Set the position and rotation of the cursor       
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
                delay += speedCursor;
            });
        },speedCursor * 10);

        setInterval(function() {
            updateScore("auto");
        }, speedCursor * 10);
    }

export function createCursor() {                                                                // Function to create the cursor based on the cursor level and count        
    cursorCount = cursorPerLV[0] + cursorPerLV[1] + cursorPerLV[2] + cursorPerLV[3] + cursorPerLV[4];  
        if (cursorCount === maxCursors) {
            return false;
        }
        cursorPerLV[0] += 1;
        cursorCount += 1;
        instantiateCursor();
}