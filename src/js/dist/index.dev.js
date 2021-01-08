"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  //apikey
  var weather = {
    APIKEY: "73a5d4a36564ae218bc6632422591c75"
  }; //constantes

  var thrid = document.getElementById("thrid");
  var form = document.getElementById("formulario");
  var search = document.getElementById("inputciudad");
  var title = document.getElementById("title");
  var descripcion = document.getElementById("description");
  var humedad = document.getElementById("humidity");
  var wind = document.getElementById("wind");
  var icono = document.getElementById("icon");
  var temperatura = document.getElementById("temp");
  var loader = document.getElementById("loader");
  var error = document.getElementById("error");
  var date = document.getElementById("date");
  var fragment = document.createDocumentFragment(); //escucha del formulario


  //añadiendo los datos al div correspondiente
  thrid.appendChild(fragment)

  form.addEventListener("submit", function (e) {
    obtainsData(e);
  });
  form.addEventListener("keyup", function (e) {
    if (e.key == "Enter") {
      obtainsData(e);
    }
  });

  var obtainsData = function obtainsData(e) {
    e.preventDefault();
    thrid.style.display = "none";
    /*eliminar los hijos*/

    if (thrid.children.length >= 1) {
      while (thrid.firstChild) {
        thrid.removeChild(thrid.firstChild);
      }
    } //obtener los datos


    var promise1 = fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(search.value, "&units=metric&appid=").concat(weather.APIKEY, "&lang=es"));
    var promise2 = fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(search.value, "&units=metric&&appid=").concat(weather.APIKEY, "&lang=es")); //resolver la promesa

    Promise.all([promise1, promise2]).then(function (response) {
      return Promise.all(response.map(function (r) {
        return r.json();
      }));
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          data = _ref2[0],
          nextdata = _ref2[1];

      ObtenerDatos(data), OBtenerDatosNext(nextdata);
    })["catch"](function (err) {
      return console.log(err);
    });
    SpinnerViews("block");
    ObtenerError("none");
    Clear();
  }; //function primera tarheta


  var ObtenerDatos = function ObtenerDatos(data) {
    console.log(data);

    if (data.message) {
      SpinnerViews("none");
      ObtenerError("block");
    } else {
      setTimeout(function () {
        thrid.style.display = "flex";
        var name = data.name,
            dt = data.dt;
        var _data$weather$ = data.weather[0],
            icon = _data$weather$.icon,
            description = _data$weather$.description;
        var _data$main = data.main,
            humidity = _data$main.humidity,
            temp_max = _data$main.temp_max;
        var speed = data.wind.speed;
        icono.src = "https://openweathermap.org/img/wn/" + icon + ".png";
        title.innerText = "Clima de " + name;
        temperatura.innerText = temp_max + " °C";
        icono.alt = name;
        date.innerHTML = tranformatdateprimary(dt);
        descripcion.innerText = description;
        humedad.innerText = " Humedad: " + humidity + " %";
        wind.textContent = " Velocidad del Viento: " + (speed * 3.6).toFixed(2) + " km/h";
        SpinnerViews("none");
        OBtenerDatosNext;
      }, 1000);
    }
  }; //visualizar datos


  var ObtenerError = function ObtenerError(show) {
    var message = "Ciudad no Encontrada!!!";
    error.innerText = message;
    error.style.display = show;
  }; //spinner


  var SpinnerViews = function SpinnerViews(views) {
    loader.style.display = views;
  }; //formateo de datos


  var Clear = function Clear() {
    search.value = "";
    title.innerText = "";
    temperatura.innerText = "";
    icono.src = "";
    icono.alt = "";
    descripcion.innerText = "";
    humedad.innerText = "";
    wind.textContent = "";
    date.innerHTML = "";
  }; //function para visualizar los siguientes 5 dias!!


  var OBtenerDatosNext = function OBtenerDatosNext(nextdata) {
    var result; //poner datos en el cardnext

    result = timesConvert(nextdata.list);
    result.map(function (item, index) {
      var newElement = document.createElement("article");
      var cardContainer2 = document.createElement("div");
      var divfecha = document.createElement("div");
      var divhumedad = document.createElement("div");
      var divwind = document.createElement("div");
      var imgicono = document.createElement("img");
      var divdescription2 = document.createElement("div");
      var divtemperatura = document.createElement("div");
      
      /*poner datos*/
      cardContainer2.id = "container2";
      cardContainer2.className = "card2__container2";
      divtemperatura.id = "divtemperature";
      divtemperatura.className = "card2__divtemperature";
      divhumedad.id = "divhumedad";
      divhumedad.className = "card2__divhumedad";
      divwind.id = "divwind";
      divwind.className = "card2__divwind";
      divdescription2.id = "divdescription2";
      imgicono.id = "imgicono";
      divfecha.id = "divfecha";
      divfecha.className = "card2__divfecha";
      /*introducir la informacion*/

      divfecha.textContent = transformDate(item.data.dt);
      divtemperatura.innerText = item.data.main.temp + " °C";
      imgicono.src = "https://openweathermap.org/img/wn/" + item.data.weather[0].icon + ".png";
      divdescription2.innerText = item.data.weather[0].description;
      divhumedad.innerText = "Humedad: " + item.data.main.humidity + " %";
      divwind.innerText = "V. del viento: " + (item.data.wind.speed * 3.6).toFixed(2) + " km/h";
      newElement.id = index;
      newElement.className = "card2";
      newElement.appendChild(divfecha);
      newElement.appendChild(divtemperatura);
      newElement.appendChild(cardContainer2);
      newElement.appendChild(divhumedad);
      newElement.appendChild(divwind);
      cardContainer2.appendChild(imgicono);
      cardContainer2.appendChild(divdescription2);

      return fragment.appendChild(newElement);
    });
  };
  /*resolucion de los date transformar formato UNIX */


  var timesConvert = function timesConvert(data) {
    return data.filter(function (item) {
      return convert(item.dt) === 6 || convert(item.dt) === 12 || convert(item.dt) === 18;
    }).map(function (item) {
      return {
        weekDay: convertDay(item.dt),
        hour: convertHour(item.dt),
        data: item
      };
    });
  }; //conversion de datos


  var convert = function convert(dt) {
    var t = new Date(dt * 1000).getUTCHours();
    return t;
  };

  var convertDay = function convertDay(dt) {
    var d = new Date(dt * 1000).getDate();
    var m = new Date(dt * 1000).getMonth() + 1;
    var a = new Date(dt * 1000).getFullYear();
    return "".concat(d, "/").concat(m, "/").concat(a);
  };

  var convertHour = function convertHour(dt) {
    var t = new Date(dt * 1000).getUTCHours();
    return t;
  };

  var tranformatdateprimary = function tranformatdateprimary(dt) {
    var d = new Date(dt * 1000);
    var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octtubre", "Noviembre", "Diciembre"];
    var days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var dia = days[d.getDay()];
    var date = d.getDate();
    var mes = months[d.getMonth()];
    var anio = d.getFullYear();
    return "".concat(dia, " ").concat(date, " ").concat(mes, " ").concat(anio);
  };

  var transformDate = function transformDate(dt) {
    var d = new Date(dt * 1000);
    var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octtubre", "Noviembre", "Diciembre"];
    var days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var dia = days[d.getDay()];
    var date = d.getDate();
    var mes = months[d.getMonth()];
    var anio = d.getFullYear();
    var hour = d.getUTCHours();
    return "".concat(dia, " ").concat(date, " ").concat(mes, " ").concat(anio, " ").concat(hour, ":00 horas");
  };
})();