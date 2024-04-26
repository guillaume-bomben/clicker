import {instantiateCursor,moneyPerSecond,moneyPerCycle,cursorPerLV,createCursor} from "./addCursor.js";

let money = 0;
let totalMoney = 0;
let totalSpend = 0;
let moneyPerClick = 1;
let clickCounter = 0;
let price_income = 10;
let price_add_cursor = 10;
let price_merge_cursor = 100;
let price_cursor_income = 100;
let price_cursor_speed = 1000;
let OMEGAPRICE = 1000;

const button = $(".Big_button");

export function updateScore(type) {
    if (type == "click") {
        money += moneyPerClick;
        clickCounter++;
        totalMoney += moneyPerClick;
        button.addClass('animate');
        button.one('animationend', function() {
            button.removeClass('animate');
        });
    }
    else if (type == "auto"){
        for (let lv=0; lv<5; lv++){
            for (let i = 0; i < cursorPerLV[lv]; i++) {
                money += moneyPerCycle;
                totalMoney += moneyPerCycle;
            }
        }
    }
    show_money();
    show_money_per_click();
    show_money_per_second();
    save();
    buttonVerification();
}

$(document).ready(function() {
    save();
    buttonVerification();

    button.click(function() {
        updateScore("click");
    });

    $(".increase_income").click(function() {
        if (money >= price_income) {
            money -= price_income;
            totalSpend += price_income;
            price_income += price_income;
            if (price_income > 5120) {
                moneyPerClick = moneyPerClick * 1.2;
            }
            else {
                moneyPerClick += 1;
            }
            show_money();
            show_money_per_click();
        }
        save();
        buttonVerification();
    });
    
    $(".add_cursor").click(function() {
        if (money >= price_add_cursor && createCursor() !== false){
            money -= price_add_cursor;
            totalSpend += price_add_cursor;
            price_add_cursor += price_add_cursor*1.2;
            show_money();
            show_money_per_second();
        }
        save();
        buttonVerification();
    });

    $(".merge_cursors").click(function() {
        if (money >= price_merge_cursor && merge_cursors()){
            money -= price_merge_cursor;
            totalSpend += price_merge_cursor;
            price_merge_cursor += price_merge_cursor*0.2;
            show_money();
            show_money_per_second();
        }
        save();
        buttonVerification();
    });
    
    $(".cursor_income").click(function() {
        if (money >= price_cursor_income) {
            money -= price_cursor_income;
            totalSpend += price_cursor_income;
            price_cursor_income += price_cursor_income*0.7;
            show_money();
            show_money_per_second();
            alert("You increased your cursor income!");
        }
        save();
        buttonVerification();
    });

    $(".cursor_speed").click(function() {
        if (money >= price_cursor_speed) {
            money -= price_cursor_speed;
            totalSpend += price_cursor_speed;
            price_cursor_speed += price_cursor_speed*0.8;
            show_money();
            show_money_per_second();
            alert("You increased your cursor speed!");
        }
        save();
        buttonVerification();
    });


    $(".statistics_button").click(function() {
        alert("Total money earned: " + totalMoney + "$\n" + "Total money spend: " + totalSpend + "$\n" + "Total clicks: " + clickCounter)
    });

    $(".upgrade_button").click(function() {
        if (money >= OMEGAPRICE) {
            money -= OMEGAPRICE;
            totalSpend += OMEGAPRICE;
            OMEGAPRICE += OMEGAPRICE*100;
            moneyPerClick += moneyPerClick*20;
            // price_income += price_income*20;
            show_money();
            show_money_per_click();
        }
        else {
            alert("You poor XD");
        }
        save();
    });
});

function merge_cursors() {
    if ($('.lv1').length >= 3) {
        $('.lv1').slice(0,3).remove();
        cursorPerLV[0] -= 3;
        cursorPerLV[1] += 1;
        instantiateCursor();
        return true;
    }
    else if ($('.lv2').length >= 3) {
        $('.lv2').slice(0,3).remove();
        cursorPerLV[1] -= 3;
        cursorPerLV[2] += 1;
        instantiateCursor();
        return true;
    }
    else if ($('.lv3').length >= 3) {
        $('.lv3').slice(0,3).remove();
        cursorPerLV[2] -= 3;
        cursorPerLV[3] += 1;
        instantiateCursor();
        return true;
    }
    else if ($('.lv4').length >= 3) {
        $('.lv4').slice(0,3).remove();
        cursorPerLV[3] -= 3;
        cursorPerLV[4] += 1;
        instantiateCursor();
        return true;
    }
    else {
        return false;
    }
}

