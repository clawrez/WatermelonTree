
var player = {
    version: "0.1a",
    watermelons: 0, // main currency
    money: 0, // main currency 2
    watermelonYield: 1, // click to increment watermelons by this
    watermelonSellPrice: 1,
    gardenCapacity: 100,
    sellerDayCounter: 1,
    treeUpgrades: [], // upgrade watermelon yield per day
    moneyUpgrades: [], // upgrade money yield
    automationUpgrades: [], // automate things
    buyMax: false,
    kisses: 0,
    renovate: { // prestige
        cost: 1000,
        renovatePointYield: 1,
        renovated: 0,
    }, 
    lastUpdate: Date.now()
}

var firstTreeUpgrade = {
    name: "Hydration Moderation",
    cost: 10,
    yield: 1,
    bought: 0,
}

var secondTreeUpgrade = {
    name: "Air Moderation",
    cost: 250,
    yield: 5,
    bought: 0,
}

var thirdTreeUpgrade = {
    name: "Temperature Moderation",
    cost: 1250,
    yield: 25,
    bought: 0,
}

var fourthTreeUpgrade = {
    name: "Fertilisation",
    cost: 9375,
    yield: 125,
    bought: 0,
}

player.treeUpgrades.push(firstTreeUpgrade);
player.treeUpgrades.push(secondTreeUpgrade);
player.treeUpgrades.push(thirdTreeUpgrade);
player.treeUpgrades.push(fourthTreeUpgrade);

var firstMoneyUpgrade = {
    name: "Sweetness",
    cost: 100,
    yield: 0.05,
    bought: 0,
}

var secondMoneyUpgrade = {
    name: "Juiciness",
    cost: 500,
    yield: 0.3,
    bought: 0,
}

var thirdMoneyUpgrade = {
    name: "Rindlessness",
    cost: 3000,
    yield: 1.8,
    bought: 0,
}

var fourthMoneyUpgrade = {
    name: "Size",
    cost: 21000,
    yield: 9.6,
    bought: 0,
}

player.moneyUpgrades.push(firstMoneyUpgrade);
player.moneyUpgrades.push(secondMoneyUpgrade);
player.moneyUpgrades.push(thirdMoneyUpgrade);
player.moneyUpgrades.push(fourthMoneyUpgrade);

var firstAutomationUpgrade = {
    name: "Auto Wait",
    cost: 100,
    effect: 0.1,
    bought: 0,
}

// var secondAutomationUpgrade = {
//     name: "Auto Sell",
//     cost: 500,
//     effect: 100,
//     bought: 0,
// }

player.automationUpgrades.push(firstAutomationUpgrade);
// player.automationUpgrades.push(secondAutomationUpgrade);