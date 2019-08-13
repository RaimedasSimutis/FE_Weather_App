const inputForma = document.querySelector(".inputForm");
const forecastArea = document.querySelector(".forecastArea");
const showMoreBtnContainer = document.querySelector(".showMoreBtnContainer");
const showMoreBtn = document.querySelector(".showMoreBtn");
let forecastBoxes =[];
const apiKey = '664dc2a980e78df9f61e90ad60eb47cd';
let forecastBox = {};
let cityInput;


const addForecastBox = (box) => {
    forecastBoxes.push(box);
    //console.log(`Galutinis objektas: ${forecastBoxes}`);
    generateForecastBoxes(forecastBoxes);
}

const endpointRequest = (city) => {
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${apiKey}`;

    fetch (url)
    .then(function(response){
        return response.json()
    }) 
    .then(function(result){
        //console.log(result)

        forecastBox = {
            city: result.city.name,
            icon: result.list[0].weather[0].icon,
            temperature: result.list[0].main.temp-273,
            description: result.list[0].weather[0].main,
            humidity: result.list[0].main.humidity,
            date: result.list[0].dt_txt,
        }

    addForecastBox(forecastBox);

    })
    .catch(function(error){
        //console.log(error)
        alert("Ups!... City not found")
    })
    
    return forecastBox;
}

const generateForecastBoxes = (forecastBoxesArr) => {
    forecastArea.innerHTML = '';
    
    forecastBoxesArr.forEach(element => {

        //creating HTML elements
        const forecastBoxDiv = document.createElement('div');
        const cityDiv = document.createElement('h2');
        const iconDiv = document.createElement('img');
        const temperatureDiv = document.createElement('p');
        const descriptionDiv = document.createElement('p');
        const humidityDiv = document.createElement('p');
        const dateDiv = document.createElement('p');
        const deleteBtn = document.createElement('div');
        const deleteBtnLine1 = document.createElement('div');
        const deleteBtnLine2 = document.createElement('div');

        //add class name to main forecast box div
        forecastBoxDiv.classList.add('forecastBox');
        deleteBtn.classList.add('deleteBtn');
        deleteBtnLine1.classList.add('deleteBtnLine1');
        deleteBtnLine2.classList.add('deleteBtnLine2');

        //add content to created HTML elements
        cityDiv.textContent = element.city;
        iconDiv.src = `http://openweathermap.org/img/wn/${element.icon}@2x.png`;
        temperatureDiv.textContent = `Temperature: ${element.temperature.toFixed(2)} ℃`;
        descriptionDiv.textContent = `Description: ${element.description}`;
        humidityDiv.textContent = `Humidity: ${element.humidity}%`;
        dateDiv.textContent = `Retrieved on ${element.date}`;
        //deleteBtn.textContent = 'x';

        //append HTML elements
        forecastBoxDiv.appendChild(cityDiv);
        forecastBoxDiv.appendChild(iconDiv);
        forecastBoxDiv.appendChild(temperatureDiv);
        forecastBoxDiv.appendChild(descriptionDiv);
        forecastBoxDiv.appendChild(humidityDiv);
        forecastBoxDiv.appendChild(dateDiv);
        deleteBtn.appendChild(deleteBtnLine1);
        deleteBtn.appendChild(deleteBtnLine2);
        forecastBoxDiv.appendChild(deleteBtn);
        forecastArea.appendChild(forecastBoxDiv);


        deleteBtn.addEventListener('click', (e) => {
            //console.log(forecastBoxes);
            forecastBoxDiv.remove();

            //console.log(forecastBoxes);
            forecastBoxes = forecastBoxes.filter(el => el.city !== element.city);
            // forecastBoxes = forecastBoxes.filter(function (params) {
            //     console.log(params.city);
            //     //console.log(forecastBox.city);
            //console.log(forecastBoxes);
            // })

            
        })

        
        showMoreBtnVisibility();

    });
}

inputForma.addEventListener("submit", (event) => {
    event.preventDefault();
    cityInput = event.target.elements.cityInput.value;
    console.log(cityInput);
    const check = forecastBoxes.find(forecastBox => {
        return forecastBox.city.toLowerCase() === cityInput.trim().toLowerCase();
    });
    
    if (cityInput ==="") {
        alert('City not entered');
    }

    else if (check) {
        console.log("City is already in the list");
        alert('City is already in the list');
    }
    else {
        endpointRequest(cityInput);
    }

    //const note = event.target.elements.note.value

    // addNote(note);
    //}
})

const showMoreBtnVisibility = () => {
    if (forecastArea.offsetHeight === forecastArea.scrollHeight) {
        showMoreBtnContainer.style.display="none";
    } else {
        showMoreBtnContainer.style.display="initial";
    } 
}

showMoreBtn.addEventListener("click", () => {
    console.log("show more suveike");
    forecastArea.style.height = `${forecastArea.scrollHeight}px`;
    showMoreBtnContainer.style.display="none";
})
