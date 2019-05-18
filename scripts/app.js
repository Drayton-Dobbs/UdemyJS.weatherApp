const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

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


        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }


}


const updateCity = async (city) => {

const cityDets = await getCity(city);
const weather = await getWeather(cityDets.Key);

return {
    cityDets: cityDets,
    weather: weather
};

}

cityForm.addEventListener('submit', e => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

});