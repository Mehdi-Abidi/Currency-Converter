const DATE = "latest"; 
const API_VERSION = "v1";
const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${DATE}/${API_VERSION}`;
const drp = document.querySelectorAll(".dropdown select");

for (let select of drp) {
    for (let cc in countryList) {
        let no = document.createElement("option");
        no.innerText = cc;
        no.value = cc;
        if (select.name === "from" && cc === "USD") {
            no.selected = "selected";
        } else if (select.name === "to" && cc === "PKR") {
            no.selected = "selected";
        }
        select.append(no);
    }
    select.addEventListener("change", (evt) => {
        flag(evt.target);
    });
}

const flag = (el) => {
    let cc = el.value;
    let coc = countryList[cc];
    let lnk = `https://flagsapi.com/${coc}/flat/64.png`;
    let image = el.parentElement.querySelector("img");
    image.src = lnk;
};

let btn = document.querySelector("form button");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    update();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    update();
});

const update = async () => {
    let inpt = document.querySelector(".amount input");
    let amnt = inpt.value;
    if (amnt === null || amnt <= 0) {
        amnt = 1;
        inpt.value = 1;
    }
    const lnk = `${BASE_URL}/currencies/${from.value.toLowerCase()}.json`;
    let response = await fetch(lnk);
    let data = await response.json();
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    let con = amnt * rate;
    msg.innerText = `${amnt} ${from.value}\t\t=\t\t${con} ${to.value}`;
};
