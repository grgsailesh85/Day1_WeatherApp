// for weather API : - opeweathermap.org
const apiKey = "675d75efdef09fdffbc8ba4c0dcf6040";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//selects an input field and a button element from the document, "searchBox" variable holds the refernce to input field and "searchBtn" variable will hold a reference to the button element
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

//async function helps us to write code that deals with asynchronous tasks like fetching data from a server
async function checkWeather(city){
  //this line of code is asking the server (defined by 'apiUrl') to give some data and waiting for the server to respond, once it does the response is stored in the 'response' variable for further use
  const response =  await fetch (apiUrl + city + `&appid=${apiKey}`);


  //if the http response status is '404' then this code makes the element with class ".error" visible (by setting its display property to "block") and hides the element with the class ".weather" (by setting its diplay property to "none").
  if (response.status == 404){
    document.querySelector(".error").style.display ="block";
    document.querySelector(".weather").style.display ="none";
  } else {
    //takes the response from the server (which is typically in JSON format), converts it into a JS object and store it into variable "data" so that we can work it more easily in our code
    var data = await response.json();
    console.log(data);
    document.querySelector(".city").innerHTML = data.name
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed+"Km/Hrs";

    //changes the displayed weather icon based on the weather condition obtained from the "data" object and each weather conditon has a corresponding images associated with it 
    if(data.weather[0].main == "Clouds"){
      weatherIcon.src="/images/clouds.png"
    }
    else if(data.weather[0].main == "Clear"){
      weatherIcon.src = "/images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
      weatherIcon.src="/images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
      weatherIcon.src="/images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
      weatherIcon.src="/images/mist.png";
    }


    //"display:none" hides an element completely while "display:block" makes an element a block level element and display it on the webpage
    document.querySelector(".weather").style.display ="block";
    document.querySelector(".error").style.display ="none";

  }

}



//when the button("searchBtn") is clicked, the "checkWeather" function is called with the value entered in the search input field ("searchBox.value") as its arguments
searchBtn.addEventListener("click",()=>{
  checkWeather(searchBox.value);
})