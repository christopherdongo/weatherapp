(function () {
    //apikey
    const weather = {
        APIKEY:"73a5d4a36564ae218bc6632422591c75"
      };

  //variables
  const form = document.getElementById("formulario");
  const search = document.getElementById("inputciudad");
  const title = document.getElementById('title')
  const descripcion = document.getElementById('description');
  const humedad = document.getElementById('humidity');
  const wind = document.getElementById('wind');
  const icono = document.getElementById('icon');
  const temperatura = document.getElementById('temp');
  const loader = document.getElementById('loader');

  //escucha del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    //fetch de los datos
    const promise1 = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${weather.APIKEY}&lang=es`
    );
    const promise2 = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&appid=${weather.APIKEY}&lang=es`
    );
    //resolver la promesa
    Promise.all([promise1, promise2]).then( response => {return Promise.all(response.map( r => r.json())) })
    .then( ([data, nextdata]) => { ObtenerDatos(data), OBtenerDatosNext(nextdata)}).catch( e => { ObtenerError(e)})

  });
  //function primera tarheta
  const ObtenerDatos = (data) => {

    const {name} = data;
    const {icon, description} = data.weather[0];
    const {humidity, temp} = data.main; 
    const {speed} = data.wind;
    console.log(data)
     title.innerText = "Clima de " + name;
     temperatura.innerText =  ((temp - 273.15)*1.000000).toFixed(2) + " °C"
     icono.src="https://openweathermap.org/img/wn/"+ icon +".png";
     icono.alt= name;
     descripcion.innerText = "Description: "+ description; 
     humedad.innerText = ' Humedad:' + humidity + "%";
     wind.textContent =" Velocidad del Viento:" + speed + "km/h"
  };
  //function de los siguientes dias
  const OBtenerDatosNext = (data) => {
   console.log(data)
  };
  //visualizar datos

  const ObtenerError = (message) => {
      console.log(message)
  };
})();
