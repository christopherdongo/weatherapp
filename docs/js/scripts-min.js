"use strict";function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var n=[],r=!0,o=!1,a=void 0;try{for(var i,c=e[Symbol.iterator]();!(r=(i=c.next()).done)&&(n.push(i.value),!t||n.length!==t);r=!0);}catch(e){o=!0,a=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw a}}return n}}function _arrayWithHoles(e){if(Array.isArray(e))return e}!function(){var e="73a5d4a36564ae218bc6632422591c75",t=document.getElementById("formulario"),n=document.getElementById("inputciudad"),r=document.getElementById("title"),o=document.getElementById("description"),a=document.getElementById("humidity"),i=document.getElementById("wind"),c=document.getElementById("icon"),l=document.getElementById("temp"),u=document.getElementById("loader");t.addEventListener("submit",(function(e){d(e)})),t.addEventListener("keyup",(function(e){"Enter"==e.key&&d(e)}));var d=function(t){t.preventDefault(),f();var r=fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(n.value,"&units=metric&appid=").concat(e,"&lang=es")),o=fetch("https://api.openweathermap.org/data/2.5/forecast?q=".concat(n.value,"&units=metric&appid=").concat(e,"&lang=es"));Promise.all([r,o]).then((function(e){return Promise.all(e.map((function(e){return e.json()})))})).then((function(e){var t=_slicedToArray(e,2),n=t[0],r=t[1];m(n),y(r)})).catch((function(e){s(e)}))},m=function(e){var t=e.name,n=e.weather[0],u=n.icon,d=n.description,m=e.main,y=m.humidity,s=m.temp,f=e.wind.speed;console.log(e),c.src="https://openweathermap.org/img/wn/"+u+".png",r.innerText="Clima de "+t,l.innerText=s+" °C",c.alt=t,o.innerText=d,a.innerText=" Humedad: "+y+" %",i.textContent=" Velocidad del Viento: "+f+" km/h",p("none")},y=function(e){console.log(e)},s=function(e){console.log(e)},p=function(e){u.style.display=e},f=function(){r.innerText="",l.innerText="",c.src="",c.alt="",o.innerText="",a.innerText="",i.textContent=""}}();