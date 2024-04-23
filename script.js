var money = 0;
var totalMoney = 0;
var totalSpend = 0;
var moneyPerClick = 1;
var clickCounter = 0;
var price = 10;
var OMEGAPRICE = 1000;

$(document).ready(function() {
    const button = $("#button");

    button.click(function() {
        money += moneyPerClick;
        clickCounter++;
        totalMoney += moneyPerClick;
        $("#money").text(money + " $");
        $("#moneyPerClick").text(moneyPerClick + " $/click");
        $(this).addClass('animate');
        var button = $(this);
        setTimeout(function() {
            button.removeClass('animate'); // remove the 'animate' class after 0.5s
        }, 150);
    });

    $("#stats").click(function() {
        alert("Total money earned: " + totalMoney + "$\n" + "Total money spend: " + totalSpend + "$\n" + "Total clicks: " + clickCounter)
    });

    $("#upgrade").click(function() {
        if (money >= price) {
            money -= price;
            totalSpend += price;
            price += 10;
            moneyPerClick += 1;
            $("#money").text(money + " $");
            $("#moneyPerClick").text(moneyPerClick + " $/click");
        }
    });

    $("#upgrade_clicker_button").click(function() {
        if (money >= OMEGAPRICE) {
            money -= OMEGAPRICE;
            totalSpend += OMEGAPRICE;
            OMEGAPRICE += 1000;
            moneyPerClick += 100;
            $("#money").text(money + " $");
            $("#moneyPerClick").text(moneyPerClick + " $/click");
        }
        else {
            alert("You poor XD");
        }
    });
});
