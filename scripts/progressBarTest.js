import { money, moneyPerClick, show_money} from './script_button.js';


$(document).ready(function() {
    let level = 1;
    let counterLevel = 0;
    let interval;
    let decreaseInterval;
    let isMouseDown = false;
    let smallButtonCount = 0; // Variable to keep track of the number of small buttons spawned


    let progressContainer = $(".progress_bar");
    let progressBar = $("<div>").addClass("progress-bar");
    let bar = $("<div>").addClass("bar").attr("id", "bar");
    let levelDisplay = $("<div>").addClass("level").attr("id", "level").text("Level 1");
    let button = $(".Big_button");
    
    progressBar.append(bar);
    progressBar.append(levelDisplay);
    progressContainer.append(progressBar);

    let mouseDownTimer;

    button.mousedown(function() {
        isMouseDown = true;
        mouseDownTimer = setTimeout(function() {
            if (isMouseDown) {
                startDecreaseInterval();
            }
        }, 500); // Adjust the time period as needed (in ms)
    });

    button.mouseup(function() {
        isMouseDown = false;
        clearInterval(decreaseInterval);
        startDecreaseInterval();
        increaseCounterLevel();
        updateProgressBar();
    });
    
    function updateProgressBar() {
        const percentage = counterLevel + '%';
        bar.css('width', percentage);
        const hue = counterLevel * 1.2; 
        bar.css('background-color', `hsl(${hue}, 100%, 50%)`); 
        if (counterLevel >= 100) {
          button.attr('disabled', true);
          decreaseLevelUp();
          spawnBonusButtons();
        }
      }

    function increaseCounterLevel() {
        if (counterLevel < 100) {
            counterLevel += 2;
            updateProgressBar();
        }
    }

    function updateLevel() {
        if (counterLevel >= 100) {
            level++;
            levelDisplay.text("Level " + level);
        }
    }

    function startDecreaseInterval() {
        clearInterval(decreaseInterval);
        const totalDuration = 8000;
        const decreaseIntervalDuration = 100; 
        let decreaseStep = 100 / (totalDuration / decreaseIntervalDuration);
        decreaseInterval = setInterval(function() {
            if (!isMouseDown) {
                counterLevel -= decreaseStep;
                if (counterLevel >= 0) {
                    updateProgressBar();
                } else {
                    clearInterval(decreaseInterval);
                    counterLevel = 0;
                    updateProgressBar();
                    button.attr('disabled', false);
                }
            }
        }, decreaseIntervalDuration);
    }
    
    function decreaseLevelUp() {
        updateLevel();
        button.attr('disabled', true);
        const remainingTime = 8000; // 4 seconds
        const decreaseStepLevelUp = (counterLevel / (remainingTime / 100));
        (function() {
            function decreaseLevelUpRecursive() {
                if (!isMouseDown) {
                    counterLevel -= decreaseStepLevelUp;
                    if (counterLevel >= 0) {
                        updateProgressBar();
                        setTimeout(decreaseLevelUpRecursive, 100);
                    } else {
                        updateProgressBar();
                        button.attr('disabled', false);
                    }
                }
            }
            decreaseLevelUpRecursive();
        })();
    }
    
    let smallButtons = [];

    function spawnBonusButtons() {
        const playingArea = $('.playing_area');
        const playingAreaWidth = playingArea.width();
        const playingAreaHeight = playingArea.height();
        for (let i = 0; i < 4; i++){
            const randomX = Math.floor(Math.random() * (playingAreaWidth - 37 - 200) + 100);
            const randomY = Math.floor(Math.random() * (playingAreaHeight - 45 - 200) + 100);

            if (randomX + 37 > playingAreaWidth - 100) {
                randomX = playingAreaWidth - 137;
            }
            if (randomY + 45 > playingAreaHeight - 100) {
                randomY = playingAreaHeight - 145;
            }
            let smallButton = $("<img>").addClass("small_button").attr("src", "assets/images/Small_button.svg").css({
                top: randomY + 'px',
                left: randomX + 'px',
                position: "absolute",
                width: "37px",
                height: "45px"
            });
            playingArea.append(smallButton);
            smallButtonCount++; // Increment the count of small buttons spawned

            smallButton.click(function () {
                console.log(money, moneyPerClick);
                money += moneyPerClick * 20;
                console.log(money);
                $(this).addClass("small-button-press");
                setTimeout(function () {
                    $(this).removeClass("small-button-press");
                }.bind(this), 150);
                $(this).remove();
                const index = smallButtons.indexOf($(this));
                if (index !== -1) {
                    smallButtons.splice(index, 1);
                    smallButtonCount--; // Decrement the count of small buttons spawned
                }
            });
            setTimeout(function () {
                smallButton.remove();
                const index = smallButtons.indexOf(smallButton);
                if (index !== -1) {
                    smallButtons.splice(index, 1);
                    smallButtonCount--; // Decrement the count of small buttons spawned
                }
            }, 6000);
        }
    }
});