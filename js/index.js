var app = new Vue({
    el: "#app",
    data: {
        player: player,
    },
    methods: {
        waitADay(){
            if(this.player.watermelons + this.player.watermelonYield >= this.player.gardenCapacity){this.player.watermelons = this.player.gardenCapacity - this.player.watermelonYield}
            this.player.watermelons += this.player.watermelonYield;
        },
        autoWaitADay(){
            if(this.player.watermelons + this.player.watermelonYield >= this.player.gardenCapacity){this.player.watermelons = this.player.gardenCapacity - this.player.watermelonYield}
            this.player.watermelons += this.player.watermelonYield*this.player.automationUpgrades[0].effect;
        },
        sell(){
            this.player.money += this.player.watermelonSellPrice * this.player.watermelons;
            this.player.watermelons = 0;
        },
        buywatermelonTreeUpgrade(i) {
            let g = this.player.treeUpgrades[i]
            if(g.cost > this.player.money){return};
            this.player.money -= g.cost;
            this.player.treeUpgrades[i].cost *= 1 + (i+1)*1.55
            this.player.treeUpgrades[i].bought++
            this.player.watermelonYield += this.player.treeUpgrades[i].yield;
        },
        buyMAXwatermelonTreeUpgrade(i) {
            let g = this.player.treeUpgrades[i]
            while(g.cost <= this.player.money){this.buywatermelonTreeUpgrade(i)};
            // return
        },
        buywatermelonMoneyUpgrade(i) {
            let g = this.player.moneyUpgrades[i]
            if(g.cost > this.player.money){return};
            this.player.money -= g.cost;
            this.player.moneyUpgrades[i].cost *= 1 + ((i/5)+1)*1.25
            this.player.moneyUpgrades[i].bought++
            this.player.watermelonSellPrice += this.player.moneyUpgrades[i].yield;
        },
        buyMAXwatermelonMoneyUpgrade(i) {
            let g = this.player.moneyUpgrades[i]
            while(g.cost <= this.player.money){this.buywatermelonMoneyUpgrade(i)};
            // return
        },
        buyFirstAutomationUpgrade(){
            let g = this.player.automationUpgrades[0]
            if(g.cost > this.player.money){return};
            this.player.money -= g.cost;
            this.player.automationUpgrades[0].cost *= 1.5 + ((1/7.5))*1.75
            this.player.automationUpgrades[0].bought++
        },
        buyMAXFirstAutomationUpgrade(i) {
            let g = this.player.automationUpgrades[0]
            while(g.cost <= this.player.money){this.buyFirstAutomationUpgrade()};
            // return
        },
        zeroformat(amount) {
            return zeroformat(amount)
        },
        oneformat(amount) {
            return oneformat(amount)
        },
        twoformat(amount) {
            return twoformat(amount)
        },
        gameLoop() {
            gameLoop(this)
        },
        mainMenu() {
            let x = document.getElementById("main-container");
            if (x.style.display = "none"){

            document.getElementById("renovation-container").style.display = "none";
            document.getElementById("options-container").style.display = "none";

            x.style.display = "inline-grid";
            }
        },
        renovationMenu() {
            let x = document.getElementById("renovation-container");
            if (x.style.display = "none"){

            document.getElementById("main-container").style.display = "none";
            document.getElementById("options-container").style.display = "none";

            x.style.display = "inline";
            }
        },
        optionsMenu() {
            let x = document.getElementById("options-container");
            if (x.style.display = "none"){
            
            document.getElementById("renovation-container").style.display = "none";
            document.getElementById("main-container").style.display = "none";

            x.style.display = "inline";
            }
        },
        save() {
            x = document.getElementById("saveButton")
            x.innerHTML = "Saved!"
            localStorage.setItem("gameSave", btoa(JSON.stringify(player)));
            console.log("Saved!!!");
            setTimeout(() => {  x.innerHTML = "Save"; }, 1000);
        },
        load(){
            var loadedSave = localStorage.getItem("gameSave");
            if (loadedSave===null) return;
            decoded = JSON.parse(atob(loadedSave));
            for (let item in decoded) player[item] = decoded[item]
            console.log("Loaded!!!")
        },
        reset(){
            if (confirm("Are you sure you want to reset?")){
                localStorage.clear();
                location.reload();
            }else{return}
        },
        kiss(){
            x = document.getElementById("kiss")
            x.innerHTML = "*mwah*"
            setTimeout(() => {  x.innerHTML = "Kiss Clawrez"; }, 1000);
        }
        },
    mounted(){
        this.load();
        setInterval(this.gameLoop, 50);
        setInterval(this.save, 15000);
    }
})