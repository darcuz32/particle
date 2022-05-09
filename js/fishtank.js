var bubbleCount = 30;
var bubbleField = document.getElementById("bubble-field");

//generate bubbles with randomly timed animation durations
for (i = 0; i < bubbleCount; i++) {
    var randNum = Math.floor(Math.random() * 20) + 1;
    var animDur = 2 + (0.5 * randNum);
    moveEl = document.createElement('div');
    moveEl.setAttribute('class', 'bubble-rise');
    moveEl.setAttribute('style', 'animation-duration: ' + animDur + 's;');

    bubbleEl = document.createElement('div');
    bubbleEl.setAttribute('class', 'bubble');
    bubbleElContent = document.createTextNode('');
    bubbleEl.appendChild(bubbleElContent);

    moveEl.appendChild(bubbleEl)
    bubbleField.appendChild(moveEl);
}


var accessToken = "948cd50dac2048f7ddbb6f047c27918e50b55741";
var deviceID = "3d003d000c47353136383631"
var url = "https://api.particle.io/v1/devices/" + deviceID ;

$("#btnAlimentar").click(function() {
    checkStatus();
    $("#btnAlimentar").prop("disabled", "true");
    $("#btnAlimentar").html("Alimentando...");
    $.post(url+ "/mover", {params: "1", access_token: accessToken }, function(result){
        if(result.return_value == 1){
            $(".food").toggleClass("animation");
            setTimeout(() => { 
                alert("Se ha alimentado a los peces correctamente!");
                $(".food").toggleClass("animation"); 
                $("#btnAlimentar").prop("disabled", "");
                $("#btnAlimentar").html("Alimentar");
            }, 5000);
        }else{
            alert("Respuesta inválida");
            $("#btnAlimentar").prop("disabled", "");
            $("#btnAlimentar").html("Alimentar");
        }
    }).fail(function() {
        alert( "Hubo algún error al tratar de conectarse al dispositivo" );
        $("#btnAlimentar").prop("disabled", "");
        $("#btnAlimentar").html("Alimentar");
    });
});

function checkStatus(){
    $.post(url+ "/status", {params: "1", access_token: accessToken }, function(result){
        if(result.return_value == 1){
            $("#status").html("Conectado");
            $("#status").css("color","green");
        }else{
            $("#status").html("Sin conexión");
            $("#status").css("color","red");
        }
    }).fail(function() {
        $("#status").html("Sin conexión");
        $("#status").css("color","red");
    });
    
}

function getHour(){
    $.get(url + "/hora", {access_token: accessToken}, function(response){
        getMinutes(response);
    });
}

function getMinutes(prevResponse){
    $.get(url + "/minutos", {access_token: accessToken}, function(response){
        $("#hora").html(prevResponse.result+":"+response.result);
    });
}

checkStatus();
getHour();

setTimeout(() => { 
    checkStatus();
}, 10000);