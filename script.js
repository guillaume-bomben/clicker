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

    button.mousedown(function() { // Function to handle mouse down event on the button
        isMouseDown = true;
        clearInterval(decreaseInterval); // Clear any ongoing decrease interval
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

    button.mouseup(function() { // Function to handle mouse up event on the button
        isMouseDown = false;
        clearInterval(interval); // Clear the interval for continuous increase
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

    function startDecreaseInterval() { // Function to start the decrease interval for counter level
        decreaseInterval = setInterval(function() {
            if (counterLevel > 0) {
                counterLevel -= 1;
                updateProgressBar();
            } else {
                clearInterval(decreaseInterval);

            }
        }, 100);
    }

    function updateProgressBar() {
        bar.css('width', counterLevel + '%');
        if (counterLevel >= 100) {
            spawnFunction(); // Call spawn function when counterLevel reaches 100
            updateLevel();
        }
    }

    function increaseCounterLevel() { // Function to increase the counter level
        if (counterLevel < 100) {
            counterLevel += 2;
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
        $(".small_button").remove();
        // Function to create and append small buttons
        for(let i = 0; i < 4; i++) {
            const randomX = Math.floor(Math.random() * ($(window).width() - 100));
            const randomY = Math.floor(Math.random() * ($(window).height() - 100));
            let smallButton = $("<img>").addClass("small_button").attr("src", "Images/Small_button.svg").css({ top: randomY, left: randomX, position: "absolute", width: "100px", height: "100px" });
            $("body").append(smallButton);
            smallButtons.push(smallButton);
            // Remove the small button after an interval
            setTimeout(function() {
                smallButton.remove();
                // Remove the button from the array
                const index = smallButtons.indexOf(smallButton);
                if (index !== -1) {
                    smallButtons.splice(index, 1);
                }
            }, i * 2000); // Each button is removed after an interval of 500ms
        }
    }
});    

