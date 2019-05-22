const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

//function to update html from obj

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    details.innerHTML = `
        <div class="text-muted text-uppercase text-center details">
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
        
        `
    // update night/day & icon images

    const iconSrc = `/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // ternary operator : works like if / else

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';


    // for reference
    // if (weather.IsDayTime) {
    //     timeSrc = 'scripts/img/day.svg';
    // } else {
    //     timeSrc = 'scripts/img/night.svg';
    // }

    time.setAttribute('src', timeSrc);


    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }


}



cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err))
};
