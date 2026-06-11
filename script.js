

const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurrency=document.querySelector(".from select");
const toCurrency=document.querySelector(".to select");
const msg=document.querySelector(".msg");

const updateExchangeRate=async()=>{
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if(amtvalue===""||amtvalue<1){
        amtvalue=1;
        amount.value="1";
    }
   const base_url=`https://v6.exchangerate-api.com/v6/6df682410562cabc8e13cca1/latest/${fromCurrency.value}`;
   let response=await fetch(base_url);
   let data=await response.json();
   let rate=data.conversion_rates[toCurrency.value];
   console.log(rate);

   let finalamt=amtvalue*rate;
   msg.innerText=`${amtvalue} ${fromCurrency.value}= ${finalamt} ${toCurrency.value} `;
}


for(let select of dropdowns){
   for (let currcode in countryList){
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if( select.name=="from" && currcode==="AED"){
        newoption.selected="selected";
    }
    else if( select.name=="to" && currcode==="INR"){
         newoption.selected="selected";
    }
    select.append(newoption);
   }
   select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
   })
}
const updateflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
button.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
})
window.addEventListener("load",()=>{
    updateExchangeRate();
})