async function save() {
    localStorage.setItem("totalMoney", totalMoney);
    localStorage.setItem("totalSpend", totalSpend);
    localStorage.setItem("clickCounter", clickCounter);
    localStorage.setItem("money", money);
    localStorage.setItem("moneyPerClick", moneyPerClick);
    localStorage.setItem("price_income", price_income);
    localStorage.setItem("price_add_cursor", price_add_cursor);
    localStorage.setItem("price_merge_cursor", price_merge_cursor);
    localStorage.setItem("price_cursor_income", price_cursor_income);
    localStorage.setItem("price_cursor_speed", price_cursor_speed);
    localStorage.setItem("OMEGAPRICE", OMEGAPRICE);
};

async function show_money(){
    let money_to_show = money;
    if (money_to_show < 1000) {
        $("#money").text(money_to_show.toFixed(1) + " $");
    }
    else if (money_to_show > 1000 && money_to_show < 1000000) {
        money_to_show = (money_to_show / 1000).toFixed(1) + "k";
        $("#money").text(money_to_show + " $");
    }
    else if (money_to_show > 1000000 && money_to_show < 1000000000) {
        money_to_show = (money_to_show / 1000000).toFixed(1) + "M";
        $("#money").text(money_to_show + " $");
    }
    else if (money_to_show > 1000000000 && money_to_show < 1000000000000) {
        money_to_show = (money_to_show / 1000000000).toFixed(1) + "B";
        $("#money").text(money_to_show + " $");
    }
    else if (money_to_show > 1000000000000){
        money_to_show = (money_to_show / 1000000000000).toFixed(1) + "T";
        $("#money").text(money_to_show + " $");
    }
};

async function show_money_per_click(){
    let moneyPerClick_to_show = moneyPerClick;
    if (moneyPerClick_to_show < 1000) {
        $("#moneyPerClick").text(moneyPerClick_to_show.toFixed(1) + " $/click");
    }
    else if (moneyPerClick_to_show > 1000 && moneyPerClick_to_show < 1000000) {
        moneyPerClick_to_show = (moneyPerClick_to_show / 1000).toFixed(1) + "k";
        $("#moneyPerClick").text(moneyPerClick_to_show + " $/click");
    }
    else if (moneyPerClick_to_show > 1000000 && moneyPerClick_to_show < 1000000000) {
        moneyPerClick_to_show = (moneyPerClick_to_show / 1000000).toFixed(1) + "M";
        $("#moneyPerClick").text(moneyPerClick_to_show + " $/click");
    }
    else if (moneyPerClick_to_show > 1000000000 && moneyPerClick_to_show < 1000000000000) {
        moneyPerClick_to_show = (moneyPerClick_to_show / 1000000000).toFixed(1) + "B";
        $("#moneyPerClick").text(moneyPerClick_to_show + " $/click");
    }
    else if (moneyPerClick_to_show > 1000000000000){
        moneyPerClick_to_show = (moneyPerClick_to_show / 1000000000000).toFixed(1) + "T";
        $("#moneyPerClick").text(moneyPerClick_to_show + " $/click");
    }
};


async function show_money_per_second(){
    let moneyPerSecond_to_show = moneyPerSecond;
    if (moneyPerSecond_to_show < 1000) {
        $("#moneyPerSecond").text(moneyPerSecond_to_show.toFixed(1) + " $/s");
    }
    else if (moneyPerSecond_to_show > 1000 && moneyPerSecond_to_show < 1000000) {
        moneyPerSecond_to_show = (moneyPerSecond_to_show / 1000).toFixed(1) + "k";
        $("#moneyPerSecond").text(moneyPerSecond_to_show + " $/s");
    }
    else if (moneyPerSecond_to_show > 1000000 && moneyPerSecond_to_show < 1000000000) {
        moneyPerSecond_to_show = (moneyPerSecond_to_show / 1000000).toFixed(1) + "M";
        $("#moneyPerSecond").text(moneyPerSecond_to_show + " $/s");
    }
    else if (moneyPerSecond_to_show > 1000000000 && moneyPerSecond_to_show < 1000000000000) {
        moneyPerSecond_to_show = (moneyPerSecond_to_show / 1000000000).toFixed(1) + "B";
        $("#moneyPerSecond").text(moneyPerSecond_to_show + " $/s");
    }
    else if (moneyPerSecond_to_show > 1000000000000){
        moneyPerSecond_to_show = (moneyPerSecond_to_show / 1000000000000).toFixed(1) + "T";
        $("#moneyPerSecond").text(moneyPerSecond_to_show + " $/s");
    }
};


