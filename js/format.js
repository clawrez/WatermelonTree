function zeroformat(amount) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10, power);
    if (power < 6) return amount.toFixed(0);
    return mantissa.toFixed(2) + "e" + power;
}

function oneformat(amount) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10, power);
    if (power < 6) return amount.toFixed(1);
    return mantissa.toFixed(2) + "e" + power;
}

function twoformat(amount) {
    let power = Math.floor(Math.log10(amount));
    let mantissa = amount / Math.pow(10, power);
    if (power < 6) return amount.toFixed(2);
    return mantissa.toFixed(2) + "e" + power;
}