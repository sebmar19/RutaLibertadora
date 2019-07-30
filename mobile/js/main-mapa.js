$(window).on("load", function () {
    $(".loader-mapa").fadeOut(300, function () {
        $(".btn-entrar-batalla").fadeIn(300);
        $(".btn-entrar-batalla").on("click", entrarBatalla);
    });

});

var infoMapa;

var puntoMapa = 0;

$(document).ready(function () {
    $.getJSON("https://embed.eltiempo.digital/infografias/2019/08/ruta-libertadora/data/data.json?fsvs", function (data) {
        infoMapa = data;
        console.log(infoMapa);
    });


});
//Esta función sirve para esconder el Lightbox Inicial y mostrar el Mapa
function entrarBatalla() {

    $("#lightbox-inicial-cont").fadeOut(500);
    $(".btn-mapa-der").on("click", avanzarRuta);
    $(".btn-mapa-izq").on("click", retrocederRuta);
    $(".btn-salir").on("click", desertar);
    $(".btn-regresar").on("click", esconderDesertar);
}
//Esta función sirve para avanzar a través de los puntos de la Ruta
//Apenas Inicia, aumenta en 1 el valor del punto actual y guarda en infoPuntoActual el Objeto correspondiente a ese punto
//Dependiendo de si el punto es de Parada o Batalla ejecutará diferentes animaciones
function avanzarRuta() {

    var soldadosAct = parseInt($(".barra-soldados .num-texto").html());
    var temperaturaAct = parseInt($(".num-temperatura").html());
    var alturaAct = parseInt($(".altimetria-num").html());
    console.log(soldadosAct);


    puntoMapa++;



    if (puntoMapa == 1) {

        var coordenadas = infoMapa[puntoMapa].coordenadas;

        coordenadas = coordenadas.split(",");

        $(".altimetria-num").fadeIn(200);
        $(".num-temperatura").fadeIn(200);
        $(".barra-soldados .num-texto").fadeIn(200);
        $(".num-titulo").fadeIn(200);
        $(".tem-titulo").fadeIn(200);
        $(".altimetrias").fadeIn(200);
        $("#mapa-imagen-container").css("background-image", "url(../img/mapa-boceto-m.jpg)");
        $("#mapa-imagen-container").css("background-size", "660%");
        $("#mapa-imagen-container").css("background-position", coordenadas[0] + "% " + coordenadas[1] + "%");

        $('#mapa-imagen-container').addClass('blur');

        setTimeout(function () {
            $('#mapa-imagen-container').removeClass('blur');
        }, 250);
    }

    var numPuntos = Object.keys(infoMapa).length;
    if (puntoMapa <= numPuntos) {
        var infoPuntoActual = infoMapa[puntoMapa];
        var coordenadas = infoPuntoActual.coordenadas;
        coordenadas = coordenadas.split(",");


        if (infoPuntoActual.tipo == "Parada") {
            //Cambio de datos
            $("#fecha-mapa").html(infoPuntoActual.fecha + " de 1819");
            animarNumeros(soldadosAct, infoPuntoActual.numeroSoldados, $(".barra-soldados .num-texto"), "", 2000);
            animarNumeros(temperaturaAct, infoPuntoActual.temperatura, $(".num-temperatura"), "º C", 2000);
            animarNumeros(alturaAct, infoPuntoActual.altura, $(".altimetria-num"), " msnm", 2000);



            //Cambio de Barras

            var valSoldados = map_range(infoPuntoActual.numeroSoldados, 300, 4300, 100, 20);
            var valTemperatura = map_range(infoPuntoActual.temperatura, 7, 25, 0, 100);
            var valAlturas = infoPuntoActual.alturaCaja;

            $(".barra-soldados").animate({
                "top": valSoldados + "%"
            }, 2000);
            $(".barra-temperatura").animate({
                "width": valTemperatura + "%"
            }, 2000);
            $(".barra-alti").animate({
                "width": valAlturas + "%"
            }, 2000);

            $("#mapa-imagen-container").css("background-position", coordenadas[0] + "% " + coordenadas[1] + "%");
            $('#mapa-imagen-container').addClass('blur');

            setTimeout(function () {
                $('#mapa-imagen-container').removeClass('blur');
            }, 250);


        } else if (infoPuntoActual.tipo == "Batalla") {
            $(".btn-mapa-der").off("click", avanzarRuta);
            $(".btn-mapa-izq").off("click", retrocederRuta);
            //Cambio de datos
            $("#fecha-mapa").html(infoPuntoActual.fecha + " de 1819");
            animarNumeros(soldadosAct, infoPuntoActual.numeroSoldados, $(".barra-soldados .num-texto"), "", 2000);
            animarNumeros(temperaturaAct, infoPuntoActual.temperatura, $(".num-temperatura"), "º C", 2000);
            animarNumeros(alturaAct, infoPuntoActual.altura, $(".altimetria-num"), " msnm", 2000);

            setTimeout(function () {
                //En los puntos de batalla despues de un tiempo se muestra cuantos soldados quedaron al finalizar
                animarNumeros(infoPuntoActual.numeroSoldados, infoPuntoActual.numeroSoldadosFinal, $(".barra-soldados .num-texto"), "", 2000);
                var valSoldados = map_range(infoPuntoActual.numeroSoldadosFinal, 300, 4300, 100, 20);
                $(".barra-soldados").animate({
                    "top": valSoldados + "%"
                }, 2000);
                $(".btn-mapa-der").on("click", avanzarRuta);
                $(".btn-mapa-izq").on("click", retrocederRuta);
            }, 6000);


            //Cambio de Barras

            var valSoldados = map_range(infoPuntoActual.numeroSoldados, 300, 4300, 100, 20);
            var valTemperatura = map_range(infoPuntoActual.temperatura, 7, 25, 0, 100);
            var valAlturas = infoPuntoActual.alturaCaja;

            $(".barra-soldados").animate({
                "top": valSoldados + "%"
            }, 2000);
            $(".barra-temperatura").animate({
                "width": valTemperatura + "%"
            }, 2000);
            $(".barra-alti").animate({
                "width": valAlturas + "%"
            }, 2000);

            $("#mapa-imagen-container").css("background-position", coordenadas[0] + "% " + coordenadas[1] + "%");
            $('#mapa-imagen-container').addClass('blur');

            setTimeout(function () {
                $('#mapa-imagen-container').removeClass('blur');
            }, 250);


        }
    } else {
        finalizar();
    }


}



