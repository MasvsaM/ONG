$(document).ready(function () {


        if(navigator.geolocation){      
            navigator.geolocation.getCurrentPosition(ObtenerLocalizacion);
        }else{
            alert("No autoriza");
        }

        function ObtenerLocalizacion(position){
            console.log(position.coords.latitude+" "+position.coords.longitude);

            $.get("https://api.open-meteo.com/v1/forecast?latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m", function(data){
                console.log(data);
         
            
               $("#temperatura").html("La temperatura es: "+ data["current_weather"]["temperature"]); 
               $("#viento").html("La Velocidad del viento es: "+ data["current_weather"]["windspeed"]); 
        
            
            });
         
        }
























    $("#btntraeinformacion").click(function(e){
       
        $.get("https://www.themealdb.com/api/json/v1/1/categories.php", function(data){
            $.each(data.categories, function(i, item){
               $("#categorias").append("<tr><td>"+item.idCategory+"</td>"+
                                        "<td>"+item.strCategory+ "</td>"+
                                        "<td> <img src='"+item.strCategoryThumb+"' /></td>"+
                                        "<td>" +item.strCategoryDescription+ "</td></tr>" );
            });
        });
    });




    $("#btnenviar2").click(function(e){

    
        if(validaformulario2()!= ""){
            swal("Error de Envio", validaformulario2(), "warning");
        }else{
            swal("Datos enviados");
        }
   
        e.preventDefault();

    });


    function validaformulario2(){

          var html="";   
          var nombre =$("#txtnombre").val();
          var email =$("#txtemail").val();
          var numero =$("#txtNumero").val();
          var ciudad =$("#cbxCiudad").val();
          var comentario =$("#txtaComentario").val();


        if(nombre==""){
            html+="- Debe ingresar un Nombre \n";
        }

        if(email==""){
            html+="- Debe ingresar un Correo \n";
        }
        /** valida los radiobutton */
        if(($("#rbtnRUT")).is(":not(:checked)") && ($("#rbtnPasaporte")).is(":not(:checked)")){
            html +="- Debe Seleccionar un Tipo de Identificacion \n";
        }else{      
             /** valida los radiobutton rut */      
            if(($("#rbtnRUT")).is(":checked")){
                 /** valida los caja de identificacion */
                if($("#txtidentificador").val()==""){
                    html+="- Debe Ingresar el numero de la identificacion \n";
                }else{
                     /** valida que el rut sea valido */
                    if(validarRut($("#txtidentificador").val())==false){
                        html+="- Debe Ingresar un RUT Valido \n";
                    }
                }

            }

        }

        if(ciudad=="0"){
            html+="- Debe Seleccionar una Ciudad \n";
        }
      
        if(comentario.trim().length<50){
            html+="- Debe Ingresar un Comentario de a lo menos 50 caracteres \n";
        }


        return html;



    }




























    





    $("#btnenviar").click(function (e) {

        if(validar_formulario2()!= ""){
            swal("Error de Formulario", validar_formulario2(), "error");
        }else{
            swal("Envio Correceto", "Nos pondres en contacto con usted", "success");
        }

        e.preventDefault();

    });




});


function validar_formulario2() {
    var html = "";

    var nombre = $("#txtnombre").val();
    var email = $("#txtemail").val();
    var ciudad = $("#cbxCiudad").val();
    var comentario = $("#txtaComentario").val().trim();

    if (nombre == "") {
        html += "- Nombre completo de la persona, no puede ser nulo \n";
    }

    if (email == "") {
        html += "- Email, no puede ser nulo \n";
    }

    if(($("#rbtnRUT")).is(":not(:checked)")  &&  ($("#rbtnPasaporte")).is(":not(:checked)")){
        html += "- Debe Seleccionar Tipo de Identificacion \n";
    }else{
        if(($("#rbtnRUT")).is(":checked")){
            if(validarRut($("#txtidentificador").val())==false){
                html += "- Debe Ingresar un RUT Valido \n";
            }
        }
    }

    if (ciudad == "0") {
        html += "- Debe seleccionar una ciudad \n";
    }

    if (comentario.length <50) {
        html += "- Comentairo debe ser por lo menos de 50 caracteres\n";
    }

    return html;
}


function validarRut(rutCompleto) {
    // Primero eliminamos cualquier caracter que no sea número o k/K
    rutCompleto = rutCompleto.replace("‐", "-");

    // Luego validamos que el formato del RUT sea válido
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;

    // Separamos el número del dígito verificador    
    var tmp = rutCompleto.split('-');
    // Calculamos el dígito verificador esperado
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';
    // Comparamos el dígito verificador ingresado con el esperado
    return (dv(rut) == digv);
}

function dv(T) {
    var M = 0,
        S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}
