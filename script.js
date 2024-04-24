let level = 1;
let counterLevel = 0;
let interval;
let decreaseInterval;
let isMouseDown = false;

$(document).ready(function() {
    const button = $("#button");
    const counterDisplay = $("#counterLevel");
    const spawn = $("#spawn");
    const bar = $("#bar");
    const levelDisplay = $("#level");

    button.mousedown(function() {
        isMouseDown = true; 
        clearInterval(decreaseInterval);         
        interval = setInterval(function() {
            if (isMouseDown) {
                increaseCounterLevel();
        } }, 1000);

    $(this).addClass('animate');
    var button = $(this);
    setTimeout(function() {button.removeClass('animate'); }, 150);
    });
    button.mouseup(function() {
        isMouseDown = false; 
        clearInterval(interval);
        startDecreaseInterval();
        increaseCounterLevel();
    });
    function startDecreaseInterval() {
        clearInterval(decreaseInterval);
        let decreaseValue = 100; 
        const countdownDuration = 8000;      
        const decreaseStep = 100 / (countdownDuration / 100); 
        decreaseInterval = setInterval(function() {
            decreaseValue -= decreaseStep;
                if (decreaseValue >= 0) {
                    counterLevel = decreaseValue; 
                    updateProgressBar();
                } else {
                    clearInterval(decreaseInterval);
                    counterLevel = 0; 
                    updateProgressBar(); 
                    button.attr('disabled', false); 
                } }, 100); 
}
    function updateProgressBar() { 
        bar.css('width', counterLevel + '%');
        if (counterLevel >= 100) { 
            button.attr('disabled', true);
            startDecreaseInterval();
            spawnFunction();          
            updateLevel();
    }
}
// Function to increase the counter level
    function increaseCounterLevel() {
         if (counterLevel < 100) {
            counterLevel += 2 ; 
            updateProgressBar();
         }
}
    function updateLevel() {
        if (counterLevel >= 100) {
             level++; 
             counterLevel = 0; 
             levelDisplay.text("Level: " + level); 
            }
}
    function spawnFunction() {
    const smallButtons = [];
    for(let i = 0; i < 4; i++) {
    const randomX = Math.floor(Math.random() * ($(window).width() - 100));
    const randomY = Math.floor(Math.random() * ($(window).height() - 100));
    let smallButton = $("<img>").addClass("small_button").attr("src", "Images/Small_button.svg").css({ top: randomY, left: randomX, position: "absolute", width: "100px", height: "100px" });
    $("body").append(smallButton);
    smallButtons.push(smallButton);
    smallButton.click(function() {             
        $(this).remove();
        const index = smallButtons.indexOf($(this));  
        if (index !== -1) {
            smallButtons.splice(index, 1);
        }
});
    setTimeout(function() {                       
        smallButton.remove();
        const index = smallButtons.indexOf(smallButton);
        if (index !== -1) {
            smallButtons.splice(index, 1); 
        }}, (i + 1) * 2000); }
}
});