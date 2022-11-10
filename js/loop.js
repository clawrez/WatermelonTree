function gameLoop(that){
    let diff = (Date.now() - that.player.lastUpdate)/1000
    let x;
    if (this.player.watermelons >= this.player.gardenCapacity){x=0; this.player.watermelons = this.player.gardenCapacity}
    else{x = that.player.automationUpgrades[0].effect * that.player.watermelonYield * that.player.automationUpgrades[0].bought}
    that.player.watermelons += x*diff;
    that.player.lastUpdate = Date.now();
}