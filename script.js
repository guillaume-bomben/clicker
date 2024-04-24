var money = 0;
var moneyPerClick = 1;
var clickCounter = 0;
var price = 10;
const button = $(".Big_button");
const score = $("#score");

export function updateScore(type) {
    var scoreNumber = parseInt(score.text());
    if (type == "click") {
        scoreNumber += moneyPerClick;
        money += moneyPerClick;
        button.addClass('animate');
        button.one('animationend', function() {
            button.removeClass('animate');
        });
    }
    else if (type == "auto"){
        scoreNumber += moneyPerClick * 0.2;
        money += moneyPerClick * 0.2;

    }
    score.text(scoreNumber);
    $("#money").text(money);
    $("#moneyPerClick").text(moneyPerClick);
}


$(document).ready(function() {
    button.click(function() {
        updateScore("click");
    });

    $(".increase_income").click(function() {
        if (money >= price) {
            money -= price;
            price += 10;
            moneyPerClick += 1;
            $("#money").text(money);
            $("#moneyPerClick").text(moneyPerClick);
        }
    });
});