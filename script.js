var money = 0;
var moneyPerClick = 1;
var clickCounter = 0;
var price = 10;

$(document).ready(function() {
    const button = $("#start");
    const score = $("#score");

    button.click(function() {
        var scoreNumber = parseInt(score.text());
        scoreNumber += moneyPerClick;
        money += moneyPerClick;
        score.text(scoreNumber);
        $("#money").text(money);
        $("#moneyPerClick").text(moneyPerClick);

        button.addClass('animate');

        setTimeout(function() {
            button.removeClass('animate');
        }, 1000);
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
});
