"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,a=!1,i=void 0;try{for(var d,o=e[Symbol.iterator]();!(r=(d=o.next()).done)&&(n.push(d.value),!t||n.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return n}}function _arrayWithHoles(e){if(Array.isArray(e))return e}!function(){var e="73a5d4a36564ae218bc6632422591c75",t=document.getElementById("thrid"),n=document.getElementById("formulario"),r=document.getElementById("inputciudad"),a=document.getElementById("title"),i=document.getElementById("description"),d=document.getElementById("humidity"),o=document.getElementById("wind"),c=document.getElementById("icon"),l=document.getElementById("temp"),u=document.getElementById("loader"),m=document.getElementById("error");n.addEventListener("submit",(function(e){s(e)})),n.addEventListener("keyup",(function(e){"Enter"==e.key&&s(e)}));var s=function(n){if(n.preventDefault(),t.style.display="none",t.children.length>=1)for(;t.firstChild;)t.removeChild(t.firstChild);var a=fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(r.value,"&units=metric&appid=").concat(e,"&lang=es")),i=fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(r.value,"&units=metric&&appid=").concat(e,"&lang=es"));Promise.all([a,i]).then((function(e){return Promise.all(e.map((function(e){return e.json()})))})).then((function(e){var t=_slicedToArray(e,2),n=t[0],r=t[1];p(n),v(r)})).catch((function(e){return console.log(e)})),f("block"),y("none"),h()},p=function(e){if(e.message)f("none"),y("block");else{t.style.display="flex";var n=e.name,r=e.weather[0],u=r.icon,m=r.description,s=e.main,p=s.humidity,h=s.temp_max,v=e.wind.speed;c.src="https://openweathermap.org/img/wn/"+u+".png",a.innerText="Clima de "+n,l.innerText=h+" °C",c.alt=n,i.innerText=m,d.innerText=" Humedad: "+p+" %",o.textContent=" Velocidad del Viento: "+(3.6*v).toFixed(2)+" km/h",f("none")}},y=function(e){m.innerText="Ciudad no Encontrada!!!",m.style.display=e},f=function(e){u.style.display=e},h=function(){r.value="",a.innerText="",l.innerText="",c.src="",c.alt="",i.innerText="",d.innerText="",o.textContent=""},v=function(e){g(e.list).map((function(e,n){var r=document.createElement("article"),a=document.createElement("div"),i=document.createElement("div"),d=document.createElement("div"),o=document.createElement("div"),c=document.createElement("img"),l=document.createElement("div"),u=document.createElement("div");return a.id="container2",a.className="card2__container2",u.id="divtemperature",u.className="card2__divtemperature",d.id="divhumedad",d.className="card__divhumedad",o.id="divwind",l.id="divdescription2",c.id="imgicono",i.id="divfecha",i.className="card2__divfecha",i.textContent=e.data.dt_txt,u.innerText=e.data.main.temp+" °C",c.src="https://openweathermap.org/img/wn/"+e.data.weather[0].icon+".png",l.innerText=e.data.weather[0].description,d.innerText="Humedad: "+e.data.main.humidity+" %",o.innerText="V. del viento: "+(3.6*e.data.wind.speed).toFixed(2)+" km/h",r.id=n,r.className="card2",r.appendChild(i),r.appendChild(u),r.appendChild(a),r.appendChild(d),r.appendChild(o),a.appendChild(c),a.appendChild(l),t.appendChild(r)}))},g=function(e){return e.filter((function(e){return 6===T(e.dt)||12===T(e.dt)||18===T(e.dt)})).map((function(e){return{weekDay:w(e.dt),hour:E(e.dt),data:e}}))},T=function(e){return new Date(1e3*e).getUTCHours()},w=function(e){var t=new Date(1e3*e).getDate(),n=new Date(1e3*e).getMonth()+1,r=new Date(1e3*e).getFullYear();return"".concat(t,"/").concat(n,"/").concat(r)},E=function(e){return new Date(1e3*e).getUTCHours()}}();