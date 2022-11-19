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
            if(this.player.watermelons < 0.5){return}
            this.player.money += this.player.watermelonSellPrice * this.player.watermelons;
            this.player.watermelons = 0;
        },
        toggleBuyMax(){
            if (this.player.buyMax == false){
                this.player.buyMax = true;
                document.getElementById("max-button").style.borderColor = "rgb(175, 224, 110)";
                document.getElementById("max-button").style.color = "rgb(175, 224, 110)";
                return
            }
            if(this.player.buyMax == true){
                this.player.buyMax = false;
                document.getElementById("max-button").style.borderColor = "rgb(175, 75, 75)";
                document.getElementById("max-button").style.color = "rgb(175, 75, 75)";
                return
            }
        },
        buyTree(i){
            if (this.player.buyMax){this.buyMAXwatermelonTreeUpgrade(i)}
            if (!this.player.buyMax){this.buywatermelonTreeUpgrade(i)}
        },
        buywatermelonTreeUpgrade(i) {
            let g = this.player.treeUpgrades[i]
            if(g.cost > this.player.money){return};
            this.checkLocked();
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
        buyMoney(i){
            if (this.player.buyMax){this.buyMAXwatermelonMoneyUpgrade(i)}
            if (!this.player.buyMax){this.buywatermelonMoneyUpgrade(i)}
        },
        buywatermelonMoneyUpgrade(i) {
            let g = this.player.moneyUpgrades[i]
            if(g.cost > this.player.money){return};
            this.checkLocked();
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
        buyFA(){
            if (this.player.buyMax){this.buyMAXFirstAutomationUpgrade()}
            if (!this.player.buyMax){this.buyFirstAutomationUpgrade()}
        },
        buyFirstAutomationUpgrade(){
            let g = this.player.automationUpgrades[0]
            if(g.cost > this.player.money){return};
            this.checkLocked();
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

            x.style.display = "flex";
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
            this.player.kisses ++
            setTimeout(() => {  x.innerHTML = "Kiss Clawrez (" + this.player.kisses + ")"; }, 1000);
            
        },
        checkLocked(){
            if(this.player.treeUpgrades[0].bought != 0){
                document.getElementById("money-upgrades").classList.remove("locked")
            }
            if(this.player.moneyUpgrades[0].bought != 0){
                document.getElementById("automation-upgrades").classList.remove("locked")
            }
        },
        checkVersion(){
            if (this.player.version != "0.1a"){
                this.player.version = "0.1a"
            }
        }
        },
    mounted(){
        this.load();
        this.checkLocked();
        this.checkVersion();
        this.toggleBuyMax();
        this.toggleBuyMax();
        setInterval(this.gameLoop, 50);
        setInterval(this.save, 15000);
    }
})