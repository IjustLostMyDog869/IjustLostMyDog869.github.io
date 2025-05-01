function calculate() {
    let principal = Number(document.getElementById("principal").value);
    let interest = Number(document.getElementById("interest").value) / 100;
    let years = Number(document.getElementById("years").value);
    let payment = Number(document.getElementById("payment").value);
    let monthsPerYear = 12;

    let r = interest / monthsPerYear;
    let n = monthsPerYear * years;

    let onePlusRToN = Math.pow(1 + r, n);
    let balance = (principal * onePlusRToN) - (payment * ((onePlusRToN - 1) / r));

    let out = document.getElementById("output");
    out.innerText = "Remaining Balance: $" + balance.toFixed(2);
}

function reset() {
    document.getElementById("principal").value = "";
    document.getElementById("interest").value = "";
    document.getElementById("years").value = "";
    document.getElementById("payment").value = "";
    document.getElementById("output").innerText = "";
}