async function load() {
    money = parseFloat(localStorage.getItem("money"));
    totalMoney = parseFloat(localStorage.getItem("totalMoney"));
    totalSpend = parseFloat(localStorage.getItem("totalSpend"));
    moneyPerClick = parseFloat(localStorage.getItem("moneyPerClick"));
    clickCounter = parseFloat(localStorage.getItem("clickCounter"));
    price_income = parseFloat(localStorage.getItem("price_income"));
    OMEGAPRICE = parseFloat(localStorage.getItem("OMEGAPRICE"));
    show_money();
    show_money_per_click();
};

async function buttonVerification() {
    buttonIncomeVerification();
    buttonUpgradeVerification();
    buttonAddCursorVerification();
    buttonMergeCursorVerification();
    buttonCursorIncomeVerification();
    buttonCursorSpeedVerification();
}

async function buttonIncomeVerification() {
    const buttonIncome = $(".increase_income");
    if (money < price_income) {
        buttonIncome.addClass('disabled');
        buttonIncome.css('background-image', 'url("assets/images/Upgrade_increase_income_disable.svg")');
    }
    else {
        buttonIncome.removeClass('disabled');
        buttonIncome.css('background-image', 'url("assets/images/Upgrade_increase_income.svg")');
    }
};

async function buttonUpgradeVerification() {
    const buttonUpgrade = $(".upgrade_button");
    if (money < OMEGAPRICE) {
        buttonUpgrade.addClass('disabled');
        buttonUpgrade.css('background-image', 'url("assets/images/Upgrade_button_disable.svg")');
    }
    else {
        buttonUpgrade.removeClass('disabled');
        buttonUpgrade.css('background-image', 'url("assets/images/Upgrade_button.svg")');
    }
}

async function buttonAddCursorVerification() {
    const buttonAddCursor = $(".add_cursor");
    if (money < price_add_cursor) {
        buttonAddCursor.addClass('disabled');
        buttonAddCursor.css('background-image', 'url("assets/images/Upgrade_add_cursor_disable.svg")');
    }
    else {
        buttonAddCursor.removeClass('disabled');
        buttonAddCursor.css('background-image', 'url("assets/images/Upgrade_add_cursor.svg")');
    }
}

async function buttonMergeCursorVerification() {
    const buttonMergeCursor = $(".merge_cursors");
    if (money < price_merge_cursor) {
        buttonMergeCursor.addClass('disabled');
        buttonMergeCursor.css('background-image', 'url("assets/images/Upgrade_merge_cursors_disable.svg")');
    }
    else {
        buttonMergeCursor.removeClass('disabled');
        buttonMergeCursor.css('background-image', 'url("assets/images/Upgrade_merge_cursors.svg")');
    }
}

async function buttonCursorIncomeVerification() {
    const buttonCursorIncome = $(".cursor_income");
    if (money < price_cursor_income) {
        buttonCursorIncome.addClass('disabled');
        buttonCursorIncome.css('background-image', 'url("assets/images/Upgrade_cursor_income_disable.svg")');
    }
    else {
        buttonCursorIncome.removeClass('disabled');
        buttonCursorIncome.css('background-image', 'url("assets/images/Upgrade_cursor_income.svg")');
    }
}

async function buttonCursorSpeedVerification() {
    const buttonCursorSpeed = $(".cursor_speed");
    if (money < price_cursor_speed) {
        buttonCursorSpeed.addClass('disabled');
        buttonCursorSpeed.css('background-image', 'url("assets/images/Upgrade_cursor_speed_disable.svg")');
    }
    else {
        buttonCursorSpeed.removeClass('disabled');
        buttonCursorSpeed.css('background-image', 'url("assets/images/Upgrade_cursor_speed.svg")');
    }
}