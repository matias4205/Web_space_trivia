/*
Archivo mi_codigo.js
En este archivo programaremos el código correspondiente
al juego de Trivia.
 */

var indice_pregunta_actual=0;
var total_puntos=0;

const nombre_alumno="Matias Perez";//En la pantalla acerca de
const puntos_resultado_bien=(preguntas.length/2)*1000; //Esto hace que el resultado minimo para ganar sea 5000
const tiempo_entre_preguntas=800; //Tiempo entre las transiciones

/*
// Clase 3
console.log("\nClase 3:\nindice_pregunta_actual: "+indice_pregunta_actual+"\ntotal_puntos: "+total_puntos+"\nnombre_alumno: "+nombre_alumno+"\nmaximo_preguntas_por_jugada: "+maximo_preguntas_por_jugada+"\npuntos_resultado_bien: "+indice_pregunta_actual);


// Clase 4
console.log("\nClase 4:");
if(total_puntos>=puntos_resultado_bien){
  console.log("Muy bien!");
}else {
  console.log("Ohh no!");
}


// Clase 5
console.log("\nClase 5:");

function Mostrar_resultado(){
  if(total_puntos>=puntos_resultado_bien){
    console.log("Muy bien!");
  }else {
    console.log("Ohh no!");
  }
}

function Obtener_siguiete_pregunta(){
  indice_pregunta_actual++;
  return indice_pregunta_actual;
}

function Mostrar_Pregunta(pregunta){
  console.log("La pregunta es: "+preguntas[pregunta].pregunta.toUpperCase());
}

var siguiente_pregunta = Obtener_siguiete_pregunta();

Mostrar_Pregunta(siguiente_pregunta);
Mostrar_resultado();


// Clase 6
if(true){
console.log("\nClase 6:");

function Mostrar_resultado(){
  var almacenar;

  if(total_puntos>=puntos_resultado_bien){
    almacenar="Muy bien!";
  }else {
    almacenar="Ohh no!";
  }

  console.log(almacenar+" "+almacenar.toUpperCase());
  console.log("La longitud del mensaje es: "+almacenar.length);
  console.log("Tus puntos son: "+total_puntos);
}

function Mostrar_Pregunta(pregunta){
  console.log(indice_pregunta_actual+1+")"+preguntas[pregunta].pregunta);
}

Mostrar_Pregunta(indice_pregunta_actual);
Mostrar_resultado();

}
*/

//Clase 7-8-9

  if(window.top.location.href.indexOf("#")!=-1){
    var siguiente_pregunta;

    //linkeando pantallas
    var barra_superior = document.querySelector("#navbarCollapse").classList;
    var pantalla_inicio = document.querySelector("#pantalla-inicio").classList;
    var header = document.querySelector("#header").classList;
    var pantalla_juego = document.querySelector("#pantalla-juego").classList;
    var pantalla_resultado = document.querySelector("#pantalla-resultado").classList;

    //linkeando los botones
    var boton_jugar = document.querySelector("#inicio-boton-jugar");
    boton_jugar.addEventListener("click", Iniciar_ocultar);
    var boton_verificar = document.querySelector("#boton-verificar");
    boton_verificar.addEventListener("click", Check_Respuesta);
    var boton_siguiente = document.querySelector("#boton-siguiente");
    boton_siguiente.addEventListener("click", Siguinte_preg_Iniciar);
    var boton_volver_a_jugar = document.querySelector("#resultado-boton-volver-a-jugar");
    boton_volver_a_jugar.addEventListener("click", Jugar_de_nuevo);

    //linkeando todos los parametros
    var pregunta_numero = document.querySelector("#pregunta-numero");
    var pregunta_texto = document.querySelector("#pregunta-texto");
    var pregunta_img = document.querySelector("#pregunta-imagen");
    var error_no_selec = document.querySelector("#error-no-selec");
    var pregunta_opciones_input = document.querySelectorAll("input[name=respuesta]");
    var pregunta_opciones_label = document.querySelectorAll("label[for]");
    var pregunta_opciones_div = document.querySelectorAll(".trivia-opcion");
    var pregunta_opciones_puntos = document.querySelectorAll("label[name=puntos-animado]");

    for(x=0;x<3;x++){pregunta_opciones_div[x].addEventListener("click", Marcar_seleccion);}

  }else if(window.top.location.href.indexOf("acerca_de.html")!=-1){
    document.querySelector(".nombre-alumno").innerHTML = nombre_alumno;
  }


