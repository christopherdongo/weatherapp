(function () {
  //apikey
  const weather = {
    APIKEY: "73a5d4a36564ae218bc6632422591c75",
  };

  //constantes
  const form = document.getElementById("formulario");
  const search = document.getElementById("inputciudad");
  const title = document.getElementById("title");
  const descripcion = document.getElementById("description");
  const humedad = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const icono = document.getElementById("icon");
  const temperatura = document.getElementById("temp");
  const loader = document.getElementById("loader");
  const error = document.getElementById("error");
  //const secondary = document.getElementById('secondary');

  //creacion de elementos para las siguientes tarjetas
  const thrid = document.querySelector('#thrid');

  let h2title = document.createElement("h2");
  let cardContainer2 = document.createElement("div");
  let divfecha = document.createElement('div');
  let divhumedad = document.createElement("div");
  let divwind = document.createElement("div");
  let imgicono = document.createElement("img");
  let divdescription2 = document.createElement('div');
  let divtemperatura = document.createElement("div");
  let cardnext = document.createElement('article');
  //seleccionar la tarjeta creada

  //escucha del formulario
  form.addEventListener("submit", (e) => {
    obtainsData(e);
  });
  form.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
      obtainsData(e);
    }
  });

  const obtainsData = (e) => {
    e.preventDefault();
    //fetch de los datos
    const promise1 = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${weather.APIKEY}&lang=es`
    );
    const promise2 = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=metric&appid=${weather.APIKEY}&lang=es`
    );
    //resolver la promesa
    Promise.all([promise1, promise2])
      .then((response) => {
        return Promise.all(response.map((r) => r.json()));
      })
      .then(([data, nextdata]) => {
        ObtenerDatos(data), OBtenerDatosNext(nextdata);
      })
      .catch((err) => console.log(err));
    SpinnerViews("block");
    Clear();
    ObtenerError("none");
  };

  //function primera tarheta
  const ObtenerDatos = (data) => {
    if (data.message) {
      SpinnerViews("none");
      ObtenerError("block");
    } else {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { humidity, temp } = data.main;
      const { speed } = data.wind;

      icono.src = "https://openweathermap.org/img/wn/" + icon + ".png";
      title.innerText = "Clima de " + name;
      temperatura.innerText = temp + " °C";
      icono.alt = name;
      descripcion.innerText = description;
      humedad.innerText = " Humedad: " + humidity + " %";
      wind.textContent = " Velocidad del Viento: " + speed + " km/h";
      SpinnerViews("none");
      OBtenerDatosNext;
      
    }
  };
  //visualizar datos
  const ObtenerError = (show) => {
    const message = "Ciudad no Encontrada!!!";
    error.innerText = message;
    error.style.display = show;
  };
  //spinner
  const SpinnerViews = (views) => {
    loader.style.display = views;
  };
  //
  const Clear = () => {
    search.value = "";
    title.innerText = "";
    temperatura.innerText = "";
    icono.src = "";
    icono.alt = "";
    descripcion.innerText = "";
    humedad.innerText = "";
    wind.textContent = "";
  };

  //function de los dias siguientes!!
  const OBtenerDatosNext = (nextdata) => {
    console.log(nextdata.list)
    h2title.id="h2title";
    cardContainer2.id="card__container2";
    divtemperatura.id="divtemperature"
    divhumedad.id="divhumedad";
    divwind.id="divwind";
    divdescription2.id="divdescription2";
    imgicono.id="imgicono";
    divfecha.id="divfecha";


    thrid.appendChild(cardnext);
    //poner datos en el cardnext
    cardnext.appendChild(h2title);
    cardnext.appendChild(divfecha);
    cardnext.appendChild(divtemperatura);
    cardnext.appendChild(cardContainer2);
    cardnext.appendChild(divhumedad);
    cardnext.appendChild(divwind);

    cardContainer2.appendChild(imgicono);
    cardContainer2.appendChild(divdescription2);
    

 
    
  };





})();
