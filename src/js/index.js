(function () {
  //apikey
  const weather = {
    APIKEY: "73a5d4a36564ae218bc6632422591c75",
  };

  //constantes
  const firstrow= document.getElementById('first-row');
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
  //const thrid = document.querySelector('#thrid');
  let  thrid2 = document.createElement('section');
        thrid2.id="thrid2";
        thrid2.classList="card card--thrid"
  let thridremove = document.querySelector('#thrid2'); 

  //segunda tarjeta

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

    if(firstrow.children.length==3){
      console.log('existe')
      firstrow.parentNode.removeChild(thridremove)
    }else{
      console.log('no existe')
    }
   
      firstrow.appendChild(thrid2)
    
    //fetch de los datos
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
      firstrow.appendChild(thrid2)
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
   console.log(nextdata)
    let result;
    //thrid.appendChild(cardnext);
    //poner datos en el cardnext
    result = timesConvert(nextdata.list);
    console.log(result)
  
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

      newElement.id = index; newElement.className = "card2";
      newElement.appendChild(divfecha);
      newElement.appendChild(divtemperatura);
      newElement.appendChild(cardContainer2);
      newElement.appendChild(divhumedad);
      newElement.appendChild(divwind);
      cardContainer2.appendChild(imgicono);
      cardContainer2.appendChild(divdescription2);
         return(
          thrid2.appendChild(newElement)
         )
    })
    
  };


  /*resolucion de los date*/ 
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
