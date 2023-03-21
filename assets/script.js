//adding functions to fetch data from openweather api
var cityV = "San Francisco";
// var cityV = inputFieldV.value;
var firstPageLoad = false;

var entryGetArray = [];

// cityV = document.getElementById("searchField");


forecastGenerator();
fiveDayForecastGenerator();
pageLoadSearchHistory();
firstPageLoad = true;


console.log("*** array length :" + entryGetArray.length);

function searchF() {
console.log("search button pressed");
var inputFieldV = document.getElementById("searchField"); 
var cityV = inputFieldV.value;

forecastGenerator();
fiveDayForecastGenerator();

// add the inputFieldV.value to the localStorage then call on pageLoadSearchHistory()

var entryCounterVariable = 0;

for (let x=0; x < localStorage.length; x++) {
  data2 = JSON.parse(localStorage.getItem(localStorage.key(x)));
  console.log(localStorage.key(x));
  if(data2.numberID432 > 0) {
    console.log("not null or undefined");
    entryCounterVariable++;
    console.log("entryCounterVariable :" + entryCounterVariable);
  }
}

if (entryCounterVariable >= 10) {
for (let i=1; i < 11; i++) {
  console.log("entry counter variable - i :" + (entryCounterVariable - i));
  document.getElementById("sideBar").removeChild(document.getElementById("searchHistoryB" + i));
}
} else if (entryCounterVariable < 10) {
  for (let i=0; i<entryCounterVariable; i++){
  console.log("entry counter variable is :" + (entryCounterVariable - i));
  document.getElementById("sideBar").removeChild(document.getElementById("searchHistoryB" + (entryCounterVariable - i)));
  }
}

console.log("entryCounterVariable + 1 test :" + (entryCounterVariable + 1));
var obj = {
  city: cityV,
  numberID432: entryCounterVariable + 1
}

localStorage.setItem(["searchList" + (entryCounterVariable + 1)], JSON.stringify(obj));








pageLoadSearchHistory();

}


function forecastGenerator() {

var d = new Date();
if(firstPageLoad == true) {
var inputFieldV = document.getElementById("searchField"); 
var cityV = inputFieldV.value;
}
else{ cityV = "san francisco"}

fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityV + "&units=imperial&appid=cdeb5eab3035bea060cf39ed07d9292d").then((res) => res.json()).then(function (data) {
 console.log(data);

 console.log(data.weather[0].icon);
 document.getElementById("cityNameAndDate").innerHTML = data.name + " > " + (d.getMonth() + 1)+ "-" + d.getDate()+"-" + d.getFullYear();
 document.getElementById("weatherIconForecast").setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png" );

 document.getElementById("tempForecast").innerHTML ="Temp :" + data.main.temp + " F";
 document.getElementById("windSpeedForecast").innerHTML = "Wind Speed :" + data.wind.speed + " MPH";
 document.getElementById("humidityForecast").innerHTML = "Humidity :" + data.main.humidity + "%";
 console.log(cityV);
} 
)

}


function fiveDayForecastGenerator() {

//i can still have this be my function if i add the inputfieldvalue variable from cityV and put if statement if there already 5 cards then delete 5 cards and regenerate the five cards

//then finish up the search bar history, run a for loop looking through local storage for the specific key pertaining to this application then add to array and get the array.length and then x-- from the top for the last 10 searches because there will be a key value pair that gets added to the local storage that is the array.length + 1 for every addition.


if(firstPageLoad == true) {
 var inputFieldV = document.getElementById("searchField");
 var cityV = inputFieldV.value;
 for (let i=1; i<6; i++) {
   document.getElementById("fiveDayForecast").removeChild(document.getElementById("cardEl" + i));
   console.log("removed cardEl" + i);
 }
}
else {
 cityV = "san francisco";
}

console.log("five day forecast for :" + cityV);
fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityV + "&units=imperial&appid=cdeb5eab3035bea060cf39ed07d9292d").then((res) => res.json()).then(function (data) {
 console.log(data);


 //for the five or four day forecast
var countVariable = 0;
 for (x=5;x < data.list.length; x++) {
console.log("data list length :" + data.list.length);
  if (x % 8 == 5) {
   countVariable++;
   var cardEl = document.createElement("div");

   cardEl.setAttribute("id", "cardEl" + countVariable);

   document.getElementById("fiveDayForecast").appendChild(cardEl);

   //card style
   document.getElementById("cardEl" + countVariable).style.display = "flex";
   document.getElementById("cardEl" + countVariable).style.flexDirection = "column";
   document.getElementById("cardEl" + countVariable).style.width = "200px";
   document.getElementById("cardEl" + countVariable).style.height = "200px";
   document.getElementById("cardEl" + countVariable).style.backgroundColor = "lightskyblue";
   document.getElementById("cardEl" + countVariable).style.border = "2px solid pink";
   document.getElementById("cardEl" + countVariable).style.margin = "15px";


   //create all the text boxes for the card
   cardDateEl = document.createElement("div");
   weatherIconEl = document.createElement("img");
   tempEl = document.createElement("div");
   windSpeedEl = document.createElement("div");
   humidityEl = document.createElement("div");

   cardDateEl.setAttribute("id", "cardDate" + countVariable);
   weatherIconEl.setAttribute("id", "weatherIcon" + countVariable);
   tempEl.setAttribute("id", "temp" + countVariable);
   windSpeedEl.setAttribute("id", "windSpeed" + countVariable);
   humidityEl.setAttribute("id", "humidity" + countVariable);

   cardEl.appendChild(cardDateEl)
   cardEl.appendChild(weatherIconEl);
   cardEl.appendChild(tempEl);
   cardEl.appendChild(windSpeedEl);
   cardEl.appendChild(humidityEl);


   weatherIconEl.style.width = "60px";
   weatherIconEl.style.height = "60px";

   cardDateEl.innerHTML = data.list[x].dt_txt;
   weatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[x].weather[0].icon + "@2x.png");
   console.log(data.list[x].weather[0].icon);
   tempEl.innerHTML = "temp :" + data.list[x].main.temp + " F";
   windSpeedEl.innerHTML = "wind speed :" + data.list[x].wind.speed + " MPH";
   humidityEl.innerHTML = "humidity :" + data.list[x].main.humidity + "%"; 

 console.log(x % 8);
  }
 }



});

};
//for loop with i=5 with if statement for modulus remainder = 5 is if(i % 8 == 5)

