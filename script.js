var money = 0;
var moneyPerClick = 1;
var clickCounter = 0;
var price = 10;
var clicksPerSecond = 0;
var level = 1;
var counterLevel = 0;
var interval;
var decreaseInterval;
var isMouseDown = false;

$(document).ready(function() {
    const button = $("#button");
    const score = $("#score");
    const counterDisplay = $("#counterLevel");
    const spawn = $("#spawn");
    const bar = $("#bar");
    const levelDisplay = $("#level");

    button.mousedown(function() {               // Function to handle mouse down event on the button
        isMouseDown = true;
        clearInterval(decreaseInterval);           // Clear any ongoing decrease interval
        interval = setInterval(function() {
            clicksPerSecond++;
            if (isMouseDown) {
                increaseCounterLevel();
            }
        }, 1000);

        clickCounter++;
        var scoreNumber = parseInt(score.text());
        scoreNumber += moneyPerClick;
        money += moneyPerClick;
        score.text(scoreNumber);
        $("#money").text(money);
        $("#moneyPerClick").text(moneyPerClick);
        $(this).addClass('animate');
        var button = $(this);
        setTimeout(function() {
            button.removeClass('animate');
        }, 150);
    });

    button.mouseup(function() {        // Function to handle mouse up event on the button
        isMouseDown = false;
        clearInterval(interval);      // Clear the interval for continuous increase
        startDecreaseInterval();
        increaseCounterLevel();
        clicksPerSecond = 0;
    });

    $("#upgrade").click(function() {
        if (money >= price) {
            money -= price;
            price += 10;
            moneyPerClick += 1;
            $("#money").text(money);
            $("#moneyPerClick").text(moneyPerClick);
        }
    });

    function startDecreaseInterval() {
        clearInterval(decreaseInterval);
        let decreaseValue = 100; // Start the countdown from 100
        const countdownDuration = 8000; // Countdown duration in milliseconds (4 seconds)
        const decreaseStep = 100 / (countdownDuration / 100); // Calculate the decrease step per millisecond
    
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
                // Additional logic can be added here if needed after the countdown completes
            }
        }, 100); // Update every 100 milliseconds
    }
    

    function updateProgressBar() {
        bar.css('width', counterLevel + '%');
        if (counterLevel >= 100) {
            button.attr('disabled', true);
            startDecreaseInterval();
            //counterLevel = 0;
            spawnFunction();          
            updateLevel();
    //else{
        //increaseCounterLevel();
  //  }

    }
}

function increaseCounterLevel() { // Function to increase the counter level
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
        // Function to create and append small buttons
        for(let i = 0; i < 4; i++) {
            const randomX = Math.floor(Math.random() * ($(window).width() - 100));
            const randomY = Math.floor(Math.random() * ($(window).height() - 100));
            let smallButton = $("<img>").addClass("small_button").attr("src", "Images/Small_button.svg").css({ top: randomY, left: randomX, position: "absolute", width: "100px", height: "100px" });
            $("body").append(smallButton);
            smallButtons.push(smallButton);
            smallButton.click(function() {             // Add an event handler to remove the button on click
                $(this).remove();
                const index = smallButtons.indexOf($(this));  // Remove the button from the array
                if (index !== -1) {
                    smallButtons.splice(index, 1);
                }
            });
            setTimeout(function() {                       // Remove the button automatically after a certain delay
                smallButton.remove();
                const index = smallButtons.indexOf(smallButton);
                if (index !== -1) {
                    smallButtons.splice(index, 1);
                }
            }, (i + 1) * 2000);                            
        }
    }
});