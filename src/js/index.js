(function () {
  //apikey
  const weather = {
    APIKEY: "73a5d4a36564ae218bc6632422591c75",
  };

  //constantes
  const thrid = document.getElementById('thrid');
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
    thrid.style.display="none"
    /*eliminar los hijos*/ 
    if(thrid.children.length>=1){
      while (thrid.firstChild) {
        thrid.removeChild(thrid.firstChild);
      }
    }
    //obtener los datos
    const promise1 = fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${weather.APIKEY}&lang=es`
    );
    const promise2 = fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${search.value}&units=metric&&appid=${weather.APIKEY}&lang=es`
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
    ObtenerError("none");
    Clear();
  };

  //function primera tarheta
  const ObtenerDatos = (data) => {
    console.log(data)
    if (data.message) {
      SpinnerViews("none");
      ObtenerError("block");
    } else {
      thrid.style.display="flex"
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { humidity, temp_max } = data.main;
      const { speed } = data.wind;

      icono.src = "https://openweathermap.org/img/wn/" + icon + ".png";
      title.innerText = "Clima de " + name;
      temperatura.innerText = temp_max + " °C";
      icono.alt = name;
      descripcion.innerText = description;
      humedad.innerText = " Humedad: " + humidity + " %";
      wind.textContent = " Velocidad del Viento: " + (speed*3.600000).toFixed(2) + " km/h";
      SpinnerViews("none");
      OBtenerDatosNext;
      //firstrow.appendChild(thrid2)
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
  //formateo de datos
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

  //function para visualizar los siguientes 5 dias!!
  const OBtenerDatosNext = (nextdata) => {
    let result;
    console.log(nextdata)

    //poner datos en el cardnext
    result = timesConvert(nextdata.list);
  
    result.map( (item, index) => {
      let newElement = document.createElement('article');
      let cardContainer2 = document.createElement("div");
      let divfecha = document.createElement('div');
      let divhumedad = document.createElement("div");
      let divwind = document.createElement("div");
      let imgicono = document.createElement("img");
      let divdescription2 = document.createElement('div');
      let divtemperatura = document.createElement("div");
      /*poner datos*/
      cardContainer2.id="container2";
      cardContainer2.className="card2__container2";
      divtemperatura.id="divtemperature";
      divtemperatura.className="card2__divtemperature";
      divhumedad.id="divhumedad";
      divhumedad.className="card__divhumedad"
      divwind.id="divwind";
      divdescription2.id="divdescription2";
      imgicono.id="imgicono";
      divfecha.id="divfecha";
      divfecha.className="card2__divfecha" 
      /*introducir la informacion*/
      divfecha.textContent=item.data.dt_txt
      divtemperatura.innerText = item.data.main.temp + " °C";
      imgicono.src="https://openweathermap.org/img/wn/" + item.data.weather[0].icon + ".png";
      divdescription2.innerText = item.data.weather[0].description;
      divhumedad.innerText = 'Humedad: ' + item.data.main.humidity + " %";
      divwind.innerText="V. del viento: " + (item.data.wind.speed*3.600000).toFixed(2) + " km/h";
      newElement.id = index; newElement.className = "card2";
      newElement.appendChild(divfecha);
      newElement.appendChild(divtemperatura);
      newElement.appendChild(cardContainer2);
      newElement.appendChild(divhumedad);
      newElement.appendChild(divwind);
      cardContainer2.appendChild(imgicono);
      cardContainer2.appendChild(divdescription2);
         return(
          thrid.appendChild(newElement)
         )
    })
    
  };
  /*resolucion de los date transformar formato UNIX */ 
  const timesConvert=(data)=>{
   return data.filter( item => (
    convert(item.dt) === 6 || convert(item.dt) === 12 || convert(item.dt) === 18
    )).map( item => (
      {weekDay: convertDay(item.dt),
        hour: convertHour(item.dt),
        data:item
      }
    ) )
  }
  //conversion de datos
  const convert=(dt)=>{
    let t = new Date(dt * 1000).getUTCHours();
    return t;
  }
  const convertDay=(dt)=>{
    let d = new Date(dt*1000).getDate();
    let m = new Date(dt*1000).getMonth()+1;
    let a = new Date(dt*1000).getFullYear();
    return `${d}/${m}/${a}`;
  }
  const convertHour=(dt)=>{
    let t= new Date(dt*1000).getUTCHours();
    return t;
  }

})();