//now for the finale, build search bar history starting with 


function pageLoadSearchHistory() {

var cityObj = {};
 var entryGetArray = [];

 console.log(entryGetArray);

for (let x=0; x < localStorage.length; x++) {
 console.log("length of :" + localStorage.length);
 data = JSON.parse(localStorage.getItem(localStorage.key(x)));
 console.log(localStorage.key(x));
 console.log("this is data :" + JSON.stringify(data));
 console.log(data.city);
 console.log(x);

// have to write another for loop for comparing data.numberID432 with x

 for (let y=0; y < (localStorage.length + 1); y++) {
 if (data.numberID432 ==  y) {
  console.log("for loop y got procced")
  console.log("found searchList entry");
  const obj = {
         "city" : data.city, 
         "numberID432" : data.numberID432
        };
  
  entryGetArray.push(obj);
  console.log(JSON.stringify(entryGetArray));
   console.log("entryGetArray is :" +JSON.stringify(entryGetArray));

 } else {
  console.log("not a searchList entry");
 }
}
}

console.log("entrygetarray :" + JSON.stringify(entryGetArray));


//finally got data from local storage and pushed it to array

//now write for loop that gets the length of entryGetArray then counts backwards for the searchList[#] then generates button with name of city that was last searched

console.log("entryGetArray length is :" + entryGetArray.length);

// *********

var tenEntryCounter = 0;

for (let i=(entryGetArray.length + 1); i > (entryGetArray.length - 10); i--) {
 console.log("i :" + i);
 console.log("for loop for adding buttons procced - entryGetArray.length loop");
for (let s=0; s < entryGetArray.length; s++) {
if (entryGetArray[s].numberID432 == i) {
  tenEntryCounter++;
 searchHistoryBtn = document.createElement("button");
 searchHistoryBtn.setAttribute("id", "searchHistoryB" + tenEntryCounter);
 searchHistoryBtn.setAttribute("onClick", "historyButtonPressed"+tenEntryCounter+"()");


 searchHistoryBtn.style.marginTop = "10px";
 searchHistoryBtn.style.height = "50px";
 searchHistoryBtn.style.backgroundColor = "dodgerblue";
 searchHistoryBtn.style.borderRadius = "2rem";
 searchHistoryBtn.style.fontFamily = "Black Ops One";

 document.getElementById("sideBar").appendChild(searchHistoryBtn);

 console.log("entryGetArray[s].city :" + entryGetArray[s].city);
  // searchHistoryBtn.innerHTML = entryGetArray[s].city + " : " + entryGetArray[s].numberID432;
    searchHistoryBtn.innerHTML = entryGetArray[s].city;
}
}
}
console.log("entryGetArray length is :" + entryGetArray.length);
};


//make onClick="" function for changing the value within the text area to the button pressed then have it run searchF() at the end of the function

function historyButtonPressed1() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB1").innerHTML);
  document.getElementById("searchField").value = document.getElementById("searchHistoryB1").innerHTML;
  searchF();
};

function historyButtonPressed2() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB2").innerHTML);
    document.getElementById("searchField").value = document.getElementById("searchHistoryB2").innerHTML;
    searchF();
};

function historyButtonPressed3() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB3").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB3").innerHTML;
    searchF();
};

function historyButtonPressed4() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB4").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB4").innerHTML;
    searchF();

};

function historyButtonPressed5() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB5").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB5").innerHTML;
    searchF();
};

function historyButtonPressed6() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB6").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB6").innerHTML;
    searchF();
};

function historyButtonPressed7() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB7").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB7").innerHTML;
    searchF();
};

function historyButtonPressed8() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB8").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB8").innerHTML;
    searchF();
};

function historyButtonPressed9() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB9").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB9").innerHTML;
    searchF();
};

function historyButtonPressed10() {
  console.log("history button pressed");
  console.log(document.getElementById("searchHistoryB10").innerHTML);
      document.getElementById("searchField").value = document.getElementById("searchHistoryB10").innerHTML;
    searchF();
};