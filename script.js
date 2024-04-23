var money = 0;
var totalMoney = 0;
var totalSpend = 0;
var moneyPerClick = 1;
var clickCounter = 0;
var price = 10;
var OMEGAPRICE = 1000;

$(document).ready(function() {
    const button = $("#button");
    save();
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
        save();
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
        save();
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
        save();
    });

    $("#spawn").click(function() {
        $(".small_button").remove();
        for (let i = 0; i < 4; i++) {
            const randomX = Math.floor(Math.random() * ($(window).width() - 100));
            const randomY = Math.floor(Math.random() * ($(window).height() - 100));
            let smallButton = $("<img>").addClass("small_button").attr("src", "Images/Small_button.svg").css({ top: randomY, left: randomX, position: "absolute", width: "100px", height: "100px"});
            $("body").append(smallButton);
            smallButton.click(function() {
                money += moneyPerClick*15;
                totalMoney += moneyPerClick*15;
                $("#money").text(money + " $");
                $(this).remove();
                save();
            });
        }
    });
    
});

async function save() {
    localStorage.setItem("money", money);
    localStorage.setItem("totalMoney", totalMoney);
    localStorage.setItem("totalSpend", totalSpend);
    localStorage.setItem("moneyPerClick", moneyPerClick);
    localStorage.setItem("clickCounter", clickCounter);
    localStorage.setItem("price", price);
    localStorage.setItem("OMEGAPRICE", OMEGAPRICE);
};
