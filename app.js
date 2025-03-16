const BASE_URL =
  "https://v6.exchangerate-api.com/v6/c959e03ddb271cea137df828/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
let msg = document.querySelector(".msg");

// adding select option of countries from codes.js file
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
  }

  select.addEventListener("change", (event) => {
    updateFlag(event.target); // calling updateFlag function  
  });
}
//updating flag img in select option based on cuurency code 
const updateFlag = (element) => {
  let currCode = element.value; 

  let countryCode = countryList[currCode];

  newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (event) => {
  event.preventDefault();
  msg.innerText = "Getting Exhange Rate.....";
  exchangerate();
});
//fetching exchangeRate 
const exchangerate = async () => {
  let amount = document.querySelector(".amount"); 
  console.log(amount);
  let amountval = amount.value; //taking amount value 
  console.log(amountval);
  if (amountval === "" || amountval < 1) {
    amountval = 1;
    amount.value = 1;
  } // anount should not be negative or empty

  console.log(fromCurr.value, toCurr.value);
  let URL = `${BASE_URL}/${fromCurr.value}`; // "https://v6.exchangerate-api.com/v6/c959e03ddb271cea137df828/latest/INR"
  let response = await fetch(URL);
  console.log(response);
  let data = await response.json(); //fetching INR exchange rate in json formate where based on INR amount all the countries_coversion rate is fetched
  console.log(data);
  let rates = data.conversion_rates[toCurr.value]; // example base code INR to USD: 0.01149
  console.log(rates);
  let finalrate = amountval * rates; // example user wrote 100 INR so 100 * 0.01149 = 1.149 dollar
  msg.innerText = `${amountval} ${fromCurr.value} = ${finalrate} ${toCurr.value}`;
};