function retrocederRuta() {

    var soldadosAct = parseInt($(".barra-soldados .num-texto").html());
    var temperaturaAct = parseInt($(".num-temperatura").html());
    var alturaAct = parseInt($(".altimetria-num").html());
    console.log(soldadosAct);


    puntoMapa--;
    var numPuntos = Object.keys(infoMapa).length;
    if (puntoMapa > 0) {
        var infoPuntoActual = infoMapa[puntoMapa];
        var coordenadas = infoPuntoActual.coordenadas;
        coordenadas = coordenadas.split(",");

        if (infoPuntoActual.tipo == "Parada") {
            //Cambio de datos
            $("#fecha-mapa").html(infoPuntoActual.fecha + " de 1819");
            animarNumeros(soldadosAct, infoPuntoActual.numeroSoldados, $(".barra-soldados .num-texto"), "", 2000);
            animarNumeros(temperaturaAct, infoPuntoActual.temperatura, $(".num-temperatura"), "º C", 2000);
            animarNumeros(alturaAct, infoPuntoActual.altura, $(".altimetria-num"), " msnm", 2000);



            //Cambio de Barras

            var valSoldados = map_range(infoPuntoActual.numeroSoldados, 300, 4300, 100, 20);
            var valTemperatura = map_range(infoPuntoActual.temperatura, 7, 25, 0, 100);
            var valAlturas = infoPuntoActual.alturaCaja;

            $(".barra-soldados").animate({
                "top": valSoldados + "%"
            }, 2000);
            $(".barra-temperatura").animate({
                "width": valTemperatura + "%"
            }, 2000);
            $(".barra-alti").animate({
                "width": valAlturas + "%"
            }, 2000);

            $("#mapa-imagen-container").css("background-position", coordenadas[0] + "% " + coordenadas[1] + "%");
            $('#mapa-imagen-container').addClass('blur');

            setTimeout(function () {
                $('#mapa-imagen-container').removeClass('blur');
            }, 250);


        } else if (infoPuntoActual.tipo == "Batalla") {
            $(".btn-mapa-der").off("click", avanzarRuta);
            $(".btn-mapa-izq").off("click", retrocederRuta);
            //Cambio de datos
            $("#fecha-mapa").html(infoPuntoActual.fecha + " de 1819");
            animarNumeros(soldadosAct, infoPuntoActual.numeroSoldados, $(".barra-soldados .num-texto"), "", 2000);
            animarNumeros(temperaturaAct, infoPuntoActual.temperatura, $(".num-temperatura"), "º C", 2000);
            animarNumeros(alturaAct, infoPuntoActual.altura, $(".altimetria-num"), " msnm", 2000);

            setTimeout(function () {
                //En los puntos de batalla despues de un tiempo se muestra cuantos soldados quedaron al finalizar
                animarNumeros(infoPuntoActual.numeroSoldados, infoPuntoActual.numeroSoldadosFinal, $(".barra-soldados .num-texto"), "", 2000);
                var valSoldados = map_range(infoPuntoActual.numeroSoldadosFinal, 300, 4300, 100, 20);
                $(".barra-soldados").animate({
                    "top": valSoldados + "%"
                }, 2000);
                $(".btn-mapa-der").on("click", avanzarRuta);
                $(".btn-mapa-izq").on("click", retrocederRuta);
            }, 6000);


            //Cambio de Barras

            var valSoldados = map_range(infoPuntoActual.numeroSoldados, 300, 4300, 100, 20);
            var valTemperatura = map_range(infoPuntoActual.temperatura, 7, 25, 0, 100);
            var valAlturas = infoPuntoActual.alturaCaja;

            $(".barra-soldados").animate({
                "top": valSoldados + "%"
            }, 2000);
            $(".barra-temperatura").animate({
                "width": valTemperatura + "%"
            }, 2000);
            $(".barra-alti").animate({
                "width": valAlturas + "%"
            }, 2000);

            $("#mapa-imagen-container").css("background-position", coordenadas[0] + "% " + coordenadas[1] + "%");
            $('#mapa-imagen-container').addClass('blur');

            setTimeout(function () {
                $('#mapa-imagen-container').removeClass('blur');
            }, 250);


        }
    } else {
        puntoMapa = 1;
        //finalizar();
    }


}

function desertar() {

    $(".lightbox-salir-cont").fadeIn(300);
}

function esconderDesertar() {
    $(".lightbox-salir-cont").fadeOut(300);
}


function finalizar() {

}

//Esta función permite animar los números, los parámetros que recibe son: el número inicial, el número final, la etiqueta donde se cambia el texto, el complemento para el texto, y la velocidad de cambio
function animarNumeros(inicial, final, destino, complemento, vel) {

    $({
        someValue: inicial
    }).animate({
        someValue: final
    }, {
        duration: vel,
        easing: 'swing', // can be anything
        step: function () { // called on every step
            // Update the element's text with rounded-up value:
            destino.text(Math.round(this.someValue) + complemento);
        }
    });
}

//Función de Remapeo de Valores

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
