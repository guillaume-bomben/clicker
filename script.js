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

    button.mousedown(function() {              // Function to handle mouse down event on the button
        isMouseDown = true;
        clearInterval(decreaseInterval);          // Clear any ongoing decrease interval
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
        

    button.mouseup(function() {                  // Function to handle mouse up event on the button
        isMouseDown = false;
        clearInterval(interval);            // Clear the interval for continuous increase
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

    function startDecreaseInterval() {          // Function to start the decrease interval for counter level
        decreaseInterval = setInterval(function() {
            if (counterLevel > 0) {
                counterLevel -= 1;
                counterDisplay.text(counterLevel);
            } else {
                clearInterval(decreaseInterval);
                introduceBonusButtons();
            
            }
        }, 100); 
            
    }

    function increaseCounterLevel() {         // Function to increase the counter level
        if (counterLevel < 50) {
            counterLevel += 2;
            counterDisplay.text(counterLevel);
        }
        
    }

});