$(document).ready(function() {
    let level = 1;
    let counterLevel = 0;
    let interval;
    let decreaseInterval;
    let isMouseDown = false;

    const progressContainer = $(".progress_bar");
    const progressBar = $("<div>").addClass("progress-bar");
    const bar = $("<div>").addClass("bar").attr("id", "bar");
    const levelDisplay = $("<div>").addClass("level").attr("id", "level").text("Level: 1");
    
    progressBar.append(bar);
    progressBar.append(levelDisplay);
    progressContainer.append(progressBar);

    const button = $(".Big_button");

    button.mousedown(function() {
        console.log('Script loaded');
        isMouseDown = true;
        clearInterval(decreaseInterval);
        interval = setInterval(function() {
            if (isMouseDown) {
                updateProgressBar
                increaseCounterLevel();
            }
        }, 1000);

        // $(this).addClass('animate');
        // setTimeout(function() { button.removeClass('animate'); }, 150);
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
            }
        }, 100);
    }

    function updateProgressBar() {
        bar.css('width', counterLevel + '%');
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
            levelDisplay.text("Level: " + level);
        }
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
            }}, (i + 1) * 2000); 
    }
}
});