function Jugar_de_nuevo(){
  reemplazar_clases(pantalla_resultado, "fadeIn", "bounceOut");
  setTimeout(function() {location.reload(true);}, tiempo_entre_preguntas);
}

function Iniciar_ocultar(){
  ocultar_paneles();
  juego_iniciado();
}

function Siguinte_preg_Iniciar(){

  if(indice_pregunta_actual<preguntas.length-1){
    reemplazar_clases(pantalla_juego, "bounceIn", "bounceOut");
    Obtener_siguiete_pregunta();

    setTimeout(function(){
      boton_siguiente.classList.add("d-none");
      reemplazar_clases(error_no_selec.classList, "bounceOut", "d-none");
      boton_verificar.classList.remove("d-none");
      for(x=0;x<3;x++){
        pregunta_opciones_div[x].classList.add("fadeInDown");
        reemplazar_clases(pregunta_opciones_puntos[x].classList, "fadeOutLeft", "d-none,fadeInLeft");
      }
      Loop_remover_agregar(pregunta_opciones_div, "remover", "seleccionada");
      juego_iniciado();
    }, tiempo_entre_preguntas);

  }else{
    barra_superior.toggle("navbar-collapse");
    pantalla_juego.add("bounceOut");
    header.add("slideOutUp");
    setTimeout(function() {pantalla_juego.remove("bounceOut"); pantalla_juego.add("d-none"); pantalla_resultado.toggle("d-none");}, tiempo_entre_preguntas);
    Mostrar_resultado();
    contador_puntos_animado();
    boton_volver_a_jugar.classList.toggle("d-none");
  }

}






//FUNCIONES

//Juego_iniciado
function juego_iniciado(){
    siguiente_pregunta = indice_pregunta_actual;

    reemplazar_clases(pantalla_juego, "bounceOut", "bounceIn");
    pregunta_numero.innerHTML = siguiente_pregunta+1+") ";
    pregunta_texto.innerHTML = Mostrar_Pregunta(siguiente_pregunta);
    pregunta_img.src = preguntas[siguiente_pregunta].imagen_src;

    reemplazar_preguntas();

}


//ocultar_paneles
function ocultar_paneles() {
  //Desordenar el array de preguntas
  desordenarArray(preguntas);
  //Lo pongo aca porque solo se ejecuta una vez por partida

  barra_superior.toggle("navbar-collapse");
  document.querySelector("#pantalla-inicio").style.animationDelay = "0ms";
  reemplazar_clases(pantalla_inicio, "bounceIn", "fadeOut");
  setTimeout(function() {reemplazar_clases(pantalla_inicio, "fadeOut", "d-none"); header.toggle("d-none"); pantalla_juego.toggle("d-none");}, tiempo_entre_preguntas);
}

//reemplazar_preguntas
function reemplazar_preguntas(){
  for(p=0, l=0 ; p<preguntas[siguiente_pregunta].opciones.length || l<pregunta_opciones_label.length ; p++, l++){
    pregunta_opciones_input[l].checked = false;
    pregunta_opciones_div[l].classList.remove("correcta" , "erronea");
    pregunta_opciones_input[l].value = preguntas[siguiente_pregunta].opciones[p];
    pregunta_opciones_label[l].innerHTML = preguntas[siguiente_pregunta].opciones[p];
  }
}

//Mostrar_resultado
function Mostrar_resultado(){
  if(total_puntos>=puntos_resultado_bien){
    pantalla_resultado.add("bien");
  }else {
    pantalla_resultado.add("mal");
  }
}


