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
  //const secondary = document.getElementById('secondary');

  //escucha del formulario
  form.addEventListener("submit", (e)=>{
    obtainsData(e);
  } );
  form.addEventListener("keyup", (e)=>{
     if(e.key=="Enter"){
       obtainsData(e);
     }
  })

  const obtainsData=(e)=>{
    e.preventDefault();
    Clear();
    //fetch de los datos
    const promise1 = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${weather.APIKEY}&lang=es`
    );
    const promise2 = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=metric&appid=${weather.APIKEY}&lang=es`
    );
    //resolver la promesa
    Promise.all([promise1, promise2]).then( response => {return Promise.all(response.map( r => r.json())) })
    .then( ([data, nextdata]) => { ObtenerDatos(data), OBtenerDatosNext(nextdata)}).catch( e => { ObtenerError(e)})
    
  }

  //function primera tarheta
  const ObtenerDatos = (data) => {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {humidity, temp} = data.main; 
    const {speed} = data.wind;
     console.log(data)
      icono.src="https://openweathermap.org/img/wn/"+ icon +".png";
      title.innerText = "Clima de " + name;
      temperatura.innerText = temp + " °C"
      icono.alt= name;
      descripcion.innerText = description; 
      humedad.innerText = ' Humedad: ' + humidity + " %";
      wind.textContent =" Velocidad del Viento: " + speed + " km/h";
      SpinnerViews('none')
  };
  //function de los dias siguientes!!
  const OBtenerDatosNext = (data) => {
    console.log(data)
  };
  //visualizar datos
  const ObtenerError = (message) => {
      console.log(message)
  };
 //spinner
  const SpinnerViews=(views)=>{
          loader.style.display=views;
  }

  const Clear=()=>{
    title.innerText = "";
    temperatura.innerText ="";
    icono.src="";
    icono.alt="";
    descripcion.innerText ="";
    humedad.innerText = "";
    wind.textContent ="";
  }



})();
