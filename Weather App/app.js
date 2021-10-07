let placeholderText,userLocation, cityName,cityNew, errMsg;
 placeholderText = document.getElementsByName('placeholder');
 userLocation = document.querySelector('.input');
 cityName = document.querySelector('.city-name');
 cityNew = document.querySelector('.city');
 errMsg = document.querySelector('.err-msg');
 

const changePlaceholderText = () => {
    if(placeholderText[0].placeholder === 'Type City Name'){
        placeholderText[0].placeholder = 'Daily updates';
    }
    else if(placeholderText[0].placeholder === 'Daily updates'){
        placeholderText[0].placeholder = 'Weather stories & News';
    }
    else if(placeholderText[0].placeholder === 'Weather stories & News'){
        placeholderText[0].placeholder = 'Search for your city';
    }
    else{
        placeholderText[0].placeholder = 'Type City Name';
    }
}; 

setInterval(changePlaceholderText, 2000);

const checkUserLocation = () =>{
   document.querySelector('.btn').addEventListener('click', () =>{
        if(userLocation.value === ''){
            placeholderText[0].placeholder = 'City Name Required';
            errMsg.textContent = 'City Name Required';
        }

        else{
            errMsg.textContent = '';
            weather()
            clearUserLocation()
        }
   });

   document.addEventListener('keypress', (event) => {
        if(event.keyCode === 13){
            if(userLocation.value === ''){
                placeholderText[0].placeholder = 'City Name Required';
                errMsg.textContent = 'City Name Required';
            }

            else{
                errMsg.textContent = '';
                weather()
                clearUserLocation()
                
            }
        }
   });
};

checkUserLocation()

const weather = () =>{
    let city = userLocation.value;
    const key = '04b851b581b854417d45f6b348ae7037';
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(api)
    .then(res => {
        return res.json();
    })
    .then(data => {
        let weatherType =  data.weather[0].main;
        let img = document.querySelector('.main-img');
        img.src = `animated/${weatherType}.svg`;

        cityName.textContent = data.weather[0].description;
        cityNew.textContent = data.name

    })
    .catch(error => {
       errMsg.textContent = 'Invalid City Name';
    })
}


const clearUserLocation = () =>{
    let userlocation = document.querySelectorAll('.input');
    Array.from(userlocation).forEach(curr => curr.value = '');
}