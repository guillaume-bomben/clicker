$(document).ready(function() {
    let level = 1;
    let counterLevel = 0;
    let interval;
    let decreaseInterval;
    let isMouseDown = false;
    let progressContainer;
    let progressBar;
    let bar;
    let levelDisplay;
    let button;
    let smallButtons;

    progressContainer = $(".progress_bar");
    progressBar = $("<div>").addClass("progress-bar");
    bar = $("<div>").addClass("bar").attr("id", "bar");
    levelDisplay = $("<div>").addClass("level").attr("id", "level").text("Level 1");
    
    progressBar.append(bar);
    progressBar.append(levelDisplay);
    progressContainer.append(progressBar);

    button = $(".Big_button");

    button.mousedown(function() {
        isMouseDown = true;
        clearInterval(decreaseInterval);
        interval = setInterval(function() {
            if (isMouseDown) {
                updateProgressBar();
                increaseCounterLevel();
            }
        }, 1000);
    });

    button.mouseup(function() {
        isMouseDown = false;
        clearInterval(interval);
        startDecreaseInterval();
        increaseCounterLevel();
        updateProgressBar();
    });

    function startDecreaseInterval() {
        clearInterval(decreaseInterval);
        const countdownDuration = 8000;
        const decreaseStep = 100 / (countdownDuration / 100);
        const countdownDurationLevelUp = 4000;
        const decreaseStepLevelUp = 100 / (countdownDurationLevelUp / 100);
        decreaseInterval = setInterval(function() {
            if (!isMouseDown) {
                counterLevel -= decreaseStep;
                if (counterLevel >= 0) {
                    updateProgressBar();
                } else {
                    clearInterval(decreaseInterval);
                    counterLevel -= decreaseStepLevelUp ;
                    updateProgressBar();
                    button.attr('disabled', false);
                }
            }
        }, 100);
    }
    
    function updateProgressBar() {
        const percentage = counterLevel + '%';
        bar.css('width', percentage);
        const hue = counterLevel * 1.2; 
        bar.css('background-color', `hsl(${hue}, 100%, 50%)`); 
        if (counterLevel >= 100) {
          button.attr('disabled', true);
          startDecreaseInterval();
          spawnBonusButtons();
          updateLevel();
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
            counterLevel = 0;
            levelDisplay.text("Level " + level);
            decreaseLevelUp();
        }
    }

    function decreaseLevelUp() {
        button.attr('disabled', true);
        clearInterval(decreaseInterval);
        const countdownDurationLevelUp = 4000; // 4 seconds
        const remainingProgress = 100 - counterLevel;
        const decreaseStepLevelUp = remainingProgress / (countdownDurationLevelUp / 100);
        decreaseInterval = setInterval(function() {
          if (!isMouseDown) {
            counterLevel -= decreaseStepLevelUp;
            if (counterLevel >= 0) {
              updateProgressBar();
            } else {
              clearInterval(decreaseInterval);
              counterLevel = 0;
              updateProgressBar();
              button.attr('disabled', false);
            }
          }
        }, 40); // Decrease every 40ms (1000ms / 25fps)
      }


    function spawnBonusButtons() {
        const smallButtons = [];
        const playingArea = $('.playing_area');
        const playingAreaWidth = playingArea.width();
        const playingAreaHeight = playingArea.height();
        for(let i = 0; i < 4; i++) {
            const randomX = Math.floor(Math.random() * (playingAreaWidth - 37 - 200) + 100);
            const randomY = Math.floor(Math.random() * (playingAreaHeight - 45 - 200) + 100);

            if (randomX + 37 > playingAreaWidth - 100) {
                randomX = playingAreaWidth - 137;
            }

            if (randomY + 45 > playingAreaHeight - 100) {
                randomY = playingAreaHeight - 145;
            }

            let smallButton = $("<img>").addClass("small_button").attr("src", "Images/Small_button.svg").css({ 
                top: randomY + 'px', 
                left: randomX + 'px', 
                position: "absolute", 
                width: "37px", 
                height: "45px" 
            });
            playingArea.append(smallButton);
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
                }
            }, (i + 1) * 2000); 
        }
    }
});