//Obtener_siguiete_pregunta
function Obtener_siguiete_pregunta(){
  if(indice_pregunta_actual+1<preguntas.length){
    indice_pregunta_actual++;
  }
  return indice_pregunta_actual;
}

//Mostrar_Pregunta
function Mostrar_Pregunta(pregunta){
  var pregunta_en_funcion = preguntas[pregunta].pregunta;
  return pregunta_en_funcion;
}

//Chequear_Respuesta
function Check_Respuesta(evento){
  Loop_remover_agregar(pregunta_opciones_div, "remover", "seleccionada");

  for(l=0;l<pregunta_opciones_input.length;l++){
    if(pregunta_opciones_input[l].checked == true){
      if(pregunta_opciones_input[l].value == preguntas[siguiente_pregunta].respuesta_correcta){
        pregunta_opciones_div[l].classList.add("correcta");

        pregunta_opciones_puntos[l].innerHTML = "+1000";
        pregunta_opciones_puntos[l].classList.remove("d-none");
        setTimeout(function(){
          reemplazar_clases(pregunta_opciones_puntos[l].classList, "fadeInLeft", "fadeOutLeft")
        }, tiempo_entre_preguntas);

        boton_verificar.classList.toggle("d-none");
        boton_siguiente.classList.remove("d-none");
        error_no_selec.classList.add("bounceOut");

        for(x=0;x<3;x++){
          pregunta_opciones_div[x].classList.remove("fadeInDown");
        }

        total_puntos=total_puntos+1000;

        break;
      }else{
        pregunta_opciones_div[l].classList.add("erronea");

        pregunta_opciones_puntos[l].innerHTML = "-500";
        pregunta_opciones_puntos[l].classList.remove("d-none");
        setTimeout(function(){
          reemplazar_clases(pregunta_opciones_puntos[l].classList, "fadeInLeft", "fadeOutLeft")
        }, tiempo_entre_preguntas);

        error_no_selec.classList.add("bounceOut");
        total_puntos=total_puntos-500;

        break;
      }
    }
    if(l==pregunta_opciones_input.length-1){
      error_no_selec.classList.remove("d-none");
    }
  }
}

//contador_puntos_animado
function contador_puntos_animado(){
  acumulador_puntos=0;
  contador_puntos_animado_var = setInterval(function(){
    if(total_puntos>0){
      acumulador_puntos=acumulador_puntos+10;
    }else if(total_puntos<0){
      acumulador_puntos=acumulador_puntos-10;
    }

    document.querySelector("#resultado-puntos").innerHTML = "Puntos: "+acumulador_puntos;

    if(acumulador_puntos==total_puntos){
      clearInterval(contador_puntos_animado_var);
    }
  }, 2);
}

function reemplazar_clases(objeto, clase_a_remover, clase_a_agregar){
  if(clase_a_agregar.indexOf(",") != -1){
    console.log(clase_a_agregar.slice(0, clase_a_agregar.indexOf(","))+""+clase_a_agregar.slice(clase_a_agregar.indexOf(",")+1, clase_a_agregar.length));
    objeto.add(clase_a_agregar.slice(0, clase_a_agregar.indexOf(",")), clase_a_agregar.slice(clase_a_agregar.indexOf(",")+1, clase_a_agregar.length));
  }else{
    objeto.add(clase_a_agregar);
  }

  objeto.remove(clase_a_remover);
}

function Marcar_seleccion(evento){
  let id=evento.target.id; //como el id del div es DIV-PREG-[numero] con el replace(/[^\d]/g, '') extraigo el numero y le resto 1

  Loop_remover_agregar(pregunta_opciones_div, "remover", "seleccionada");

  id = id.replace(/[^\d]/g, '');
  pregunta_opciones_div[id].classList.add("seleccionada");
  pregunta_opciones_input[id].checked = true;
}

function Loop_remover_agregar(objeto, accion, clase){
  if(accion == "remover"){
    for(x=0;x<3;x++){
      objeto[x].classList.remove(clase);
    }
  }else if(accion == "agregar"){
    for(x=0;x<3;x++){
      objeto[x].classList.add(clase);
    }
  }
}
