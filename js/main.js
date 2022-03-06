let yourlocation = document.getElementById('search');
async function search(a) {
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=dd4f1f1aa9354cb78aa204225221501&q=${a}&days=3`);
    if (apiResponse.ok && 400 != apiResponse.status) 
    {
        let parent = await apiResponse.json();
        displayCurrent(parent.location, parent.current);
        displayAnother(parent.forecast.forecastday);
    }
}
yourlocation.addEventListener("keyup", term => {

    if(term.target.value.length<2)
    {
        search("cairo");
    }
    else
    {
        search(term.target.value)
    }
    
});
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function displayCurrent(a, t) {
    if (null != t) {
        let currentDay = new Date(t.last_updated.replace(" ", "T"));
        let cartoona = `<div class="today forecast">
           <div class="forecast-header"  id="today">
              <div class="day">${days[currentDay.getDay()]}</div>
                 <div class=" date">${currentDay.getDate()+monthNames[currentDay.getMonth()]}</div>
                    </div> 
                     <div class="forecast-content" id="current">
                        <div class="location">${a.name}</div>
                           <div class="degree"> 
                                 <div class="num">${t.temp_c}<sup>o</sup>C</div>
                                     <div class="forecast-icon">
                                           <img src="https:${t.condition.icon}" alt="" width=90>
                                           </div>
                                              </div>
                                             <div class="custom">${t.condition.text}</div>
                                                <span><img src="images/icon-umberella.png" alt="">20%</span>
                                               <span><img src="images/icon-wind.png" alt="">18km/h</span>
                                               <span><img src="images/icon-compass.png" alt="">East</span>
                                                 </div>
                                                 </div>`;
        document.getElementById("forecast").innerHTML = cartoona;
    }
}

function displayAnother(a) {
    let cartoona = "";
    for (let i = 1; i < a.length; i++)
    {

        cartoona += `<div class="forecast">
                <div class="forecast-header">
                <div class="day">${days[new Date(a[i].date.replace(" ","T")).getDay()]}</div>
                 </div> 
                 <div class="forecast-content">
                   <div class="forecast-icon"> 
                    <img src="https:${a[i].day.condition.icon}" alt="" width=48>  
                     </div>
                     <div class="degree">${a[i].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${a[i].day.mintemp_c}<sup>o</sup></small>
                    <div class="custom">${a[i].day.condition.text}</div>
                     </div>
                       </div>`;

    } 
    document.getElementById("forecast").innerHTML += cartoona
}
search("cairo");

$('.menu-toggle').click(function()
{
    $('.mobile-navigation').slideToggle(1000);
});

