var money = 0;
var moneyPerClick = 1;
var clickCounter = 0;
var price = 10;

$(document).ready(function() {
    const button = $(".Big_button");
    const score = $("#score");

    button.click(function() {
        var scoreNumber = parseInt(score.text());
        scoreNumber += moneyPerClick;
        money += moneyPerClick;
        score.text(scoreNumber);
        $("#money").text(money);
        $("#moneyPerClick").text(moneyPerClick);
        $(this).addClass('animate');
        $(this).one('animationend', function() {
            $(this).removeClass('animate');
        });
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